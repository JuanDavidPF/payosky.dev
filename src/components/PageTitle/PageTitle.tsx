"use client"
import { useLocale } from "@/src/contexts/LocaleContext"
import { NavigationPageId } from "@/src/navigation/pages";
import { Typography } from "@heroui/react/typography";

export default function PageTitle({ pageId }: { pageId: NavigationPageId }) {

    const dictionary = useLocale().dictionary.navigation;

    return (
        <Typography type="h1">
            {dictionary[pageId]}
        </Typography>)

}