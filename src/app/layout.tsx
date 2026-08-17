import "@/src/app/globals.css";
import { UnityContextProvider } from "../contexts/UnityContextProvider";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
    variable: "--font-fredoka",
    subsets: ["latin"],
});

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