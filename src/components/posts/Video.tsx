import { useEffect, useRef, useState } from "react";
import useOnScreen from "hooks/OnScreen";

type Props = {
  id: number;
  url: string;
  maskRotation?: number | undefined;
  maskOrientation?: number | undefined;
};

export default function Video({ url, maskRotation, maskOrientation }: Props) {
  const videoIndicator = useRef<HTMLDivElement>(null);
  const videoVisible = useOnScreen(videoIndicator);
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    if (video.current) {
      const isPlaying =
        video.current.currentTime > 0 &&
        !video.current.paused &&
        !video.current.ended &&
        video.current.readyState > video.current.HAVE_CURRENT_DATA;
      if (videoVisible && !isPlaying) {
        video.current.play();
      } else if (!videoVisible && isPlaying) {
        video.current.pause();
      }
    }
  }, [videoVisible]);

  return (
    <div
      className="w-full h-full aspect-square flex items-center justify-center"
      onClick={() => setMuted(!muted)}
    >
      <div ref={videoIndicator}></div>
      <div
        className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center"
        style={{
          transform: `rotate(${maskRotation}deg) scale(${maskOrientation})`,
        }}
      />
      <video
        preload="none"
        muted={muted}
        loop
        ref={video}
        playsInline
        style={{
          padding: 2,
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      >
        <source
          src={url.replace("/upload", "/upload/q_auto")}
          type="video/mp4"
        />
      </video>
    </div>
  );
}
