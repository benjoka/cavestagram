import { Story as StoryProps } from "types/Story";
import Selfie from "./Selfie";
import { useRef, useState } from "react";
import audioBar from "assets/images/audio_playing_bar.png";
import AudioWave from "./AudioWave";

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
      {media.mime.includes("audio") && (
        <div
          className="absolute top-0 w-full h-full audio-player"
          onClick={triggerVideo}
        >
          <AudioWave
            url={
              media.provider === "cloudinary"
                ? media.url
                : `${process.env.REACT_APP_API_URL}${media.url}`
            }
          />
        </div>
      )}
    </div>
  );
}
