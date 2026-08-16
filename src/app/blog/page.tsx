import getDictionary from "@/src/i18n/getDictionary";
import getLocale from "@/src/i18n/getLocale";
import { Label } from "@heroui/react/label";

export default async function Projects() {
    const locale = await getLocale();
    const dictionary = getDictionary(locale);
    return (
        <Label >
            {dictionary.navigation.projects}
        </Label>
    );
}