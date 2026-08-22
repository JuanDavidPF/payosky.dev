import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"] as const;

type Locale = (typeof locales)[number];
type LocalePreference = Locale | "auto";

const defaultLocale: Locale = "en";
const rootDomain = "payosky.dev";
const localePreferenceCookie = "localePreference";
const localeHandoffParam = "__locale_handoff";

function isLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

function isLocalePreference(value: string): value is LocalePreference {
    return value === "auto" || isLocale(value);
}

function getLocaleFromBrowser(request: NextRequest): Locale {
    const acceptLanguage = request.headers.get("accept-language");

    if (!acceptLanguage) {
        return defaultLocale;
    }

    const preferredLanguage = acceptLanguage
        .split(",")[0]
        .split(";")[0]
        .trim()
        .toLowerCase();

    const language = preferredLanguage.split("-")[0];

    return isLocale(language) ? language : defaultLocale;
}

function getLocalePreference(request: NextRequest): LocalePreference {
    const value = request.cookies.get(localePreferenceCookie,)?.value;

    if (value && isLocalePreference(value)) {
        return value;
    }

    return "auto";
}

function resolveLocale(request: NextRequest): Locale {
    const preference = getLocalePreference(request);

    if (isLocale(preference)) {
        return preference;
    }

    return getLocaleFromBrowser(request);
}

function setLocalePreferenceCookie(response: NextResponse, preference: LocalePreference) {
    response.cookies.set(
        localePreferenceCookie,
        preference,
        {
            path: "/",
            sameSite: "lax",
            maxAge:
                60 *
                60 *
                24 *
                365,
            secure: process.env.NODE_ENV === "production",
            ...(process.env.NODE_ENV === "production" ? { domain: rootDomain } : {})
        }
    );
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    /*
     * ---------------------------------------------------------
     * 1. HANDLE LOCALE HANDOFF
     * ---------------------------------------------------------
     *
     * next.config.ts already changed:
     *
     * es.localhost
     *      ↓
     * localhost?__locale_handoff=es
     *
     * or:
     *
     * www.es.payosky.dev
     *      ↓
     * www.payosky.dev?__locale_handoff=es
     *
     * We are now safely on the canonical host.
     */

    const handoffLocale = request.nextUrl.searchParams.get(localeHandoffParam,);

    if (handoffLocale && isLocale(handoffLocale)) {

        const cleanUrl = request.nextUrl.clone();
        cleanUrl.searchParams.delete(localeHandoffParam);

        const response = NextResponse.redirect(cleanUrl);
        setLocalePreferenceCookie(response, handoffLocale);

        return response;
    }

    /*
     * ---------------------------------------------------------
     * 2. RESOLVE CURRENT LOCALE
     * ---------------------------------------------------------
     */

    const locale = resolveLocale(request);

    /*
     * ---------------------------------------------------------
     * 3. DON'T ADD LOCALE TWICE
     * ---------------------------------------------------------
     */

    const pathnameHasLocale = locales.some(
        (supportedLocale) => {
            pathname === `/${supportedLocale}` || pathname.startsWith(`/${supportedLocale}/`)
        }
    );

    if (pathnameHasLocale) return NextResponse.next();


    /*
     * ---------------------------------------------------------
     * 4. INTERNAL LOCALE REWRITE
     * ---------------------------------------------------------
     *
     * Browser sees:
     *
     * localhost:3000/game
     *
     * Next serves:
     *
     * /es/game
     */

    const url = request.nextUrl.clone();

    url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};