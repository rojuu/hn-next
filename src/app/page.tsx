import Stories from "~/components/Stories";
import { getStories } from "~/utils/api";

export default async function Home() {
  const stories = await getStories();
  return <Stories stories={stories} />;
}
