import { Story as StoryProps } from "types/Story";
import Selfie from "./Selfie";
import AudioWave from "./AudioWave";
import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";

export default function Story({ id, media, selfie }: StoryProps) {
  const [randomMaskRotation, setRandomMaskRotation] = useState(0);
  const [randomSelfieRotation, setRandomSelfieRotation] = useState(0);
  const [randomSelfieTranslation, setRandomSelfieTranslation] = useState(0);
  const [randomMaskOrientation, setRandomMaskOrientation] = useState(1);
  const [randomSelfieSpeed, setRandomSelfieSpeed] = useState(0);
  const [randomSelfieScale, setRandomSelfieScale] = useState(0);

  useEffect(() => {
    if (randomMaskRotation === 0 && randomSelfieRotation === 0) {
      setRandomMaskRotation([0, 90, 180, 270][Math.floor(Math.random() * 4)]);
      setRandomSelfieRotation([-2.5, 0, 2.5][Math.floor(Math.random() * 3)]);
      setRandomSelfieTranslation(
        [-10, -7.5, 5, -2.5, 0, 2.5, 5, 7.5, 10][Math.floor(Math.random() * 9)]
      );
      setRandomSelfieScale([0.7, 0.8, 0.9][Math.floor(Math.random() * 3)]);
      setRandomSelfieSpeed(
        [-5, -2.5, 0, 2.5, 5][Math.floor(Math.random() * 5)]
      );
      setRandomMaskOrientation([-1, 1][Math.floor(Math.random() * 2)]);
    }
  }, []);
  return (
    <div className="my-10 relative cursor-pointer">
      <Parallax
        className={`w-full h-full`}
        speed={randomSelfieSpeed}
        rotate={[-randomSelfieRotation, randomSelfieRotation]}
        translateX={[randomSelfieTranslation, -randomSelfieTranslation]}
        scale={[0.9, 1.1]}
        opacity={[1, 0.4]}
        easing="easeOutCubic"
      >
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
      </Parallax>
    </div>
  );
}
