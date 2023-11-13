import { notFound } from "next/navigation";
import Stories from "~/components/Stories";
import { getStories } from "~/utils/api";

export default async function Home() {
  const stories = await getStories();
  if (!stories) notFound();
  return <Stories stories={stories} />;
}
