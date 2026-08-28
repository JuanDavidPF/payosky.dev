import PageTitle from "@/src/components/PageTitle/PageTitle";
import { Surface } from "@heroui/react/surface";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const metadata = {
        en: {
            title: "Museum",
            description: "A personal collection of photos, art, music, experiments, and other things I create, enjoy, and find worth keeping.",
            openGraph: {
                title: "Museum",
                description: "A personal collection of photos, art, music, experiments, and other things I create, enjoy, and find worth keeping.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Museum",
                description: "A personal collection of photos, art, music, experiments, and other things I create, enjoy, and find worth keeping.",
            },
        },
        es: {
            title: "Museo",
            description: "Una colección personal de fotos, arte, música, experimentos y otras cosas que creo, disfruto y considero que vale la pena conservar.",
            openGraph: {
                title: "Museo",
                description: "Una colección personal de fotos, arte, música, experimentos y otras cosas que creo, disfruto y considero que vale la pena conservar.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Museo",
                description: "Una colección personal de fotos, arte, música, experimentos y otras cosas que creo, disfruto y considero que vale la pena conservar.",
            }
        }
    };

    return metadata[locale as keyof typeof metadata];
}

export default function MuseumPage() {

    return (
        <Surface variant="transparent" className="flex-1">
            <PageTitle pageId="museum" />
        </Surface>
    );
}