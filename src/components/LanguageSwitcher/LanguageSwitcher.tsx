"use client";

import { useLocale, type LocalePreference } from "@/src/contexts/LocaleContext";
import { Label } from "@heroui/react/label";
import { Tabs } from "@heroui/react/tabs";

function isLocalePreference(value: string): value is LocalePreference {
    return (
        value === "auto" ||
        value === "en" ||
        value === "es"
    );
}

export default function LanguageSwitcher() {
    const {
        dictionary,
        preference,
        setLocalePreference,
    } = useLocale();

    const handleLanguageChange = (key: React.Key) => {
        const value = String(key);

        if (!isLocalePreference(value)) {
            return;
        }

        setLocalePreference(value);
    };

    return (
        <Tabs
            selectedKey={preference}
            onSelectionChange={handleLanguageChange}
        >
            <Label htmlFor="language-switcher">
                {dictionary.languages.language}
            </Label>

            <Tabs.ListContainer id="language-switcher">
                <Tabs.List aria-label={dictionary.languages.language}                >
                    <Tabs.Tab id="auto">
                        {dictionary.languages.system}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="en">
                        {dictionary.languages.english}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="es">
                        {dictionary.languages.spanish}
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
        </Tabs>
    );
}