import { useWavesurfer } from "@wavesurfer/react";
import { useCallback, useEffect, useRef, useState } from "react";
import iconCircle from "assets/images/icons/icon_circle.png";

export default function AudioWave({ url }: { url: string }) {
  const waveContainer = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    url: url.replace(".webm", ".wav"),
    container: waveContainer,
    cursorColor: "transparent",
    height: "auto",
    dragToSeek: true,
    normalize: true,
    waveColor: "black",
    progressColor: "white",
    interact: false,
  });

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on("ready", () => {
        setLoading(false);
      });
    }
  }, [wavesurfer]);

  const play = () => {
    console.log(loading);
    if (!loading) {
      wavesurfer && wavesurfer.play();
    }
  };

  const pause = () => {
    if (!loading) {
      wavesurfer && wavesurfer.pause();
    }
  };

  const renderLoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <img src={iconCircle} width={70} className="animate-spin-slow" />
      </div>
    );
  };

  return (
    <div className="w-full h-full" onClick={isPlaying ? pause : play}>
      <div
        className="w-full h-full p-[50px] bg-black/50"
        style={{ opacity: loading || isPlaying ? 1 : 0 }}
      >
        {loading && renderLoadingSpinner()}
        <div
          ref={waveContainer}
          className="w-full h-full opacity-80"
          style={{ display: loading ? "none" : "block" }}
        ></div>
      </div>
    </div>
  );
}
