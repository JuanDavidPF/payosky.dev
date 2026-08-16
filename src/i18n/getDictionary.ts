import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import type { Locale } from "./types";

const dictionaries = {
    en,
    es,
};

export default function getDictionary(locale: Locale) {
    return dictionaries[locale];
}