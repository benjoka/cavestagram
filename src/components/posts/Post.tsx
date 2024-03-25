import { Post as PostProps } from "types/Post";
import Media from "./Media";

export default function Post({ title, text, media }: PostProps) {
  return (
    <div className="my-10 text-center">
      <h2>{title}</h2>
      <Media files={media} />
      <p className="text-center">{text}</p>
    </div>
  );
}
