import { Button } from "@heroui/react/button";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/src/components/Logo/Logo";

export default function MainSidebarLogo({ isCollapsed, onPressed }: { isCollapsed: boolean, onPressed: () => void }) {
    const logoVariant = isCollapsed ? "isotype" : "logotype";

    const logoTransitionState = {
        opacity: 0,
        x: isCollapsed ? 0 : -8,
        scale: isCollapsed ? 0.9 : 0.96,
    };

    return <Button
        isIconOnly
        variant="ghost"
        aria-label={isCollapsed ? "Open navigation" : "Collapse navigation"}
        aria-expanded={!isCollapsed}
        className="relative h-12 md:h-24 w-full br p-0 m-0 border-0 overflow-hidden"
        onPress={onPressed}
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
                    className="h-16 md:h-20"
                />
            </motion.div>
        </AnimatePresence>
    </Button>
}