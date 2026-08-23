import LanguageSwitcher from "@/src/components/LanguageSwitcher/LanguageSwitcher";
import { useLocale } from "@/src/contexts/LocaleContext";
import Gear from "@gravity-ui/icons/Gear";
import { Button } from "@heroui/react/button";
import { Popover } from "@heroui/react/popover";
import { Separator } from "@heroui/react/separator";
import { Typography } from "@heroui/react/typography";

export default function ParametersPopOver() {

    const dictionary = useLocale().dictionary;

    return (
        <Popover>
            <Button size="lg" fullWidth variant="ghost" className="shrink-0">
                <Gear />
                {dictionary.parameters}
            </Button>
            <Popover.Content className="min-w-xs max-w-md" placement="top left" offset={12} >
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
