import LanguageSwitcher from "@/src/components/LanguageSwitcher/LanguageSwitcher";
import { useLocale } from "@/src/contexts/LocaleContext";
import Gear from "@gravity-ui/icons/Gear";
import { Button } from "@heroui/react/button";
import { Popover } from "@heroui/react/popover";
import { Separator } from "@heroui/react/separator";
import { Typography } from "@heroui/react/typography";
import { motion } from "framer-motion";

export default function ParametersPopOver({ collapsed }: { collapsed?: boolean }) {

    const dictionary = useLocale().dictionary;

    return (
        <Popover>
            <Button
                fullWidth
                variant="ghost"
                className="shrink-0 overflow-hidden p-4 h-12 rounded-2x"
            >
                <motion.div
                    layout
                    transition={{
                        layout: {
                            type: "spring",
                            stiffness: 500,
                            damping: 45,
                        },
                    }}
                    className={`flex w-full ${!collapsed ? "gap-4" : "gap-0"} items-center overflow-hidden justify-center`}
                >
                    <motion.div
                        layout="position"
                        className="flex shrink-0 items-center"
                    >
                        <Gear className="text-surface-foreground/60" />
                    </motion.div>

                    <motion.span
                        initial={false}
                        animate={{
                            opacity: collapsed ? 0 : 1,
                            maxWidth: collapsed ? 0 : 200,
                            x: collapsed ? -8 : 0,
                        }}
                        transition={{
                            opacity: {
                                duration: 0.15,
                                delay: collapsed ? 0 : 0.1,
                            },
                            maxWidth: {
                                duration: 0.25,
                            },

                        }}
                        className={`overflow-hidden whitespace-nowrap text-surface-foreground/60`}
                    >
                        {dictionary.parameters}
                    </motion.span>
                </motion.div>
            </Button>
            <Popover.Content
                className="min-w-xs max-w-md"
                placement="top left"
                offset={12}
            >
                <Popover.Dialog className="flex flex-col gap-4 bg-surface-secondary">
                    <Typography type="h6" className="text-accent">
                        {dictionary.parameters}
                    </Typography>
                    <Separator variant="secondary" />
                    <LanguageSwitcher />
                </Popover.Dialog>
            </Popover.Content>
        </Popover>
    );
}