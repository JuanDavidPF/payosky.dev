"use client"
import React, { createContext, useContext } from "react";
import { useUnityContext } from "react-unity-webgl";

// Extract the correct type from the hook
type UnityContextType = ReturnType<typeof useUnityContext>;

// Create context with proper type
const UnityCtx = createContext<UnityContextType | null>(null);

// Context Provider
export const UnityContextProvider = ({ children }: { children: React.ReactNode }) => {
    const unityContext = useUnityContext({
        loaderUrl: "/PayoskyStudio/Build/PayoskyStudio.loader.js",
        dataUrl: "/PayoskyStudio/Build/PayoskyStudio.data.unityweb",
        frameworkUrl: "/PayoskyStudio/Build//PayoskyStudio.framework.js.unityweb",
        codeUrl: "/PayoskyStudio/Build/PayoskyStudio.wasm.unityweb",
        webglContextAttributes: {
            alpha: true,
            antialias: true,
            depth: true,
            failIfMajorPerformanceCaveat: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: true,
            stencil: true,
            desynchronized: true,
        }
    });

    return (
        <UnityCtx.Provider value={unityContext}>
            {children}
        </UnityCtx.Provider>
    );
};

// Hook to access the Unity context safely
export const useSharedUnityContext = (): UnityContextType => {
    const context = useContext(UnityCtx);
    if (!context) {
        throw new Error("useSharedUnityContext must be used within a UnityContextProvider");
    }
    return context;
};
