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

export async function postStory(selfieUrl: string, mediaBlob: Blob) {
  const selfieBlob = await fetch(selfieUrl).then((r) => r.blob());
  const formData = new FormData();
  formData.append("files", selfieBlob);
  return await fetch(`${process.env.REACT_APP_API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  })
    .then((selfieFile) => selfieFile.json())
    .then(async (selfieFile) => {
      const formData = new FormData();
      const mediaMp4 = new File([mediaBlob], "media.mp4", {
        type: "video/mp4",
      });

      formData.append("files", mediaMp4);

      fetch(`${process.env.REACT_APP_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      })
        .then((mediaFile) => mediaFile.json())
        .then((mediaFile) => {
          fetch(`${process.env.REACT_APP_API_URL}/api/stories`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                selfie: selfieFile[0].id,
                media: mediaFile[0].id,
              },
            }),
          }).catch((error) => {
            alert(error);
            console.error(error);
          });
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
}
