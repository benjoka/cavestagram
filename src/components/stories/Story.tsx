import { Story as StoryProps } from "types/Story";
import Selfie from "./Selfie";
import { useRef, useState } from "react";
import audioBar from "assets/images/audio_playing_bar.png";

export default function Story({ id, media, selfie }: StoryProps) {
  const [playing, setPlaying] = useState(false);
  const file = useRef<any>(null);

  const triggerVideo = () => {
    if (file.current) {
      if (!playing) {
        setPlaying(true);
        file.current.play();
      } else {
        setPlaying(false);
        file.current.pause();
      }
    }
  };

  return (
    <div className="my-10 relative">
      <Selfie image={selfie} />
      {media.mime.includes("video") && (
        <div
          className="absolute top-0 w-full h-full flex items-center overflow-hidden"
          style={{ opacity: playing ? 1 : 0, transition: "opacity 0.5s ease" }}
          onClick={triggerVideo}
        >
          <video
            preload="none"
            ref={file}
            playsInline
            onEnded={() => setPlaying(false)}
            className="w-full h-full object-cover"
            src={`${process.env.REACT_APP_API_URL}${media.url}`}
          />
        </div>
      )}
      {media.mime.includes("audio") && (
        <div
          className="absolute top-0 w-full h-full audio-player"
          onClick={triggerVideo}
        >
          <audio
            preload="none"
            ref={file}
            onEnded={() => setPlaying(false)}
            className="opacity-0"
            src={`${process.env.REACT_APP_API_URL}${media.url}`}
          />
          {playing && (
            <div className="playing-container">
              <div className="playing">
                <span
                  className="playing__bar playing__bar1"
                  style={{ backgroundImage: `url(${audioBar})` }}
                ></span>
                <span
                  className="playing__bar playing__bar2"
                  style={{ backgroundImage: `url(${audioBar})` }}
                ></span>
                <span
                  className="playing__bar playing__bar3"
                  style={{ backgroundImage: `url(${audioBar})` }}
                ></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
