import Media from "components/posts/Media";
import { Story as StoryProps } from "types/Story";
import Selfie from "./Selfie";
import { useRef, useState } from "react";

export default function Story({ id, media, selfie }: StoryProps) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const triggerVideo = () => {
    if (video.current) {
      if (!playing) {
        setPlaying(true);
        video.current.play();
      } else {
        setPlaying(false);
        video.current.pause();
      }
    }
  };
  return (
    <div className="my-10 relative" onClick={triggerVideo}>
      <Selfie image={selfie} />
      {media.mime.includes("video") && (
        <div
          className="absolute top-0 w-full h-full flex items-center overflow-hidden"
          style={{ opacity: playing ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          <video
            ref={video}
            playsInline
            onEnded={() => setPlaying(false)}
            className="w-full h-full object-cover"
            src={`${process.env.REACT_APP_API_URL}${media.url}`}
          />
        </div>
      )}
    </div>
  );
}
