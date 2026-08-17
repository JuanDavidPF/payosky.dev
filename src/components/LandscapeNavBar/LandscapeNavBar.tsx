"use client"
import Logo from "@/src/components/Logo/Logo";
import { useLocale } from "@/src/contexts/LocaleContext";
import { NavigationPageType } from "@/src/navigation/pages";
import { Dropdown } from "@heroui/react/dropdown";
import { Surface } from "@heroui/react/surface";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function LandscapeNavBar({ pages }: { pages: NavigationPageType[] }) {

    const router = useRouter();
    const pathname = usePathname();
    const currentPage = pages.find(page => pathname === page.href || pathname.startsWith(`${page.href}/`))?.href;
    const dictionary = useLocale().dictionary.navigation;

    return (
        <Surface className="min-h-full overflow-y-auto flex flex-col p-6 items-center" >
            <Link href={"/"}>
                <Logo variant="logotype" />
            </Link>
            <Dropdown.Menu
                aria-label="Main navigation"
                className="flex flex-col gap-4 mt-6 w-full"
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
                        <Dropdown.Item
                            key={page.id}
                            id={page.href}
                            aria-label={page.id}
                            className="
                                p-4
                                font-medium
                                transition-colors
                                duration-350
                                ease-in-out-cubic
                                hover:bg-(--accent)/10
                                data-[selected=true]:bg-(--accent)
                                data-[selected=true]:text-accent-foreground
                                data-[selected=true]:shadow-2xl
                              ">
                            {dictionary[page.id]}
                        </Dropdown.Item>
                    );
                })}

            </Dropdown.Menu>
        </Surface>
    );
}