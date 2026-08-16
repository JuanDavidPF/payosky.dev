"use client"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSharedUnityContext } from "@/src/contexts/UnityContextProvider";
import { useLocale } from "@/src/contexts/LocaleContext";

export default function LoadingScreen() {

    const dictionary = useLocale().dictionary;
    const fadeOutDuration = 3;
    const { isLoaded } = useSharedUnityContext();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            const timeout = setTimeout(() => {
                setVisible(false);
            }, fadeOutDuration * 1000);

            return () => clearTimeout(timeout);
        }
    }, [isLoaded]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="absolute inset-0 z-50 bg-[#FF6F66] flex items-center justify-center"
                    style={{
                        "--mask-size": "-10%",
                        WebkitMaskImage:
                            "radial-gradient(circle at center, transparent var(--mask-size), black calc(var(--mask-size) + 0%))",
                        maskImage:
                            "radial-gradient(circle at center, transparent var(--mask-size), black calc(var(--mask-size) + 0%))",
                    } as React.CSSProperties}
                    animate={{
                        "--mask-size": isLoaded ? "150%" : "-10%",
                    }}
                    transition={{
                        duration: fadeOutDuration,
                        ease: [0.83, 0, 0.17, 1],
                    }}
                >
                    <div className="text-white text-2xl font-bold">{dictionary.loading.loading}...</div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}