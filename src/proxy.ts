import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"] as const;

type Locale = (typeof locales)[number];

const defaultLocale: Locale = "en";

function getLocaleFromHost(hostname: string): Locale | null {
    const parts = hostname.split(".");

    // es.localhost
    if (hostname.endsWith(".localhost") && parts.length >= 2) {
        const subdomain = parts[0];

        if (locales.includes(subdomain as Locale)) {
            return subdomain as Locale;
        }
    }

    // es.yourdomain.com
    if (parts.length >= 3) {
        const subdomain = parts[0];

        if (locales.includes(subdomain as Locale)) {
            return subdomain as Locale;
        }
    }

    return null;
}

function getBrowserLocale(request: NextRequest): Locale {
    const acceptLanguage = request.headers.get("accept-language");

    if (!acceptLanguage) {
        return defaultLocale;
    }

    const languages = acceptLanguage
        .split(",")
        .map((language) => language.split(";")[0].trim().toLowerCase());

    for (const language of languages) {
        if (language.startsWith("es")) {
            return "es";
        }

        if (language.startsWith("en")) {
            return "en";
        }
    }

    return defaultLocale;
}

export function proxy(request: NextRequest) {
    const host = request.headers.get("host") ?? "";
    const hostname = host.split(":")[0];

    const subdomainLocale = getLocaleFromHost(hostname);

    const locale =
        subdomainLocale ??
        getBrowserLocale(request);

    console.log({
        host,
        hostname,
        subdomainLocale,
        locale,
    });

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-locale", locale);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};