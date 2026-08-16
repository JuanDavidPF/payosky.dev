import "@/src/app/globals.css";
import LandscapeNavBar from "@/src/components/LandscapeNavBar/LandscapeNavBar";
import LoadingScreen from "@/src/components/LoadingScreen/LoadingScreen";
import PayoskyStudioUnity from "@/src/components/PayoskyStudioUnity/PayoskyStudioUnity";
import { NavigationPages } from "@/src/navigation/pages";
import { headers } from "next/headers";
import { LocaleProvider } from "../contexts/LocaleContext";
import { UnityContextProvider } from "../contexts/UnityContextProvider";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const locale = headersList.get("x-locale") === "es" ? "es" : "en";

    return (
        <html lang={locale}>
            <body className="antialiased dark">
                <LocaleProvider locale={locale} >
                    <UnityContextProvider>
                        <PayoskyStudioUnity />
                        <main className="fixed inset-0 flex">
                            <LandscapeNavBar pages={NavigationPages} />
                            <div className="flex-1 flex items-center justify-center">
                                {children}
                            </div>
                        </main>
                        <LoadingScreen />
                    </UnityContextProvider>
                </LocaleProvider>
            </body>
        </html>
    );
}