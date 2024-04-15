import { Story as StoryProps } from "types/Story";
import Selfie from "./Selfie";
import AudioWave from "./AudioWave";

export default function Story({ id, media, selfie }: StoryProps) {
  return (
    <div className="my-10 relative">
      <Selfie image={selfie} />
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
