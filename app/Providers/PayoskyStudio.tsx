`use client`
import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export function PayoskyStudio() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
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
    <Unity
      devicePixelRatio={window.devicePixelRatio}
      unityProvider={unityProvider}
      className="flex absolute w-full h-full "
      style={{ visibility: isLoaded ? "visible" : "hidden" }}

    />

  );
}