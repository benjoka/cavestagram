import { useAppStore } from "stores/AppStore";
import passeIcon from "assets/images/icons/icon_lamp.png";
import passeIconFill from "assets/images/icons/icon_lamp_fill.png";
import { useEffect, useState } from "react";
import fire from "assets/audio/fire.mp3";

export default function Intro() {
  const {
    cavePasseeEntered,
    setCavePasseeEntered,
    setCaveSound,
    setVoicePasseAudio,
    setVoicePresentAudio,
  } = useAppStore();
  const [lampLit, setLampLit] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const enterCave = () => {
    var fireAudio = new Audio(fire);
    fireAudio.play();
    setLampLit(true);
    setTimeout(() => {
      setCaveSound(true);
    }, 500);
    setTimeout(() => {
      setFadeOut(true);
    }, 2000);
    setTimeout(() => {
      setCavePasseeEntered(true);
    }, 3000);
  };
  return (
    <div
      className="bg-black z-50 w-full h-full flex justify-center items-center absolute top-0 left-0"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 2s ease",
      }}
    >
      <div className="w-1/2 md:w-1/4 aspect-square relative">
        <img
          className="w-full absolute top-0 left-0"
          src={passeIcon}
          onClick={enterCave}
        />
        <img
          className="w-full absolute top-0 left-0 pointer-events-none transition-"
          src={passeIconFill}
          style={{ opacity: lampLit ? 1 : 0, transition: "opacity 1s ease" }}
        />
      </div>
    </div>
  );
}
