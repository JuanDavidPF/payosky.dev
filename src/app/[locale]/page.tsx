import getDictionary from "@/src/i18n/getDictionary";
import { Locale } from "@/src/i18n/types";
import { Surface } from "@heroui/react/surface";

export default async function HomePage({ params, }: {
  params: Promise<{ locale: Locale }>;
}) {

  const { locale } = await params;
  const dictionary = getDictionary(locale).home;

  return (
    <Surface variant="transparent" className="flex-1">
      <h1 className="text-4xl font-black">
        {dictionary.welcome}
      </h1>
    </Surface>
  );
}