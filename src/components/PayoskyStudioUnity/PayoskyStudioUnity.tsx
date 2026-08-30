"use client"
import { Unity } from "react-unity-webgl";
import { useSharedUnityContext } from "@/src/contexts/UnityContextProvider";
import { useEffect, useState } from "react";

export default function PayoskyStudioUnity() {
  const { unityProvider, isLoaded } = useSharedUnityContext();
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 2))
  }, [])

  return (
    <Unity
      matchWebGLToCanvasSize
      devicePixelRatio={dpr}
      unityProvider={unityProvider}
      className="absolute h-full w-full"
      style={{ visibility: isLoaded ? "visible" : "hidden" }}
    />
  );
}