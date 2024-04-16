import { Media as MediaProps } from "types/Media";
import Slider from "./Slider";
import Video from "./Video";

export default function Media({
  files,
  maskRotation,
  postRotation,
}: MediaProps) {
  const renderImage = () => {
    if (files.length > 1 || !files[0].mime.includes("image")) {
      return null;
    }
    return (
      <div className="w-full h-full aspect-square">
        <div
          style={{ transform: `rotate(${maskRotation}deg)` }}
          className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center"
        />
        <img
          loading="lazy"
          src={
            files[0].provider === "cloudinary"
              ? files[0].url
              : `${process.env.REACT_APP_API_URL}${files[0].url}`
          }
          className="object-cover w-full h-full p-[2px]"
        />
      </div>
    );
  };
  const renderVideo = () => {
    if (files.length > 1 || !files[0].mime.includes("video")) {
      return null;
    }
    return (
      <Video
        id={files[0].id}
        url={
          files[0].provider === "cloudinary"
            ? files[0].url
            : `${process.env.REACT_APP_API_URL}${files[0].url}`
        }
      />
    );
  };
  const renderSlider = () => {
    if (files.length === 1) {
      return null;
    }
    return <Slider files={files} maskRotation={maskRotation} />;
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
