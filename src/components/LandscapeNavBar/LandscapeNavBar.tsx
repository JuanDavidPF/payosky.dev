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
import { useEffect, useRef, useState } from "react";
import LanscapeNavBarItem from "./LandscapeNavBarItem";

const COLLAPSED_WIDTH = 96;
const EXPANDED_WIDTH = 256;

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

export default function LandscapeNavBar({ pages }: { pages: NavigationPageType[] }) {
    const pathname = usePathname();

    const currentPage = pages.find(
        (page) =>
            pathname === page.href ||
            pathname.startsWith(`${page.href}/`)
    )?.href;

    const { dictionary, locale } = useLocale();

    const [isCollapsed, setIsCollapsed] = useState(true);

    const width = useMotionValue(COLLAPSED_WIDTH);

    const dragStartWidth = useRef(COLLAPSED_WIDTH);
    const dragOriginCollapsed = useRef(true);
    const dragCommitted = useRef(false);
    const previousUserSelect = useRef<string | null>(null);

    const logoVariant = isCollapsed ? "isotype" : "logotype";

    const logoTransitionState = {
        opacity: 0,
        x: isCollapsed ? 0 : -8,
        scale: isCollapsed ? 0.9 : 0.96,
    };

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
        width.stop();

        dragStartWidth.current = width.get();
        dragOriginCollapsed.current = isCollapsed;
        dragCommitted.current = false;

        disableTextSelection();
    };

    const handlePan = (info: PanInfo) => {
        if (dragCommitted.current) {
            return;
        }

        const desiredWidth =
            dragStartWidth.current +
            info.offset.x;

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

            if (nextWidth >= maximumDragWidth) {
                commitDrag(false);
            }

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

        if (nextWidth <= minimumDragWidth) {
            commitDrag(true);
        }
    };

    const handlePanEnd = (info: PanInfo) => {
        restoreTextSelection();

        if (dragCommitted.current) {
            return;
        }

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
        <motion.div
            className="relative h-dvh shrink-0 overflow-visible"
            style={{ width }}
        >
            <Surface className="drawer__dialog h-full w-full px-0 overflow-hidden">
                <div
                    className="h-full flex flex-col shrink-0"
                    style={{
                        width: isCollapsed
                            ? COLLAPSED_WIDTH
                            : EXPANDED_WIDTH,
                    }}
                >
                    <div className="drawer__header">
                        <Button
                            isIconOnly
                            variant="ghost"
                            aria-label={isCollapsed ? "Open navigation" : "Collapse navigation"}
                            aria-expanded={!isCollapsed}
                            className="relative h-24 w-full p-0 m-0 border-0 overflow-hidden"
                            onPress={toggleNavigation}
                        >
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={logoVariant}
                                    initial={logoTransitionState}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                    }}
                                    exit={logoTransitionState}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Logo
                                        variant={logoVariant}
                                        className="h-20 w-auto m-0 shrink-0"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </Button>

                        <Separator variant="tertiary" />
                    </div>

                    <div className="drawer__body">
                        <ListBox
                            aria-label="Main navigation"
                            className="mt-6 flex w-full flex-1 flex-col gap-4"
                            selectionMode="single"
                            disallowEmptySelection
                            selectedKeys={currentPage ? [currentPage] : []}
                        >
                            {pages.map((page) => (
                                <LanscapeNavBarItem
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

            <motion.div
                className="
                    group
                    absolute -right-4 top-0 z-20
                    h-full w-8
                    cursor-ew-resize
                    touch-none
                    select-none
                "
                onPanStart={handlePanStart}
                onPan={(_, info) => handlePan(info)}
                onPanEnd={(_, info) => handlePanEnd(info)}
            >
                <div
                    className="
                        pointer-events-none
                        absolute left-1/2 top-0
                        h-full w-px
                        -translate-x-1/2
                        bg-surface-foreground/15
                        transition-all
                        duration-200
                        group-hover:w-0.5
                        group-hover:bg-accent/60
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute left-1/2 top-1/2
                        flex h-12 w-5
                        -translate-x-1/2 -translate-y-1/2
                        items-center justify-center
                        rounded-full
                        border
                        border-surface-foreground/15
                        bg-surface
                        opacity-30
                        shadow-md
                        scale-90
                        transition-all
                        duration-200
                        group-hover:opacity-100
                        group-hover:scale-100
                        group-hover:border-accent/50
                    "
                >
                    <div className="flex gap-1">
                        <span className="h-4 w-px rounded-full bg-surface-foreground/50" />
                        <span className="h-4 w-px rounded-full bg-surface-foreground/50" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}