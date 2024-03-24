import Media from "components/posts/Media";
import { Story as StoryProps } from "types/Story";
import Selfie from "./Selfie";
import { useRef, useState } from "react";

export default function Story({ id, media, selfie }: StoryProps) {
  const [playing, setPlaying] = useState(false);
  const file = useRef<any>(null);

  const triggerMedia = () => {
    alert(playing);
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
          onClick={triggerMedia}
        >
          <video
            preload="none"
            ref={file}
            controls
            playsInline
            onEnded={() => setPlaying(false)}
            className="w-full h-full object-cover"
            src={`${process.env.REACT_APP_API_URL}${media.url}`}
          />
        </div>
      )}
      {media.mime.includes("audio") && (
        <div className="absolute top-0 w-full h-full" onClick={triggerMedia}>
          <audio
            preload="none"
            ref={file}
            onEnded={() => setPlaying(false)}
            src={`${process.env.REACT_APP_API_URL}${media.url}`}
          />
        </div>
      )}
    </div>
  );
}
