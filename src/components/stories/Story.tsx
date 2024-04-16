import { Story as StoryProps } from "types/Story";
import Selfie from "./Selfie";
import AudioWave from "./AudioWave";
import { useEffect, useState } from "react";

export default function Story({ id, media, selfie }: StoryProps) {
  const [randomMaskRotation, setRandomMaskRotation] = useState(0);
  const [randomSelfieRotation, setRandomSelfieRotation] = useState(0);

  useEffect(() => {
    if (randomMaskRotation === 0 && randomSelfieRotation === 0) {
      setRandomMaskRotation([0, 90, 180, 270][Math.floor(Math.random() * 4)]);
      setRandomSelfieRotation(
        [-2.5, -1.25, 0, 1.25, 2.5][Math.floor(Math.random() * 5)]
      );
    }
  }, []);
  return (
    <div className="my-10 relative cursor-pointer">
      <Selfie
        image={selfie}
        selfieRotation={randomSelfieRotation}
        maskRotation={randomMaskRotation}
      />
      {media.mime.includes("audio") && (
        <div className="absolute top-0 w-full h-full audio-player">
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
