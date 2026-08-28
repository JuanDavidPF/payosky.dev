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
import { motion } from "framer-motion";
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

export default function MainSideBarLink({ page, selected, locale, localizedLabel, isCollapsed }:
    { page: NavigationPageType, selected: boolean, locale: Locale, localizedLabel: string, isCollapsed?: boolean }) {

    const iconSet = Icons[page.id];
    const Icon = selected ? iconSet.selected : iconSet.unselected;

    return (
        <ListBox.Item
            id={page.href}
            aria-label={page.id}
            className="
                   m-0
                   p-0
                   h-13
                   font-medium
                   transition-colors
                   duration-350
                   ease-in-out-cubic
                   text-surface-foreground/60
                   hover:bg-(--accent)/10
                   data-[selected=true]:bg-accent
                   data-[selected=true]:text-surface-foreground
                   data-[selected=true]:shadow-lg"
        >
            <Link
                className={`flex p-4 items-center w-full m-0 overflow-hidden gap-2 md:gap-4 ${isCollapsed ? "justify-center" : "justify-start"}`}
                href={`/${locale}${page.href}`}
                as={page.href}
            >
                <div className="shrink-0">
                    <Icon />
                </div>

                <motion.span
                    initial={false}
                    animate={{
                        opacity: isCollapsed ? 0 : 1,
                        maxWidth: isCollapsed ? 0 : 200,
                        x: isCollapsed ? -8 : 0,
                    }}
                    transition={{
                        opacity: {
                            duration: 0.15,
                            delay: isCollapsed ? 0 : 0.1,
                        },
                        maxWidth: {
                            duration: 0.25,
                        },
                        marginLeft: {
                            duration: 0.25,
                        },
                        x: {
                            duration: 0.2,
                            delay: isCollapsed ? 0 : 0.05,
                        },
                    }}
                    className={`overflow-hidden whitespace-nowrap ${isCollapsed ? "hidden" : "justify-start"}`}
                >
                    {localizedLabel}
                </motion.span>
            </Link>
        </ListBox.Item>
    )
}