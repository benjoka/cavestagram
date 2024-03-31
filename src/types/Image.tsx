export type Image = {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  mime: string;
  provider?: string;
};
