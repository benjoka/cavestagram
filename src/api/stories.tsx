import { useQuery } from "react-query";
import Strapi from "strapi-sdk-js";
import { Story } from "types/Story";

const strapi = new Strapi({
  url: process.env.REACT_APP_API_URL,
  store: {
    key: process.env.REACT_APP_API_TOKEN ?? "",
  },
});

export const useStoriesQuery = () =>
  useQuery({
    queryKey: ["stories"],
    queryFn: () => fetchStories(),
  });

export async function fetchStories(): Promise<Story[]> {
  const res = await strapi.find<any[]>("stories", {
    populate: {
      selfie: true,
      media: true,
    },
  });
  return res?.data;
}
