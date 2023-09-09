import Story from "./Story";
import { type Story as StoryT } from "~/server/api/routers/stories";

type Props = {
  stories: StoryT[];
};
export default function Stories({ stories }: Props) {
  return (
    <>
      <ul>
        {stories?.map((story) => (
          <li key={story.id}>
            <Story story={story} />
          </li>
        ))}
      </ul>
    </>
  );
}
