import { useAppStore } from "stores/AppStore";
import passeIcon from "assets/images/logo/logo_unfilled.png";
import passeIconFill from "assets/images/logo/logo_filled.png";
import { useEffect, useState } from "react";
import FireAudio from "assets/audio/fire.mp3";
import IntroAudio from "assets/audio/intro.mp3";
import Birdman from "assets/images/paintings/birdman.png";
import Reindeers from "assets/images/paintings/reindeers_font_de_gaumes.png";
import Bull from "assets/images/paintings/bull.png";
import buttonBorder from "assets/images/icons/button_border.png";

export default function Intro() {
  const { setCaveSound, setCavePasseeEntered } = useAppStore();
  const [lampLit, setLampLit] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [introAudio, setIntroAudio] = useState<HTMLAudioElement | null>(null);
  const [playAudio, setPlayAudio] = useState(false);

  const enterCave = () => {
    var fireAudio = new Audio(FireAudio);
    fireAudio.play();
    setLampLit(true);
    setTimeout(() => {
      setCaveSound(true);
    }, 500);
    setTimeout(() => {
      setPlayAudio(true);
    }, 1000);
  };

  useEffect(() => {
    setIntroAudio(new Audio(IntroAudio));
  }, []);

  const enter = () => {
    setPlayAudio(false);
    setFadeOut(true);
  };

  useEffect(() => {
    if (introAudio) {
      if (playAudio) {
        introAudio.play();
      } else {
        introAudio.pause();
        setTimeout(() => {
          setCavePasseeEntered(true);
        }, 100);
      }
    }
  }, [playAudio]);

  return (
    <div
      className="bg-black z-50 w-full h-full flex justify-center items-center absolute top-0 left-0"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 2s ease",
      }}
    >
      <div
        className={`w-full h-full absolute ${lampLit ? "animate-pulse" : ""}`}
        style={{
          opacity: lampLit ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      >
        <div className="w-full h-1/2 relative flex justify-between items-center lg:items-end sm:justify-center pt-[50px] px-[50px]">
          <div className="w-1/3 xl:p-[50px] hidden lg:block">
            <img
              src={Reindeers}
              className="rotate-[-30deg] pointer-events-none"
            />
          </div>
          <div className="w-full sm:w-8/12 md:1/2 lg:w-1/3 lg:h-full">
            <img src={Birdman} className="pointer-events-none" />
          </div>
          <div className="w-1/3 xl:p-[100px] hidden lg:block">
            <img
              src={Bull}
              className="rotate-[20deg] opacity-80 pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="w-10/12 sm:w-1/2 lg:w-1/4 aspect-square relative h-full flex justify-end items-center flex-col">
        <div className="w-10/12 max-w-[500px] aspect-square relative">
          <img
            className={`h-full absolute bottom-0 left-0 mb-[20px] cursor-pointer	${
              lampLit ? "" : "animate-wiggle origin-center"
            }`}
            src={passeIcon}
            onClick={enterCave}
          />
          <img
            className={`h-full absolute bottom-0 left-0 pointer-events-none mb-[20px] ${
              lampLit ? "animate-pulse" : ""
            }`}
            src={passeIconFill}
            style={{ opacity: lampLit ? 1 : 0, transition: "opacity 1s ease" }}
          />
        </div>
        <button
          className="w-full max-w-[400px] caves-button mb-[50px]"
          onClick={() => enter()}
          style={{
            backgroundImage: `url(${buttonBorder})`,
            backgroundSize: "100% 100%",
            padding: "30px 60px",
            opacity: lampLit ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          HÖHLE BETRETEN
        </button>
      </div>
    </div>
  );
}
