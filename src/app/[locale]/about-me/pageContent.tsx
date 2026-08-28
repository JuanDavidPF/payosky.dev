"use client"
import { useLocale } from "@/src/contexts/LocaleContext";
import { Typography } from "@heroui/react/typography";

export default function AboutPageContent() {
    const dictionary = useLocale().dictionary

    return (
        <>
            <Typography type="h1" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-shadow-lg self-center md:self-auto">
                {dictionary.pages.about.hero.title}
            </Typography>
            <Typography type="body" className="text-sm md:text-xl leading-tight text-shadow-sm">
                {dictionary.pages.about.hero.body}
            </Typography>
        </>
    );
}