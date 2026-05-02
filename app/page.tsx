"use client"
import { Button } from "@heroui/react";
import { useSharedUnityContext } from "./Contexts/UnityContextProvider";

export default function Home() {

  const { sendMessage } = useSharedUnityContext();

  function handleClickSpawnEnemies() {
    sendMessage("Payo", "MoveToRandomPosition");
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Button variant="primary" size="lg" onPress={handleClickSpawnEnemies} >Move Capsule</Button>
    </div>
  );
}
