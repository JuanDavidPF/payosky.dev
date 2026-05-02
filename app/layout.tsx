import "@/app/globals.css";
import type { Metadata } from "next";
import { Providers } from "./Providers";
import { PayoskyStudio } from "./Contexts/PayoskyStudio";
import { LoadingScreen } from "./Components/LoadingScreen/LoadingScreen";



export const metadata: Metadata = {
  title: "Payosky Studio",
  description: "Portfolio and playground for Juan Payán, a game developer and programmer. Explore interactive projects, demos, and experiments showcasing creativity and technical skills in game development.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased`}
      >
        <Providers>
          <PayoskyStudio />
          {children}
          <LoadingScreen />
        </Providers>
      </body>
    </html>
  );
}