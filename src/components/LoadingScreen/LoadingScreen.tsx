"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useSharedUnityContext } from "@/src/contexts/UnityContextProvider";
import { useLocale } from "@/src/contexts/LocaleContext";

const fadeOutDuration = 1;

export default function LoadingScreen() {

    const dictionary = useLocale().dictionary;
    const { isLoaded } = useSharedUnityContext();

    return (
        <AnimatePresence>
            <motion.div
                className="absolute inset-0 bg-accent flex justify-end p-16"
                style={{
                    "--mask-size": "-10%",
                    WebkitMaskImage:
                        "radial-gradient(circle at center, transparent var(--mask-size), black calc(var(--mask-size) + 0%))",
                    maskImage:
                        "radial-gradient(circle at center, transparent var(--mask-size), black calc(var(--mask-size) + 0%))",
                } as React.CSSProperties}
                animate={{
                    "--mask-size": isLoaded ? "100%" : "-10%",
                }}
                transition={{
                    duration: fadeOutDuration,
                    ease: [0.83, 0, 0.17, 1],
                }}
            >
                <div className="text-white text-2xl font-bold self-end">{dictionary.loading.loading}...</div>

            </motion.div>
        </AnimatePresence>
    );
}