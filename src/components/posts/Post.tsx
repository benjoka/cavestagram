import { Post as PostProps } from "types/Post";
import Media from "./Media";

export default function Post({ reverse, title, text, media }: PostProps) {
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
        <Media files={media} />
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
