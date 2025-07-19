"use client"
import * as React from "react";
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";
import { PayoskyStudio } from "./Contexts/PayoskyStudio";
import { UnityContextProvider } from "./Contexts/UnityContextProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <UnityContextProvider>
                <ToastProvider />
                <PayoskyStudio />
                {children}
            </UnityContextProvider>
        </HeroUIProvider>
    )
}