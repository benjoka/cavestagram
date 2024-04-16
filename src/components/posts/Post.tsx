import { Post as PostProps } from "types/Post";
import Media from "./Media";
import { useEffect, useState } from "react";

export default function Post({ reverse, title, text, media }: PostProps) {
  const [randomMaskRotation, setRandomMaskRotation] = useState(0);
  const [randomPostRotation, setRandomPostRotation] = useState(0);
  const [randomScale, setRandomScale] = useState(0);

  useEffect(() => {
    if (
      randomMaskRotation === 0 &&
      randomPostRotation === 0 &&
      randomScale === 0
    ) {
      setRandomMaskRotation([0, 90, 180, 270][Math.floor(Math.random() * 4)]);
      setRandomPostRotation(
        [-2.5, -1.25, 0, 1.25, 2.5][Math.floor(Math.random() * 5)]
      );
    }
  }, []);
  return (
    <div className="my-10">
      <h2 className="md:hidden text-center">{title}</h2>
      <div
        className={
          reverse
            ? "flex-row-reverse md:flex items-center"
            : "flex-row md:flex items-center"
        }
      >
        <Media
          files={media}
          postRotation={randomPostRotation}
          maskRotation={randomMaskRotation}
        />
        <div className="flex-1 text-center md:text-left md:px-[40px] lg:px-[100px] flex flex-col items-center justify-center">
          <div className="w-full">
            <h2 className="hidden md:block">{title}</h2>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
