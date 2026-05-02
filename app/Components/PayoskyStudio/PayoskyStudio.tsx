"use client"
import React, { useCallback, useEffect, useState } from "react";
import { Unity } from "react-unity-webgl";
import { useSharedUnityContext } from "../../Contexts/UnityContextProvider";

export function PayoskyStudio() {

  const { unityProvider, isLoaded } = useSharedUnityContext();

  return (
    <Unity
      unityProvider={unityProvider}
      devicePixelRatio={2}
      className="flex absolute w-full h-full "
      style={{ visibility: isLoaded ? "visible" : "hidden" }}
    />
  );
}