import PageTitle from "@/src/components/PageTitle/PageTitle";
import { Surface } from "@heroui/react/surface";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const metadata = {
        en: {
            title: "Blog",
            description: "Thoughts, ideas, and reflections on game development, design, technology, creativity, and the things I learn along the way.",
            openGraph: {
                title: "Blog",
                description: "Thoughts, ideas, and reflections on game development, design, technology, creativity, and the things I learn along the way.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Blog",
                description: "Thoughts, ideas, and reflections on game development, design, technology, creativity, and the things I learn along the way.",
            },
        },
        es: {
            title: "Blog",
            description: "Ideas, reflexiones y pensamientos sobre desarrollo de videojuegos, diseño, tecnología, creatividad y las cosas que voy aprendiendo en el camino.",
            openGraph: {
                title: "Blog",
                description: "Ideas, reflexiones y pensamientos sobre desarrollo de videojuegos, diseño, tecnología, creatividad y las cosas que voy aprendiendo en el camino.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Blog",
                description: "Ideas, reflexiones y pensamientos sobre desarrollo de videojuegos, diseño, tecnología, creatividad y las cosas que voy aprendiendo en el camino.",
            }
        }
    };

    return metadata[locale as keyof typeof metadata];
}


export default function BlogPage() {

    return (
        <Surface variant="transparent" className="flex-1">
            <PageTitle pageId="blog" />
        </Surface>
    );
}