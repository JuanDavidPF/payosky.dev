"use client";

import Logo from "@/src/components/Logo/Logo";
import ParametersPopOver from "@/src/components/ParametersPopOver/ParametersPopOver";
import { useLocale } from "@/src/contexts/LocaleContext";
import { NavigationPageType } from "@/src/navigation/pages";

import { Button } from "@heroui/react/button";
import { ListBox } from "@heroui/react/list-box";
import { Separator } from "@heroui/react/separator";
import { Surface } from "@heroui/react/surface";

import { animate, AnimatePresence, motion, type PanInfo, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import MainSideBarLink from "./MainSideBarLink";
import MainSideBarSlideHandle from "./MainSideBarSlideHandle";
import MainSidebarLogo from "./MainSideBarLogo";

const MOBILE_BREAKPOINT = "(max-width: 767px)";

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

const subscribeToMobile = (callback: () => void) => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);

    mediaQuery.addEventListener("change", callback);

    return () => {
        mediaQuery.removeEventListener("change", callback);
    };
};

const getIsMobile = () => {
    return window.matchMedia(MOBILE_BREAKPOINT).matches;
};

const getServerIsMobile = () => {
    return true;
};

export default function MainSidebar({ pages }: { pages: NavigationPageType[] }) {
    const pathname = usePathname();

    const currentPage = pages.find(
        (page) =>
            pathname === page.href ||
            pathname.startsWith(`${page.href}/`)
    )?.href;

    const { dictionary, locale } = useLocale();

    const isMobile = useSyncExternalStore(
        subscribeToMobile,
        getIsMobile,
        getServerIsMobile
    );

    const [collapsedOverride, setCollapsedOverride] = useState<boolean | null>(null);

    const isCollapsed = collapsedOverride ?? isMobile;

    const navigationRef = useRef<HTMLElement>(null);

    const width = useMotionValue("var(--initial-width)");

    const dragStartWidth = useRef(0);
    const dragCollapsedWidth = useRef(0);
    const dragExpandedWidth = useRef(0);
    const dragOriginCollapsed = useRef(true);
    const dragCommitted = useRef(false);
    const previousUserSelect = useRef<string | null>(null);

    const getNavigationWidths = () => {
        if (!navigationRef.current) {
            return null;
        }

        const styles = getComputedStyle(navigationRef.current);

        return {
            collapsed: parseFloat(
                styles.getPropertyValue("--collapsed-width")
            ),
            expanded: parseFloat(
                styles.getPropertyValue("--expanded-width")
            ),
        };
    };

    const animateWidth = (targetWidth: number) => {
        if (!navigationRef.current) {
            return;
        }

        width.stop();

        const currentWidth =
            navigationRef.current.getBoundingClientRect().width;

        width.set(`${currentWidth}px`);

        animate(
            width,
            `${targetWidth}px`,
            SPRING_TRANSITION
        );
    };

    const setNavigationCollapsed = (collapsed: boolean) => {
        const navigationWidth = getNavigationWidths();

        if (!navigationWidth) {
            return;
        }

        setCollapsedOverride(collapsed);

        animateWidth(
            collapsed
                ? navigationWidth.collapsed
                : navigationWidth.expanded
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
        if (collapsedOverride !== null) {
            const navigationWidth = getNavigationWidths();

            if (!navigationWidth) {
                return;
            }

            width.stop();

            width.set(`${isCollapsed ? navigationWidth.collapsed : navigationWidth.expanded}px`);
        }
    }, [isMobile, collapsedOverride, isCollapsed, width]);

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

        const navigationWidth = getNavigationWidths();

        if (!navigationWidth) {
            return;
        }

        width.stop();

        const currentWidth = navigationRef.current.getBoundingClientRect().width;

        width.set(`${currentWidth}px`);

        dragStartWidth.current = currentWidth;
        dragCollapsedWidth.current = navigationWidth.collapsed;
        dragExpandedWidth.current = navigationWidth.expanded;
        dragOriginCollapsed.current = isCollapsed;
        dragCommitted.current = false;

        disableTextSelection();
    };

    const handlePan = (event: PointerEvent, info: PanInfo) => {
        if (dragCommitted.current) return;

        const desiredWidth = dragStartWidth.current + info.offset.x;

        if (dragOriginCollapsed.current) {

            const maximumDragWidth = Math.min(dragExpandedWidth.current, dragStartWidth.current + DRAG_PREVIEW_DISTANCE);
            const nextWidth = clamp(desiredWidth, dragCollapsedWidth.current, maximumDragWidth);

            width.set(`${nextWidth}px`);

            if (nextWidth >= maximumDragWidth) commitDrag(false);

            return;
        }

        const minimumDragWidth = Math.max(dragCollapsedWidth.current, dragStartWidth.current - DRAG_PREVIEW_DISTANCE);
        const nextWidth = clamp(desiredWidth, minimumDragWidth, dragExpandedWidth.current);

        width.set(`${nextWidth}px`);

        if (nextWidth <= minimumDragWidth) commitDrag(true);

    };

    const handlePanEnd = (event: PointerEvent, info: PanInfo) => {
        restoreTextSelection();

        if (dragCommitted.current) return;

        if (dragOriginCollapsed.current) {
            const shouldExpand = info.offset.x > DRAG_TRIGGER_DISTANCE || info.velocity.x > VELOCITY_THRESHOLD;
            setNavigationCollapsed(!shouldExpand);
            return;
        }

        const shouldCollapse = info.offset.x < -DRAG_TRIGGER_DISTANCE || info.velocity.x < -VELOCITY_THRESHOLD;
        setNavigationCollapsed(shouldCollapse);
    };

    return (
        <motion.aside
            ref={navigationRef}
            className="
                relative h-dvh shrink-0 overflow-visible
                [--collapsed-width:64px]
                [--expanded-width:148px]
                [--initial-width:var(--collapsed-width)]
                md:[--collapsed-width:96px]
                md:[--expanded-width:240px]
                md:[--initial-width:var(--expanded-width)]
            "
            style={{ width }}
        >
            <Surface className="drawer__dialog h-full w-full px-0 overflow-hidden">
                <div className="h-full flex flex-col shrink-0 px-0 md:px-4">
                    <div className="drawer__header">
                        <MainSidebarLogo isCollapsed={isCollapsed} onPressed={toggleNavigation} />
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