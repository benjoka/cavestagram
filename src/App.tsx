import Content from "components/layout/Content";
import Navigation from "components/layout/Navigation";
import { useEffect, useState } from "react";
import { useAppStore } from "stores/AppStore";
import navigationMask from "assets/images/navigation_mask.png";
import Intro from "components/views/Intro";
import AudioMutedIcon from "assets/images/icons/icon_audio_muted.png";
import AudioIcon from "assets/images/icons/icon_audio.png";

export default function App() {
  const {
    activeView,
    cavePasseeEntered,
    muted,
    setMuted,
    currentlyPlayingAudio,
    currentStoryAudio,
  } = useAppStore();
  const [scrollTop] = useState(0);

  useEffect(() => {
    if (muted && currentlyPlayingAudio) {
      if ("setVolume" in currentlyPlayingAudio) {
        currentlyPlayingAudio.setVolume(0);
      } else {
        currentlyPlayingAudio.volume = 0;
      }
    } else if (currentlyPlayingAudio) {
      if ("setVolume" in currentlyPlayingAudio) {
        currentlyPlayingAudio.setVolume(1);
      } else {
        currentlyPlayingAudio.volume = 1;
      }
    }
  }, [muted]);
  return (
    <div className="cv-app flex flex-col">
      {!cavePasseeEntered && <Intro></Intro>}
      <div className="h-full">
        <div
          className="fixed w-full z-30"
          style={{
            height: scrollTop > 0 ? "40px" : "80px",
          }}
        >
          <img
            src={navigationMask}
            style={{
              bottom: scrollTop > 0 ? -30 : -10,
              transform: "rotate(180deg)",
            }}
            className="absolute w-full h-[40px] left-0"
          />
          <div
            className="absolute w-full origin-top-left bg-black px-[40px]"
            style={{
              paddingTop: scrollTop > 0 ? 10 : 20,
            }}
          >
            {activeView === "grotte-passe" && (
              <h1
                className="mb-0 text-center"
                style={{
                  fontSize: scrollTop > 0 ? "1.5rem" : "2rem",
                }}
              >
                La Grotte du Passé
              </h1>
            )}
            {activeView === "grotte-present" && (
              <h1
                className="mb-0 text-center"
                style={{
                  fontSize: scrollTop > 0 ? "1.5rem" : "2rem",
                }}
              >
                La Grotte du Présent
              </h1>
            )}
          </div>
          <div
            onClick={() => setMuted(!muted)}
            className="absolute right-[5px] md:right-[20px] top-[10px]"
          >
            {muted && <img src={AudioMutedIcon} width={50} height={50} />}
            {!muted && <img src={AudioIcon} width={50} height={50} />}
          </div>
        </div>
        <main className="cv-content flex-1 flex w-full items-center justify-center pt-[90px] pb-[100px] h-full">
          <Content />
        </main>
        <footer className="cv-footer w-full h-[100px] pt-[5px] flex justify-center fixed z-20 bg-black bottom-0">
          <Navigation />
        </footer>
      </div>
    </div>
  );
}
