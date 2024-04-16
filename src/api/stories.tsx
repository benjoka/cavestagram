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
    sort: "createdAt:desc",
  });
  return res?.data;
}

export async function postStory(selfieUrl: string, mediaBlob: Blob) {
  const selfieBlob = await fetch(selfieUrl).then((r) => r.blob());
  let formData = new FormData();
  formData.append("files", selfieBlob);
  const selfieFile: any = await fetch(
    `${process.env.REACT_APP_API_URL}/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const selfieJson = await selfieFile.json();
  const selfieId = selfieJson[0].id;

  formData = new FormData();
  formData.append("files", mediaBlob);
  const mediaFile: any = await fetch(
    `${process.env.REACT_APP_API_URL}/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const mediaJson = await mediaFile.json();
  const mediaId = mediaJson[0].id;

  const story: any = await fetch(
    `${process.env.REACT_APP_API_URL}/api/stories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          selfie: selfieId,
          media: mediaId,
        },
      }),
    }
  );

  const storyJson = await story.json();
  return storyJson.data.id;
}
