import Media from "components/posts/Media";
import { Story as StoryProps } from "types/Story";
import Selfie from "./Selfie";

export default function Story({ id, media, selfie }: StoryProps) {
  return (
    <div className="my-10">
      <Selfie image={selfie} />
    </div>
  );
}
