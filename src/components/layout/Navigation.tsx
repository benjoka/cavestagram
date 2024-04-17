import passeIcon from "assets/images/icons/icon_lamp.png";
import passeIconFill from "assets/images/icons/icon_lamp_fill.png";
import presentIcon from "assets/images/icons/icon_match.png";
import presentIconFill from "assets/images/icons/icon_match_filled.png";
import navigationMask from "assets/images/navigation_mask.png";
import LighterAudio from "assets/audio/lighter.mp3";
import FireAudio from "assets/audio/fire.mp3";

import { useAppStore } from "stores/AppStore";

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
    <div className="cv-app w-full h-full max-w-[500px] lg:max-w-[90%] flex flex-row justify-around md:justify-between">
      <img
        src={navigationMask}
        className="absolute w-full h-[40px] top-[-40px] left-0"
      />
      <div
        className="h-full flex items-start cursor-pointer"
        onClick={() => switchToGrottePasse()}
      >
        <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
          <img
            src={passeIcon}
            width={50}
            height={50}
            className="mt-[10px] md:mt-0 absolute top-[-10px] w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
          />
          {activeView === "grotte-passe" && (
            <img
              src={passeIconFill}
              width={50}
              height={50}
              className="mt-[10px] md:mt-0 absolute top-[-10px] animate-pulse w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            />
          )}
        </div>
      </div>
      <div
        className="h-full flex items-start cursor-pointer"
        onClick={() => switchToGrottePresent()}
      >
        <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
          <img
            src={presentIcon}
            width={60}
            height={60}
            className="mt-[10px] md:mt-0 absolute top-[-10px] w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
          />
          {activeView === "grotte-present" && (
            <img
              src={presentIconFill}
              width={60}
              height={60}
              className="mt-[10px] md:mt-0 absolute top-[-10px] animate-pulse w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
