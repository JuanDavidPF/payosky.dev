import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"] as const;

type Locale = (typeof locales)[number];
type LocalePreference = Locale | "auto";

const defaultLocale: Locale = "en";
const rootDomain = "payosky.dev";

const localePreferenceCookie = "localePreference";
const routeLocaleCookie = "routeLocale";
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

    return isLocale(language)
        ? language
        : defaultLocale;
}

function getLocalePreference(request: NextRequest): LocalePreference {
    const value = request.cookies.get(localePreferenceCookie)?.value;

    if (value && isLocalePreference(value)) {
        return value;
    }

    return "auto";
}

function getRouteLocale(request: NextRequest): Locale | null {
    const value = request.cookies.get(routeLocaleCookie)?.value;

    return value && isLocale(value)
        ? value
        : null;
}

function resolvePreferredLocale(request: NextRequest): Locale {
    const preference = getLocalePreference(request);

    if (isLocale(preference)) {
        return preference;
    }

    return getLocaleFromBrowser(request);
}

function isDocumentNavigation(request: NextRequest): boolean {
    const destination = request.headers.get("sec-fetch-dest");
    const mode = request.headers.get("sec-fetch-mode");

    return destination === "document" || mode === "navigate";
}

function getCookieOptions() {
    return {
        path: "/",
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        ...(process.env.NODE_ENV === "production"
            ? { domain: rootDomain }
            : {}),
    };
}

function setLocalePreferenceCookie(
    response: NextResponse,
    preference: LocalePreference,
) {
    response.cookies.set(localePreferenceCookie, preference, {
        ...getCookieOptions(),
        maxAge: 60 * 60 * 24 * 365,
    });
}

function setRouteLocaleCookie(
    response: NextResponse,
    locale: Locale,
) {
    response.cookies.set(routeLocaleCookie, locale, getCookieOptions());
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    /*
     * ---------------------------------------------------------
     * 1. HANDLE SUBDOMAIN HANDOFF
     * ---------------------------------------------------------
     *
     * next.config.ts:
     *
     * es.localhost
     *      ↓
     * localhost?__locale_handoff=es
     *
     * www.es.payosky.dev
     *      ↓
     * www.payosky.dev?__locale_handoff=es
     */
    const handoffLocale = request.nextUrl.searchParams.get(
        localeHandoffParam
    );

    if (handoffLocale && isLocale(handoffLocale)) {
        const cleanUrl = request.nextUrl.clone();

        cleanUrl.searchParams.delete(localeHandoffParam);

        const response = NextResponse.redirect(cleanUrl);

        setLocalePreferenceCookie(response, handoffLocale);
        setRouteLocaleCookie(response, handoffLocale);

        return response;
    }

    /*
     * ---------------------------------------------------------
     * 2. DON'T PREFIX AN ALREADY LOCALIZED PATH
     * ---------------------------------------------------------
     */
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname === `/${locale}` ||
            pathname.startsWith(`/${locale}/`)
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    /*
     * ---------------------------------------------------------
     * 3. RESOLVE ROUTING LOCALE
     * ---------------------------------------------------------
     *
     * Client navigation:
     * keep routeLocale stable.
     *
     * Full document navigation/reload:
     * synchronize routeLocale with localePreference.
     */
    let routeLocale = getRouteLocale(request);
    let shouldUpdateRouteLocale = false;

    if (!routeLocale || isDocumentNavigation(request)) {
        routeLocale = resolvePreferredLocale(request);
        shouldUpdateRouteLocale = true;
    }

    /*
     * ---------------------------------------------------------
     * 4. INTERNAL REWRITE
     * ---------------------------------------------------------
     */
    const url = request.nextUrl.clone();

    url.pathname =
        pathname === "/"
            ? `/${routeLocale}`
            : `/${routeLocale}${pathname}`;

    const response = NextResponse.rewrite(url);

    if (shouldUpdateRouteLocale) {
        setRouteLocaleCookie(response, routeLocale);
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};