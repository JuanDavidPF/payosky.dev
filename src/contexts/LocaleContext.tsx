"use client";

import { createContext, useContext, type ReactNode, } from "react";

import getDictionary from "@/src/i18n/getDictionary";
import type { Locale } from "@/src/i18n/types";

const LocaleContext = createContext<{
    locale: Locale;
    dictionary: ReturnType<typeof getDictionary>;
} | null>(null);

export function LocaleProvider({ locale, children,
}: {
    locale: Locale;
    children: ReactNode;
}) {
    const dictionary = getDictionary(locale);

    return (
        <LocaleContext.Provider value={{ locale, dictionary }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);

    if (!context) {
        throw new Error(
            "useLocale must be used inside LocaleProvider"
        );
    }

    return context;
}