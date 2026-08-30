import { Metadata } from "next";
import AboutPageContent from "./pageContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const metadata = {
        en: {
            title: "About me",
            description: "Designer and developer creating games and interactive experiences at the intersection of creativity, technology, and play.",
            openGraph: {
                title: "About Juan Payán",
                description: "Designer and developer creating games and interactive experiences at the intersection of creativity, technology, and play.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "About Juan Payán",
                description: "Designer and developer creating games and interactive experiences at the intersection of creativity, technology, and play.",
            }
        },
        es: {
            title: "Sobre mí",
            description: "Diseñador y desarrollador que crea videojuegos y experiencias interactivas en la intersección entre creatividad, tecnología y juego.",
            openGraph: {
                title: "Sobre Juan Payán",
                description: "Diseñador y desarrollador que crea videojuegos y experiencias interactivas en la intersección entre creatividad, tecnología y juego.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Sobre Juan Payán",
                description: "Diseñador y desarrollador que crea videojuegos y experiencias interactivas en la intersección entre creatividad, tecnología y juego.",
            }
        }
    };

    return metadata[locale as keyof typeof metadata];
}

export default function AboutPage() {

    return (
        <section className="max-w-[75ch] flex flex-col gap-6 md:gap-8 mt-8 md:mt-20">
            <AboutPageContent />
        </section>
    );
}