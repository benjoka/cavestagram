import { Image } from "./Image";

export type Selfie = {
  image: Image;
  maskRotation: number | undefined;
  selfieRotation: number | undefined;
  maskOrientation: number | undefined;
};
