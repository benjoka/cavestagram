import passeIcon from "assets/images/icons/icon_lamp.png";
import passeIconFill from "assets/images/icons/icon_lamp_fill.png";
import presentIcon from "assets/images/icons/icon_lighter.png";
import presentIconFill from "assets/images/icons/icon_lighter_fill.png";
import navigationMask from "assets/images/navigation_mask.png";
import LighterAudio from "assets/audio/lighter.mp3";
import FireAudio from "assets/audio/fire.mp3";

import { useAppStore } from "stores/AppStore";
import { useEffect } from "react";

export default function Navigation() {
  const { cavePasseeEntered, activeView, setActiveView } = useAppStore();
  var lighter = new Audio(LighterAudio);
  var fire = new Audio(FireAudio);
  fire.volume = 0.3;

  const switchToGrottePasse = () => {
    fire.play();
    setTimeout(() => {
      setActiveView("grotte-passe");
    }, 200);
  };
  const switchToGrottePresent = () => {
    lighter.play();
    setTimeout(() => {
      setActiveView("grotte-present");
    }, 200);
  };

  return (
    <div className="cv-app w-full h-full max-w-[500px] flex flex-row justify-around">
      <img
        src={navigationMask}
        className="absolute w-full h-[40px] top-[-40px] left-0"
      />
      <div
        className="h-full flex items-start"
        onClick={() => switchToGrottePasse()}
      >
        <div className="w-[60px] h-[60px]">
          <img
            src={passeIcon}
            width={50}
            height={50}
            className="absolute mt-[10px]"
          />
          {activeView === "grotte-passe" && (
            <img
              src={passeIconFill}
              width={50}
              height={50}
              className="mt-[10px] animate-pulse"
            />
          )}
        </div>
      </div>
      <div
        className="h-full flex items-start"
        onClick={() => switchToGrottePresent()}
      >
        <div className="w-[60px] h-[60px]">
          <img src={presentIcon} width={60} height={60} className="absolute" />
          {activeView === "grotte-present" && (
            <img
              src={presentIconFill}
              width={60}
              height={60}
              className="animate-pulse"
            />
          )}
        </div>
      </div>
    </div>
  );
}
