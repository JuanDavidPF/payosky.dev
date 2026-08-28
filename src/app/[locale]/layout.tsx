import LoadingScreen from "@/src/components/LoadingScreen/LoadingScreen";
import Logo from "@/src/components/Logo/Logo";
import MainSidebar from "@/src/components/MainSideBar/MainSideBar";
import PayoskyStudioUnity from "@/src/components/PayoskyStudioUnity/PayoskyStudioUnity";
import { LocaleProvider } from "@/src/contexts/LocaleContext";
import { Locale } from "@/src/i18n/types";
import { NavigationPages } from "@/src/navigation/pages";
import { Typography } from "@heroui/react/typography";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const locales = ["en", "es"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const metadata = {
        en: {
            description: "PayoskyStudio is my personal space to share who I am, the projects I create, the things I'm passionate about, and the thoughts I publish along the way.",
            openGraph: {
                title: "PayoskyStudio",
                description: "My personal space to share who I am, the projects I create, the things I'm passionate about, and the thoughts I publish along the way.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "PayoskyStudio",
                description: "My personal space to share who I am, the projects I create, the things I'm passionate about, and the thoughts I publish along the way.",
            },
        },
        es: {
            description: "PayoskyStudio es mi espacio personal para compartir quién soy, los proyectos que creo, las cosas que me apasionan y las ideas que voy publicando en el camino.",
            openGraph: {
                title: "PayoskyStudio",
                description: "Mi espacio personal para compartir quién soy, los proyectos que creo, las cosas que me apasionan y las ideas que voy publicando en el camino.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "PayoskyStudio",
                description: "Mi espacio personal para compartir quién soy, los proyectos que creo, las cosas que me apasionan y las ideas que voy publicando en el camino.",
            }
        }
    };
    return metadata[locale as keyof typeof metadata];
}

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
                <MainSidebar pages={NavigationPages} />
                <div className="flex-1 flex flex-col relative px-4 md:px-20 pt-10 overflow-auto scroll-auto h-auto">
                    <LoadingScreen />
                    <div className="relative flex flex-col flex-1 min-h-full">
                        {children}
                    </div>
                    <footer className="absolute top-full left-0 right-0 shrink-0 p-4 bg-surface-tertiary flex justify-between items-center">
                        <Logo variant="logotype" className="h-12 md:h-18" />
                        <Typography>{new Date().getFullYear()}</Typography>
                    </footer>
                </div>
            </main>
        </LocaleProvider>
    );
}