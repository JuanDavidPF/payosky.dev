import { UnityContextProvider } from "@/src/contexts/UnityContextProvider";
import * as React from "react";


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <UnityContextProvider>
            {children}
        </UnityContextProvider>
    )
}