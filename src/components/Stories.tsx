import { type Story } from "~/utils/api";
import StoryInfo from "./StoryInfo";

type Props = {
  stories: Story[];
};

export default function Stories({ stories }: Props) {
  return (
    <ul>
      {stories?.map((story, index) => {
        if (story.url === undefined) return <li key={story.id}></li>;
        else
          return (
            <li key={story.id}>
              <StoryInfo order={index + 1} story={story} />
            </li>
          );
      })}
    </ul>
  );
}
