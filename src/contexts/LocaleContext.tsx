"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import getDictionary from "@/src/i18n/getDictionary";
import type { Locale } from "@/src/i18n/types";

export type LocalePreference = Locale | "auto";

const defaultLocale: Locale = "en";

const locales = ["en", "es"] as const;

const localePreferenceCookie = "localePreference";
const rootDomain = "payosky.dev";

type LocaleContextValue = {
    locale: Locale;
    preference: LocalePreference;
    dictionary: ReturnType<typeof getDictionary>;
    setLocalePreference: (preference: LocalePreference,) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

function isLocalePreference(value: string,): value is LocalePreference {
    return value === "auto" || isLocale(value);
}

function getBrowserLocale(): Locale {
    const language = navigator.language?.toLowerCase().split("-")[0] ?? defaultLocale;
    return isLocale(language) ? language : defaultLocale;
}

function getStoredPreference(): LocalePreference {
    const cookie = document.cookie
        .split("; ")
        .find((cookie) =>
            cookie.startsWith(`${localePreferenceCookie}=`)
        );

    if (!cookie) return "auto";
    const value = cookie.split("=")[1];
    return isLocalePreference(value) ? value : "auto";
}

function setPreferenceCookie(preference: LocalePreference) {
    const isProductionDomain = window.location.hostname === rootDomain ||
        window.location.hostname.endsWith(`.${rootDomain}`);

    const cookie = [
        `${localePreferenceCookie}=${preference}`,
        "Path=/",
        `Max-Age=${60 * 60 * 24 * 365}`,
        "SameSite=Lax",
    ];

    if (isProductionDomain) {
        cookie.push(`Domain=${rootDomain}`);
        cookie.push("Secure");
    }

    document.cookie = cookie.join("; ");
}

export function LocaleProvider({ locale, children,
}: {
    locale: Locale;
    children: ReactNode;
}) {

    const [currentLocale, setCurrentLocale] = useState<Locale>(locale);
    const [preference, setPreference] = useState<LocalePreference>("auto");

    useEffect(() => {
        setPreference(getStoredPreference());
    }, []);

    const setLocalePreference = useCallback((newPreference: LocalePreference) => {

        setPreferenceCookie(newPreference);
        setPreference(newPreference);
        const newLocale = newPreference === "auto" ? getBrowserLocale() : newPreference;
        setCurrentLocale(newLocale);
    },
        [],
    );

    const dictionary = useMemo(() => getDictionary(currentLocale),
        [currentLocale],
    );

    useEffect(() => {
        document.documentElement.lang = currentLocale;
    }, [currentLocale]);

    const value = useMemo(
        () => ({
            locale: currentLocale,
            preference,
            dictionary,
            setLocalePreference,
        }),
        [
            currentLocale,
            preference,
            dictionary,
            setLocalePreference,
        ],
    );

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);

    if (!context) {
        throw new Error(
            "useLocale must be used inside LocaleProvider",
        );
    }

    return context;
}