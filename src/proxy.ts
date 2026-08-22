import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"] as const;

type Locale = (typeof locales)[number];

const defaultLocale: Locale = "en";
const rootDomain = "payosky.dev";

function isLocale(value: string): value is Locale {
    return locales.includes(value as Locale);
}

function getHostname(request: NextRequest): string {
    return (
        request.headers.get("host") ??
        request.nextUrl.hostname ??
        ""
    )
        .split(":")[0]
        .toLowerCase()
        .replace(/^www\./, "");
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

function getLocale(request: NextRequest): Locale {
    const hostname = getHostname(request);

    // Local development:
    // localhost
    // es.localhost
    // en.localhost
    if (
        hostname === "localhost" ||
        hostname.endsWith(".localhost")
    ) {
        if (hostname === "localhost") {
            return getLocaleFromBrowser(request);
        }

        const subdomain = hostname.split(".")[0];

        return isLocale(subdomain)
            ? subdomain
            : defaultLocale;
    }

    // Production root domain:
    // payosky.dev
    if (hostname === rootDomain) {
        return getLocaleFromBrowser(request);
    }

    // Production subdomain:
    // es.payosky.dev
    // en.payosky.dev
    // fr.payosky.dev
    if (hostname.endsWith(`.${rootDomain}`)) {
        const subdomain = hostname.slice(
            0,
            -(rootDomain.length + 1)
        );

        return isLocale(subdomain)
            ? subdomain
            : defaultLocale;
    }

    // Vercel previews / unknown domains:
    // use browser preference.
    return getLocaleFromBrowser(request);
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Prevent:
    // /en/foo -> /en/en/foo
    // /es/foo -> /es/es/foo
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname === `/${locale}` ||
            pathname.startsWith(`/${locale}/`)
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    const locale = getLocale(request);

    const url = request.nextUrl.clone();

    url.pathname =
        pathname === "/"
            ? `/${locale}`
            : `/${locale}${pathname}`;

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};