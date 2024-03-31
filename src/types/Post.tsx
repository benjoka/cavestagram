import { Image } from "./Image";
import { Painting } from "./Painting";

export type Post = {
  id: number;
  title: string;
  text: string;
  location: string;
  references: string;
  media: Array<Image>;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  reverse?: boolean;
};
