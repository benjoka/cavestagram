import { useAppStore } from "stores/AppStore";
import LogoUnfilled from "assets/images/logo/logo_unfilled.png";
import LogoFilled from "assets/images/logo/logo_filled.png";
import MatchIcon from "assets/images/icons/icon_match.png";
import MatchIconFill from "assets/images/icons/icon_match_filled.png";
import { useEffect, useState } from "react";
import FireAudio from "assets/audio/fire.mp3";
import IntroAudio from "assets/audio/intro.mp3";
import Birdman from "assets/images/paintings/birdman.png";
import Reindeers from "assets/images/paintings/reindeers_font_de_gaumes.png";
import Bull from "assets/images/paintings/bull.png";
import buttonBorder from "assets/images/icons/button_border.png";
import useMousePosition from "hooks/MousePosition";

export default function Intro() {
  const { setCaveSound, setCavePasseeEntered } = useAppStore();
  const [lampLit, setLampLit] = useState(false);
  const [enlightCave, setEnlightCave] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [introAudio, setIntroAudio] = useState<HTMLAudioElement | null>(null);
  const [playAudio, setPlayAudio] = useState(false);
  const mousePosition = useMousePosition();
  const [isTouch, setIsTouch] = useState(false);

  const [paintingPositions, setPaitingPositions] = useState({
    reindeers: { x: 0, y: 0 },
    birdman: { x: 0, y: 0 },
    bull: { x: 0, y: 0 },
  });

  const [paintingOpacities, setPaintingOpacities] = useState({
    reindeers: 0,
    birdman: 0,
    bull: 0,
  });

  const enterCave = () => {
    var fireAudio = new Audio(FireAudio);
    fireAudio.play();
    setLampLit(true);

    setTimeout(() => {
      setPlayAudio(true);
      setEnlightCave(true);
    }, 1000);
  };

  useEffect(() => {
    if (isTouch) {
      return;
    }
    if (lampLit) {
      setPaintingOpacities({
        reindeers: 1,
        birdman: 1,
        bull: 1,
      });
      return;
    }
    if (mousePosition.x && mousePosition.y) {
      const distanceReindeers =
        Math.abs(paintingPositions.reindeers.x - mousePosition.x) +
        Math.abs(paintingPositions.reindeers.y - mousePosition.y);
      const distanceBirdman =
        Math.abs(paintingPositions.birdman.x - mousePosition.x) +
        Math.abs(paintingPositions.birdman.y - mousePosition.y);
      const distanceBull =
        Math.abs(paintingPositions.bull.x - mousePosition.x) +
        Math.abs(paintingPositions.bull.y - mousePosition.y);

      const distance = 600;
      const range = -0.5 / distance;
      const offset = 0.5;

      setPaintingOpacities({
        reindeers:
          distanceReindeers < distance ? range * distanceReindeers + offset : 0,
        birdman:
          distanceBirdman < distance ? range * distanceBirdman + offset : 0,
        bull: distanceBull < distance ? range * distanceBull + offset : 0,
      });
    }
  }, [mousePosition]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
    }
    document.body.classList.add("no-scroll");
    setIntroAudio(new Audio(IntroAudio));
  }, []);

  const enter = () => {
    setPlayAudio(false);
    setFadeOut(true);
    document.body.classList.remove("no-scroll");
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
        transition: "opacity 3s linear",
      }}
    >
      <div
        className={`w-full h-full absolute ${
          lampLit
            ? "animate-pulse"
            : isTouch
            ? "animate-flash"
            : "animate-pulse"
        }
        `}
        style={{
          transition: "opacity 2s ease",
        }}
      >
        <div className="w-full h-1/2 relative flex justify-between items-center lg:items-end sm:justify-center pt-[50px] px-[50px]">
          <div className="w-1/3 xl:p-[50px] hidden lg:block">
            <img
              ref={(el) => {
                if (!el) return;
                let positions = paintingPositions;
                positions.reindeers.x =
                  el.getBoundingClientRect().left +
                  el.getBoundingClientRect().width / 2;
                positions.reindeers.y =
                  el.getBoundingClientRect().top +
                  el.getBoundingClientRect().height / 2;
                setPaitingPositions(positions);
              }}
              src={Reindeers}
              style={
                !isTouch && !lampLit
                  ? {
                      opacity: paintingOpacities.reindeers,
                    }
                  : {}
              }
              className="rotate-[-30deg] pointer-events-none animate-motion"
            />
          </div>
          <div className="w-full sm:w-8/12 md:1/2 lg:w-1/3 lg:h-full">
            <img
              ref={(el) => {
                if (!el) return;
                let positions = paintingPositions;
                positions.birdman.x =
                  el.getBoundingClientRect().left +
                  el.getBoundingClientRect().width / 2;
                positions.birdman.y =
                  el.getBoundingClientRect().top +
                  el.getBoundingClientRect().height / 2;
                setPaitingPositions(positions);
              }}
              src={Birdman}
              className="pointer-events-none animate-motion"
              style={
                !isTouch && !lampLit
                  ? {
                      opacity: paintingOpacities.birdman,
                    }
                  : {}
              }
            />
          </div>
          <div className="w-1/3 xl:p-[100px] hidden lg:block">
            <img
              ref={(el) => {
                if (!el) return;
                let positions = paintingPositions;
                positions.bull.x =
                  el.getBoundingClientRect().left +
                  el.getBoundingClientRect().width / 2;
                positions.bull.y =
                  el.getBoundingClientRect().top +
                  el.getBoundingClientRect().height / 2;
                setPaitingPositions(positions);
              }}
              src={Bull}
              style={
                !isTouch && !lampLit
                  ? {
                      opacity: paintingOpacities.bull,
                    }
                  : {}
              }
              className="rotate-[20deg] opacity-80 pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="w-10/12 sm:w-1/2 lg:w-1/4 aspect-square relative h-full flex justify-end items-center flex-col">
        <div className="w-10/12 max-w-[500px] aspect-square relative">
          {isTouch && (
            <img
              className={`h-[70%] absolute top-[-100px] left-[calc(50%-50px)] mb-[20px] cursor-pointer	${
                lampLit ? "hidden" : "animate-match"
              }`}
              src={MatchIconFill}
              onClick={enterCave}
            />
          )}
          <img
            className={`h-full absolute bottom-0 left-0 mb-[20px] cursor-pointer	${
              lampLit ? "" : "animate-wiggle-immediate origin-center"
            }`}
            src={LogoUnfilled}
            onClick={enterCave}
          />
          <img
            className={`h-full absolute bottom-0 left-0 pointer-events-none mb-[20px] ${
              lampLit ? "animate-pulse" : ""
            }`}
            src={LogoFilled}
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
            opacity: enlightCave ? 1 : 0,
            transition: "opacity 2s ease",
            fontSize: "1.5rem",
          }}
        >
          HÖHLE BETRETEN
        </button>
      </div>
      {!lampLit && !isTouch && mousePosition.x && mousePosition.y && (
        <div
          className="absolute w-[150px] h-[150px]"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 150,
          }}
        >
          <img
            className="w-full h-full absolute cursor-pointer pointer-events-none"
            src={MatchIcon}
          />
          <img
            className="w-full h-full absolute cursor-pointer pointer-events-none animate-pulse"
            src={MatchIconFill}
          />
        </div>
      )}
    </div>
  );
}
