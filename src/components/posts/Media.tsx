import { Media as MediaProps } from "types/Media";
import Slider from "./Slider";
import Video from "./Video";
import { Parallax } from "react-scroll-parallax";

export default function Media({
  files,
  maskRotation,
  postRotation,
  maskOrientation,
}: MediaProps) {
  const renderImage = () => {
    if (files.length > 1 || !files[0].mime.includes("image")) {
      return null;
    }
    return (
      <div className="w-full h-full aspect-square">
        <div
          style={{
            transform: `rotate(${maskRotation}deg) scale(${maskOrientation})`,
          }}
          className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center"
        />
        <Parallax className="w-full h-full" opacity={[1, 0.5]}>
          <img
            loading="lazy"
            src={
              files[0].provider === "cloudinary"
                ? files[0].url
                : `${process.env.REACT_APP_API_URL}${files[0].url}`
            }
            className="object-cover w-full h-full p-[2px]"
          />
        </Parallax>
      </div>
    );
  };
  const renderVideo = () => {
    if (files.length > 1 || !files[0].mime.includes("video")) {
      return null;
    }
    return (
      <Parallax className="w-full h-full" opacity={[1, 0.5]}>
        <Video
          id={files[0].id}
          maskOrientation={maskOrientation}
          maskRotation={maskRotation}
          url={
            files[0].provider === "cloudinary"
              ? files[0].url
              : `${process.env.REACT_APP_API_URL}${files[0].url}`
          }
        />
      </Parallax>
    );
  };
  const renderSlider = () => {
    if (files.length === 1) {
      return null;
    }
    return (
      <Parallax className="w-full h-full" opacity={[1, 0.5]}>
        <Slider
          files={files}
          maskRotation={maskRotation}
          maskOrientation={maskOrientation}
        />
      </Parallax>
    );
  };
  return (
    <div
      className="w-full md:w-1/2 lg:w-4/12 relative"
      style={{
        transform: `rotate(${postRotation}deg)`,
      }}
    >
      {renderImage()}
      {renderVideo()}
      {renderSlider()}
    </div>
  );
}
