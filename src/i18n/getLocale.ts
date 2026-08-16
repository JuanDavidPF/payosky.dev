import { headers } from "next/headers";
import type { Locale } from "./types";

export default async function getLocale(): Promise<Locale> {
    const headersList = await headers();

    return headersList.get("x-locale") === "es"
        ? "es"
        : "en";
}