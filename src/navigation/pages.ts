import { LocalizedText } from "@/src/localization/types";

export type NavigationPageType = {
    id: string;
    label: LocalizedText;
    href: LocalizedText;
    studioState: string;
};

export const NavigationPages: NavigationPageType[] = [
    {
        id: "about",
        studioState: "about",
        href: {
            en: "/about-me",
            es: "/sobre-mi",
        },
        label: {
            en: "About Me",
            es: "Sobre mí",
        },
    },
    {
        id: "projects",
        studioState: "projects",
        href: {
            en: "/projects",
            es: "/proyectos",
        },
        label: {
            en: "Projects",
            es: "Proyectos",
        },
    },
    {
        id: "blog",
        studioState: "blog",
        href: {
            en: "/blog",
            es: "/blog",
        },
        label: {
            en: "Blog",
            es: "Blog",
        },
    },
    {
        id: "museum",
        studioState: "museum",
        href: {
            en: "/museum",
            es: "/museo",
        },
        label: {
            en: "Museum",
            es: "Museo",
        },
    },
    {
        id: "contact",
        studioState: "contact",
        href: {
            en: "/contact",
            es: "/contacto",
        },
        label: {
            en: "Contact",
            es: "Contacto",
        },
    },
];