"use client"
import { useLocale } from "@/src/contexts/LocaleContext"
import { NavigationPageId } from "@/src/navigation/pages";
import { Typography } from "@heroui/react/typography";

export default function PageTitle({ pageId }: { pageId: NavigationPageId }) {

    const dictionary = useLocale().dictionary.navigation;

    return (
        <Typography type="h1" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {dictionary[pageId]}
        </Typography>)

}