import "@/src/app/globals.css";
import { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { UnityContextProvider } from "../contexts/UnityContextProvider";

const fredoka = Fredoka({
    variable: "--font-fredoka",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "PayoskyStudio",
        template: "%s | PayoskyStudio",
    },
    description: "PayoskyStudio is my personal space to share who I am, the projects I create, the things I'm passionate about, and the thoughts I publish along the way.",
    openGraph: {
        title: "PayoskyStudio",
        description: "My personal space to share who I am, the projects I create, the things I'm passionate about, and the thoughts I publish along the way.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "PayoskyStudio",
        description: "My personal space to share who I am, the projects I create, the things I'm passionate about, and the thoughts I publish along the way.",
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html className={fredoka.variable}>
            <body className="antialiased dark bg-surface">
                <UnityContextProvider>
                    {children}
                </UnityContextProvider>
            </body>
        </html>
    );
}