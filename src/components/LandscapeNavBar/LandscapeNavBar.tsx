"use client"
import Logo from "@/src/components/Logo/Logo";
import ParametersPopOver from "@/src/components/ParametersPopOver/ParametersPopOver";
import { useLocale } from "@/src/contexts/LocaleContext";
import { NavigationPageType } from "@/src/navigation/pages";
import { ListBox } from "@heroui/react/list-box";
import { Separator } from "@heroui/react/separator";
import { Surface } from "@heroui/react/surface";
import { usePathname } from "next/navigation";
import LanscapeNavBarItem from "./LandscapeNavBarItem";

export default function LandscapeNavBar({ pages }: { pages: NavigationPageType[] }) {

    const pathname = usePathname();
    const currentPage = pages.find(page => pathname === page.href || pathname.startsWith(`${page.href}/`))?.href;
    const { dictionary, locale } = useLocale();

    return (
        <Surface className="min-h-full w-3xs overflow-y-auto flex flex-col py-8 px-6 gap-4" >
            <Logo variant="logotype" className="shrink-0 self-center" />
            <Separator />
            <ListBox
                aria-label="Main navigation"
                className="flex flex-1 flex-col gap-4 mt-6 w-fullr"
                selectionMode="single"
                disallowEmptySelection={true}
                selectedKeys={currentPage ? [currentPage] : []}
            >
                {pages.map(
                    (page) => {
                        return (
                            <LanscapeNavBarItem
                                key={page.id}
                                page={page}
                                selected={currentPage === page.href}
                                locale={locale}
                                localizedLabel={dictionary.navigation[page.id]}
                            />
                        );

                    })}
            </ListBox >
            <Separator />
            <ParametersPopOver />
        </Surface>
    );
}