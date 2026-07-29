import "@/src/app/globals.css";
import Providers from "@/src/app/Providers";
import LandscapeNavBar from "@/src/components/LandscapeNavBar/LandscapeNavBar";
import LoadingScreen from "@/src/components/LoadingScreen/LoadingScreen";
import PayoskyStudioUnity from "@/src/components/PayoskyStudioUnity/PayoskyStudioUnity";
import { NavigationPages } from "@/src/navigation/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payosky Studio",
  description: "Portfolio and playground for Juan Payán, a game developer and programmer. Explore interactive projects, demos, and experiments showcasing creativity and technical skills in game development.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased dark">
        <Providers>
          <PayoskyStudioUnity />
          <main className="fixed inset-0 flex " >
            <LandscapeNavBar pages={NavigationPages} />
            <div className="flex-1 flex items-center justify-center">
              {children}
            </div>
          </main>
          <LoadingScreen />
        </Providers>
      </body>
    </html>
  );
}