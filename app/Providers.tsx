"use client"
import * as React from "react";

import { HeroUIProvider } from '@heroui/react'
import { PayoskyStudio } from "./Providers/PayoskyStudio";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <PayoskyStudio />
            {children}
        </HeroUIProvider>
    )
}