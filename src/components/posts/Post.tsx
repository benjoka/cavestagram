import { Post as PostProps } from "types/Post";
import Media from "./Media";

export default function Post({
  id,
  title,
  text,
  location,
  references,
  media,
}: PostProps) {
  return (
    <div className="my-10">
      <h2>{title}</h2>
      <Media files={media} />
      <p className="text-justify">{text}</p>
    </div>
  );
}
