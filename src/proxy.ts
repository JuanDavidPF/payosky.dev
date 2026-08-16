import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "en";

export function proxy(request: NextRequest) {
    const host = request.headers.get("host") ?? "";

    // Remove the port
    const hostname = host.split(":")[0];

    let locale = defaultLocale;

    if (hostname.endsWith(".localhost")) {
        const subdomain = hostname.split(".")[0];

        if (locales.includes(subdomain)) {
            locale = subdomain;
        }
    }

    console.log("HOST HEADER:", host);
    console.log("HOSTNAME:", hostname);
    console.log("LOCALE:", locale);

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