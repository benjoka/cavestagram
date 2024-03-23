import { Image } from "./Image";

export type Story = {
  id: number;
  media: Image;
  selfie: Image;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};
