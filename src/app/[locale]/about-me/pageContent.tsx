"use client"
import { useLocale } from "@/src/contexts/LocaleContext";
import { Typography } from "@heroui/react/typography";

export default function AboutPageContent() {
    const dictionary = useLocale().dictionary

    return (
        <>
            <Typography type="h1" className="text-4xl lg:text-6xl text-shadow-lg ">
                {dictionary.pages.about.hero.title}
            </Typography>
            <Typography type="body" className="text-md md:text-xl text-shadow-sm font-medium">
                {dictionary.pages.about.hero.body}
            </Typography>
        </>
    );
}