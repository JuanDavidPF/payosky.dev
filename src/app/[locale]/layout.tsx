import LandscapeNavBar from "@/src/components/LandscapeNavBar/LandscapeNavBar";
import LoadingScreen from "@/src/components/LoadingScreen/LoadingScreen";
import PayoskyStudioUnity from "@/src/components/PayoskyStudioUnity/PayoskyStudioUnity";
import { LocaleProvider } from "@/src/contexts/LocaleContext";
import { Locale } from "@/src/i18n/types";
import { NavigationPages } from "@/src/navigation/pages";
import { notFound } from "next/navigation";

const locales = ["en", "es"] as const;

export function generateStaticParams() {
    return locales.map((locale) => ({
        locale,
    }));
}

function isLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}

export default async function LocaleLayout({ children, params, }: {
    children: React.ReactNode; params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    return (
        <LocaleProvider locale={locale}>
            <PayoskyStudioUnity />
            <main className="fixed inset-0 flex">
                <LandscapeNavBar pages={NavigationPages} />
                <div className="flex-1 flex relative p-20 overflow-auto ">
                    <LoadingScreen />
                    <div className="relative flex-1 flex-col">
                        {children}
                    </div>
                </div>
            </main>
        </LocaleProvider>
    );
}