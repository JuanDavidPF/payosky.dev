"use client"
import Logo from "@/src/components/Logo/Logo";
import { NavigationPageType } from "@/src/navigation/pages";
import { Dropdown } from "@heroui/react/dropdown";
import { Label } from "@heroui/react/label";
import { Surface } from "@heroui/react/surface";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function LandscapeNavBar({ pages }: { pages: NavigationPageType[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const currentPage = pages.find(page =>
        pathname === page.href.en ||
        pathname.startsWith(`${page.href.en}/`)
    )?.href.en;

    return (
        <Surface className="min-h-full overflow-y-auto flex flex-col p-6 items-center" >
            <Link href={"/"}>
                <Logo
                    draggable={false}
                    variant="Logotype"
                    width={200}
                    height={200}
                />
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
                            id={page.href["en"]}
                            aria-label={page.id}
                            className="p-4 transition-colors duration-350 ease-in-out-cubic data-[selected=true]:bg-red-400"
                        >
                            {page.label["en"]}
                        </Dropdown.Item>
                    );
                })}

            </Dropdown.Menu>
        </Surface>
    );
}