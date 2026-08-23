export type NavigationPageId =
    | "about"
    | "projects"
    | "blog"
    | "museum";

export type NavigationPageType = {
    id: NavigationPageId;
    href: string
};

export const NavigationPages: NavigationPageType[] = [
    {
        id: "about",
        href: "/about-me"
    },
    {
        id: "projects",
        href: "/projects"
    },
    {
        id: "blog",
        href: "/blog"
    },
    {
        id: "museum",
        href: "/museum"
    },
];