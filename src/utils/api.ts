import { env } from "~/env.mjs";

type Item = Record<string, string | number | number[] | boolean>;

export type Story = {
  id: number;
  type: string;
  title: string;
  time: number;
  score: number;
  by: string;
  descendants: number;
  kids: number[];
  url: string;
};

export const getStories = async () => {
  const response = await fetch(`${env.HN_API_URL}/topstories.json`);
  const ids = (await response.json()) as number[];
  const items = await Promise.all(
    ids.map(async (id) => {
      const response = await fetch(`${env.HN_API_URL}/item/${id}.json`);
      const item = (await response.json()) as Item;
      return item;
    }),
  );
  const stories = items
    .filter((item) => {
      const type = item.type;
      return item.dead !== true && typeof type === "string" && type === "story";
    })
    .map((item) => item as Story);
  return stories.slice(0, 50);
};

export const getStory = async (id: number) => {
  const response = await fetch(`${env.HN_API_URL}/item/${id}.json`);
  const item = (await response.json()) as Item;
  const type = item.type;
  if (!(item.dead !== true && typeof type === "string" && type === "story"))
    return null;
  return item as Story;
};
