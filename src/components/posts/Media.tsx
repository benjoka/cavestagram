import { Media as MediaProps } from "types/Media";
import Slider from "./Slider";
import { useEffect, useRef } from "react";
import useOnScreen from "hooks/OnScreen";
import Video from "./Video";

export default function Media({ files }: MediaProps) {
  const renderImage = () => {
    if (files.length > 1 || !files[0].mime.includes("image")) {
      return null;
    }
    return (
      <div className="w-full h-full aspect-square">
        <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-[length:101%] bg-center" />
        <img
          src={`${process.env.REACT_APP_API_URL}${files[0].url}`}
          className="object-cover"
        />
      </div>
    );
  };
  const renderVideo = () => {
    if (files.length > 1 || !files[0].mime.includes("video")) {
      return;
    }
    return <Video id={files[0].id} url={files[0].url} />;
  };
  const renderSlider = () => {
    if (files.length === 1) {
      return null;
    }
    return <Slider files={files} />;
  };
  return (
    <div className="w-full relative">
      <div className="w-full h-full">
        {renderImage()}
        {renderVideo()}
        {renderSlider()}
      </div>
    </div>
  );
}
