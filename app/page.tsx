"use client"
import { Button } from "@heroui/button";
import { useSharedUnityContext } from "./Contexts/UnityContextProvider";

export default function Home() {

  const { sendMessage } = useSharedUnityContext();

  function handleClickSpawnEnemies() {
    sendMessage("Payo", "MoveToRandomPosition");
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Button color="warning" variant="faded" size="lg" radius="full" onPress={handleClickSpawnEnemies} >Move Capsule</Button>
    </div>
  );
}
