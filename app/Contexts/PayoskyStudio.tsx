"use client"
import { Unity } from "react-unity-webgl";
import { useSharedUnityContext } from "./UnityContextProvider";

export function PayoskyStudio() {

  const { unityProvider, isLoaded } = useSharedUnityContext();

  return (
    <Unity
      unityProvider={unityProvider}
      className="flex absolute w-full h-full "
      style={{ visibility: isLoaded ? "visible" : "hidden" }}
    />
  );
}