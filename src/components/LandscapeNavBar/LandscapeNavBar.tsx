"use client"
import Logo from "@/src/components/Logo/Logo";
import ParametersPopOver from "@/src/components/ParametersPopOver/ParametersPopOver";
import { NavigationPageType } from "@/src/navigation/pages";
import { ListBox } from "@heroui/react/list-box";
import { Separator } from "@heroui/react/separator";
import { Surface } from "@heroui/react/surface";
import { usePathname, useRouter } from "next/navigation";
import LanscapeNavBarItem from "./LandscapeNavBarItem";

export default function LandscapeNavBar({ pages }: { pages: NavigationPageType[] }) {

    const router = useRouter();
    const pathname = usePathname();
    const currentPage = pages.find(page => pathname === page.href || pathname.startsWith(`${page.href}/`))?.href;

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
                onSelectionChange={
                    (keys) => {
                        const key = Array.from(keys)[0] as string;
                        router.push(key);
                    }}
            >
                {pages.map((page) => {
                    return (
                        <LanscapeNavBarItem
                            page={page}
                            selected={currentPage === page.href}
                            key={page.id}
                        />
                    );

                })}
            </ListBox >
            <Separator />
            <ParametersPopOver />
        </Surface>
    );
}