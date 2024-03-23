import { Selfie as SelfieProps } from "types/Selfie";

export default function Selfie({ image }: SelfieProps) {
  return (
    <div className="w-full relative">
      <div className="w-full h-full">
        <div className="w-full h-full aspect-square ">
          <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-[length:101%] bg-center" />
          <img
            src={`${process.env.REACT_APP_API_URL}${image.url}`}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
