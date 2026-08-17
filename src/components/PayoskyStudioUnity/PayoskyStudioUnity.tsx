"use client"
import { Unity } from "react-unity-webgl";
import { useSharedUnityContext } from "@/src/contexts/UnityContextProvider";

export default function PayoskyStudioUnity() {
  const { unityProvider, isLoaded } = useSharedUnityContext();
  return (
    <>
      <Unity
        devicePixelRatio={1}
        unityProvider={unityProvider}
        className=" fixed w-full h-full "
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
      />
    </>
  );
}