import { Story as StoryProps } from "types/Story";
import Selfie from "./Selfie";
import AudioWave from "./AudioWave";
import { useEffect, useState } from "react";

export default function Story({ id, media, selfie }: StoryProps) {
  const [randomMaskRotation, setRandomMaskRotation] = useState(0);
  const [randomSelfieRotation, setRandomSelfieRotation] = useState(0);
  const [randomMaskOrientation, setRandomMaskOrientation] = useState(1);

  useEffect(() => {
    if (randomMaskRotation === 0 && randomSelfieRotation === 0) {
      setRandomMaskRotation([0, 90, 180, 270][Math.floor(Math.random() * 4)]);
      setRandomSelfieRotation(
        [-7.5, -5, -2.5, 0, 2.5, 5, 7.5][Math.floor(Math.random() * 7)]
      );
      setRandomMaskOrientation([-1, 1][Math.floor(Math.random() * 2)]);
    }
  }, []);
  return (
    <div className="my-10 relative cursor-pointer">
      <Selfie
        image={selfie}
        selfieRotation={randomSelfieRotation}
        maskRotation={randomMaskRotation}
        maskOrientation={randomMaskOrientation}
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
