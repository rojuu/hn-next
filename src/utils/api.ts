import { env } from "~/env.mjs";

type Item = Record<string, string | number | number[]>;

export type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
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
  console.log(items);
  const stories = items
    .filter((item) => {
      const type = item.type;
      return typeof type === "string" && type === "story";
    })
    .map((item) => item as Story);
  return stories;
};
