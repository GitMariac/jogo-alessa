import { useState } from "react";
import { MainMenu } from "./components/screens/MainMenu";
import { GamePlay } from "./components/screens/GamePlay";
import { HallOfFame } from "./components/screens/HallOfFame";
import { Settings } from "./components/screens/Settings";

type Screen = "menu" | "ortografia" | "acentuacao" | "hall" | "configuracoes";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    setCurrentScreen("menu");
  };

  return (
    <div className="w-full min-h-screen bg-black">
      {currentScreen === "menu" && <MainMenu onNavigate={handleNavigate} />}
      
      {currentScreen === "ortografia" && (
        <GamePlay gameType="ortografia" onBack={handleBack} />
      )}
      
      {currentScreen === "acentuacao" && (
        <GamePlay gameType="acentuacao" onBack={handleBack} />
      )}
      
      {currentScreen === "hall" && <HallOfFame onBack={handleBack} />}
      
      {currentScreen === "configuracoes" && <Settings onBack={handleBack} />}
    </div>
  );
}
