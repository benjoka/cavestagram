import { useQuery } from "react-query";
import Strapi from "strapi-sdk-js";
import { Post } from "types/Post";

const strapi = new Strapi({
  url: process.env.REACT_APP_API_URL,
  store: {
    key: process.env.REACT_APP_API_TOKEN ?? "",
  },
});

export const usePostsQuery = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

export async function fetchPosts(): Promise<Post[]> {
  const res = await strapi.find<Post[]>("posts", {
    populate: {
      media: true,
    },
  });
  return res?.data;
}
