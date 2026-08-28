import PageTitle from "@/src/components/PageTitle/PageTitle";
import { Surface } from "@heroui/react/surface";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const metadata = {
        en: {
            title: "Projects",
            description: "A collection of projects where I explore game development, interactive experiences, design, and technology.",
            openGraph: {
                title: "Projects",
                description: "A collection of projects where I explore game development, interactive experiences, design, and technology.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Projects",
                description: "A collection of projects where I explore game development, interactive experiences, design, and technology.",
            },
        },
        es: {
            title: "Proyectos",
            description: "Una colección de proyectos donde exploro el desarrollo de videojuegos, las experiencias interactivas, el diseño y la tecnología.",
            openGraph: {
                title: "Proyectos",
                description: "Una colección de proyectos donde exploro el desarrollo de videojuegos, las experiencias interactivas, el diseño y la tecnología.",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Proyectos",
                description: "Una colección de proyectos donde exploro el desarrollo de videojuegos, las experiencias interactivas, el diseño y la tecnología.",
            }
        }
    };

    return metadata[locale as keyof typeof metadata];
}

export default function ProjectsPage() {

    return (
        <Surface variant="transparent" className="flex-1">
            <PageTitle pageId="projects" />
        </Surface>
    );
}