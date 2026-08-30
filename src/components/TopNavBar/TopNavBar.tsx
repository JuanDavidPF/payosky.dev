import { Surface } from "@heroui/react/surface";
import Logo from "@/src/components/Logo/Logo";

export default function TopNavBar() {

    return (
        <Surface
            variant="default"
            className="z-50 shrink-0 md:hidden p-4 flex justify-between items-center shadow-md"
        >
            <Logo
                variant="logotype"
                className="h-12"
            />
        </Surface>

    )
}