import { Selfie as SelfieProps } from "types/Selfie";

export default function Selfie({
  image,
  maskRotation,
  selfieRotation,
  maskOrientation,
}: SelfieProps) {
  let url = image.url;
  if (
    process.env.REACT_APP_API_URL &&
    image.url.includes(process.env.REACT_APP_API_URL)
  ) {
    url = `${process.env.REACT_APP_API_URL}${image.url}`;
  }
  return (
    <div
      className="w-full relative"
      style={{ transform: `rotate(${selfieRotation}deg)` }}
    >
      <div className="w-full h-full">
        <div className="w-full h-full aspect-square ">
          <div
            style={{
              transform: `rotate(${maskRotation}deg) scaleX(${maskOrientation})`,
            }}
            className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center"
          />
          <img
            src={
              image.provider === "cloudinary"
                ? image.url
                : `${process.env.REACT_APP_API_URL}${image.url}`
            }
            className="object-cover w-full h-full p-[2px]"
          />
        </div>
      </div>
    </div>
  );
}
