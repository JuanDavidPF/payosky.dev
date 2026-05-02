import * as React from "react";
import { PayoskyStudio } from "./Contexts/PayoskyStudio";
import { UnityContextProvider } from "./Contexts/UnityContextProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <UnityContextProvider>
            {children}
        </UnityContextProvider>
    )
}