import { Post as PostProps } from "types/Post";
import Media from "./Media";
import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";
export default function Post({
  reverse,
  title,
  text,
  media,
  painting,
}: PostProps) {
  const [randomMaskRotation, setRandomMaskRotation] = useState(0);
  const [randomPostRotation, setRandomPostRotation] = useState(0);
  const [randomScale, setRandomScale] = useState(0);
  const [randomMaskOrientation, setRandomMaskOrientation] = useState(1);

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
      setRandomMaskOrientation([-1, 1][Math.floor(Math.random() * 2)]);
    }
  }, []);
  return (
    <div className="my-10 relative">
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
          maskOrientation={randomMaskOrientation}
        />
        <div className="flex-1 text-center md:text-left md:px-[40px] lg:px-[100px] flex flex-col items-center justify-center relative ">
          <div className="w-full">
            <Parallax
              className="w-full h-full mt-[30px]"
              speed={-5}
              rotate={reverse ? [4, -4] : [-4, 4]}
            >
              <h2 className="hidden md:block">{title}</h2>
              <p>{text}</p>
            </Parallax>
          </div>
        </div>
      </div>
      <div className="h-[200px] relative">
        {painting && (
          <Parallax
            className={`absolute z-20 top-[100px] md:top-[150px] flex items-center justify-center w-full`}
            speed={-10}
            rotate={reverse ? [-5, 5] : [5, -5]}
            translateX={reverse ? [-4, 10] : [4, -10]}
            opacity={[0.5, 0]}
          >
            <img
              src={painting}
              className={`absolute w-full md:w-1/2 lg:w-1/3 ${
                reverse
                  ? "translate-x-[-30px] md:translate-x-[-80px]"
                  : "translateX-x-[30px] md:translate-x-[80px]"
              }`}
            />
          </Parallax>
        )}
      </div>
    </div>
  );
}
