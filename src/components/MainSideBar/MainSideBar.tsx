"use client";

import ParametersPopOver from "@/src/components/ParametersPopOver/ParametersPopOver";
import { useLocale } from "@/src/contexts/LocaleContext";
import { NavigationPageType } from "@/src/navigation/pages";

import { ListBox } from "@heroui/react/list-box";
import { Separator } from "@heroui/react/separator";
import { Surface } from "@heroui/react/surface";

import { animate, motion, type PanInfo, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MainSideBarLink from "./MainSideBarLink";
import MainSideBarSlideHandle from "./MainSideBarSlideHandle";
import MainSidebarLogo from "./MainSideBarLogo";

const COLLAPSED_WIDTH = 96;
const EXPANDED_WIDTH = 240;

const DRAG_PREVIEW_DISTANCE = 80;
const DRAG_TRIGGER_DISTANCE = 24;
const VELOCITY_THRESHOLD = 300;

const SPRING_TRANSITION = {
    type: "spring" as const,
    stiffness: 500,
    damping: 45,
};

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export default function MainSidebar({ pages }: { pages: NavigationPageType[] }) {
    const pathname = usePathname();

    const currentPage = pages.find(
        (page) =>
            pathname === page.href ||
            pathname.startsWith(`${page.href}/`)
    )?.href;

    const { dictionary, locale } = useLocale();

    const [isCollapsed, setIsCollapsed] = useState(false);

    const navigationRef = useRef<HTMLElement>(null);

    const width = useMotionValue(EXPANDED_WIDTH);

    const dragStartWidth = useRef(EXPANDED_WIDTH);
    const dragOriginCollapsed = useRef(false);
    const dragCommitted = useRef(false);
    const previousUserSelect = useRef<string | null>(null);

    const animateWidth = (targetWidth: number) => {
        width.stop();

        animate(
            width,
            targetWidth,
            SPRING_TRANSITION
        );
    };

    const setNavigationCollapsed = (collapsed: boolean) => {
        setIsCollapsed(collapsed);

        animateWidth(
            collapsed
                ? COLLAPSED_WIDTH
                : EXPANDED_WIDTH
        );
    };

    const toggleNavigation = () => {
        setNavigationCollapsed(!isCollapsed);
    };

    const disableTextSelection = () => {
        if (previousUserSelect.current !== null) {
            return;
        }

        previousUserSelect.current = document.body.style.userSelect;
        document.body.style.userSelect = "none";
    };

    const restoreTextSelection = () => {
        if (previousUserSelect.current === null) {
            return;
        }

        document.body.style.userSelect = previousUserSelect.current;
        previousUserSelect.current = null;
    };

    useEffect(() => {
        return () => {
            if (previousUserSelect.current !== null) {
                document.body.style.userSelect = previousUserSelect.current;
            }
        };
    }, []);

    const commitDrag = (collapsed: boolean) => {
        dragCommitted.current = true;

        setNavigationCollapsed(collapsed);
    };

    const handlePanStart = () => {
        if (!navigationRef.current) {
            return;
        }

        width.stop();

        const currentWidth = navigationRef.current.getBoundingClientRect().width;

        width.set(currentWidth);

        dragStartWidth.current = currentWidth;
        dragOriginCollapsed.current = isCollapsed;
        dragCommitted.current = false;

        disableTextSelection();
    };

    const handlePan = (event: PointerEvent, info: PanInfo) => {
        if (dragCommitted.current) return;

        const desiredWidth = dragStartWidth.current + info.offset.x;

        if (dragOriginCollapsed.current) {
            const maximumDragWidth = Math.min(
                EXPANDED_WIDTH,
                dragStartWidth.current + DRAG_PREVIEW_DISTANCE
            );

            const nextWidth = clamp(
                desiredWidth,
                COLLAPSED_WIDTH,
                maximumDragWidth
            );

            width.set(nextWidth);

            if (nextWidth >= maximumDragWidth) commitDrag(false);

            return;
        }

        const minimumDragWidth = Math.max(
            COLLAPSED_WIDTH,
            dragStartWidth.current - DRAG_PREVIEW_DISTANCE
        );

        const nextWidth = clamp(
            desiredWidth,
            minimumDragWidth,
            EXPANDED_WIDTH
        );

        width.set(nextWidth);

        if (nextWidth <= minimumDragWidth) commitDrag(true);
    };

    const handlePanEnd = (event: PointerEvent, info: PanInfo) => {
        restoreTextSelection();

        if (dragCommitted.current) return;

        if (dragOriginCollapsed.current) {
            const shouldExpand =
                info.offset.x > DRAG_TRIGGER_DISTANCE ||
                info.velocity.x > VELOCITY_THRESHOLD;

            setNavigationCollapsed(!shouldExpand);

            return;
        }

        const shouldCollapse =
            info.offset.x < -DRAG_TRIGGER_DISTANCE ||
            info.velocity.x < -VELOCITY_THRESHOLD;

        setNavigationCollapsed(shouldCollapse);
    };

    return (
        <motion.aside
            ref={navigationRef}
            className="relative shrink-0 overflow-visible hidden md:flex"
            style={{ width }}
        >
            <Surface className="drawer__dialog h-full w-full px-0 overflow-hidden">
                <div className="h-full flex flex-col shrink-0 px-4">
                    <div className="drawer__header">
                        <MainSidebarLogo
                            isCollapsed={isCollapsed}
                            onPressed={toggleNavigation}
                        />
                        <Separator variant="tertiary" />
                    </div>

                    <div className="drawer__body">
                        <ListBox
                            aria-label="Main navigation"
                            className="mt-6 flex w-auto flex-1 flex-col gap-4"
                            selectionMode="single"
                            disallowEmptySelection
                            selectedKeys={currentPage ? [currentPage] : []}
                        >
                            {pages.map((page) => (
                                <MainSideBarLink
                                    key={page.id}
                                    page={page}
                                    selected={currentPage === page.href}
                                    locale={locale}
                                    localizedLabel={dictionary.navigation[page.id]}
                                    isCollapsed={isCollapsed}
                                />
                            ))}
                        </ListBox>
                    </div>

                    <div className="drawer__footer flex flex-col">
                        <Separator variant="tertiary" />
                        <ParametersPopOver collapsed={isCollapsed} />
                    </div>
                </div>
            </Surface>

            <MainSideBarSlideHandle
                onPanStart={handlePanStart}
                onPan={handlePan}
                onPanEnd={handlePanEnd}
            />
        </motion.aside>
    );
}