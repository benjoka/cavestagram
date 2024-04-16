import { Image } from "./Image";

export type Slider = {
  files: Array<Image>;
  maskRotation?: number | undefined;
  maskOrientation?: number | undefined;
};
