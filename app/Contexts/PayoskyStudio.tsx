"use client"
import { addToast } from "@heroui/toast";
import React, { useCallback, useEffect, useState } from "react";
import { Unity } from "react-unity-webgl";
import { useSharedUnityContext } from "./UnityContextProvider";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";

export function PayoskyStudio() {

  const { unityProvider, addEventListener, removeEventListener, isLoaded } = useSharedUnityContext();

  const handleToast = useCallback((toastMessage: ReactUnityEventParameter) => {
    addToast({
      title: "Hello from Unity",
      description: toastMessage?.toString(),
      color: 'secondary',
      variant: "flat",
      size: "lg",
      radius: "md",
    });
  }, []);


  useEffect(() => {
    addEventListener("SendToast", handleToast);
    return () => {
      removeEventListener("SendToast", handleToast);
    };
  }, [addEventListener, removeEventListener, handleToast]);

  return (
    <Unity
      unityProvider={unityProvider}
      devicePixelRatio={2}
      className="flex absolute w-full h-full "
      style={{ visibility: isLoaded ? "visible" : "hidden" }}
    />
  );
}