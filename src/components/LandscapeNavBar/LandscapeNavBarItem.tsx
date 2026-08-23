import { Locale } from "@/src/i18n/types";
import { NavigationPageId, NavigationPageType } from "@/src/navigation/pages";
import Comment from "@gravity-ui/icons/Comment";
import CommentFill from "@gravity-ui/icons/CommentFill";
import Folder from "@gravity-ui/icons/Folder";
import FolderOpenFill from "@gravity-ui/icons/FolderOpenFill";
import Heart from "@gravity-ui/icons/Heart";
import HeartFill from "@gravity-ui/icons/HeartFill";
import Person from "@gravity-ui/icons/Person";
import PersonFill from "@gravity-ui/icons/PersonFill";
import { ListBox } from "@heroui/react/list-box";
import Link from "next/link";
import { ComponentType } from "react";

const Icons: Record<NavigationPageId,
    {
        selected: ComponentType;
        unselected: ComponentType;
    }> = {
    about: {
        selected: PersonFill,
        unselected: Person,
    },
    projects: {
        selected: FolderOpenFill,
        unselected: Folder,
    },
    blog: {
        selected: CommentFill,
        unselected: Comment,
    },
    museum: {
        selected: HeartFill,
        unselected: Heart,
    },
};

export default function LanscapeNavBarItem({ page, selected, locale, localizedLabel }:
    { page: NavigationPageType, selected: boolean, locale: Locale, localizedLabel: string }) {

    const iconSet = Icons[page.id];
    const Icon = selected ? iconSet.selected : iconSet.unselected;

    return (
        <ListBox.Item
            id={page.href}
            aria-label={page.id}
            className="
                   m-0
                   p-0
                   font-medium
                   transition-colors
                   duration-350
                   ease-in-out-cubic
                   hover:bg-(--accent)/10
                   data-[selected=true]:bg-accent
                   data-[selected=true]:shadow-lg"
        >
            <Link
                className="flex p-4 items-center gap-4 w-full m-0"
                href={`/${locale}${page.href}`}
                as={page.href}
            >
                <Icon />
                {localizedLabel}
            </Link>
        </ListBox.Item>
    )
}
