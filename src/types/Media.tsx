import { Image } from "./Image";

export type Media = {
  files: Array<Image>;
  maskRotation: number | undefined;
  postRotation: number | undefined;
  maskOrientation: number | undefined;
};
