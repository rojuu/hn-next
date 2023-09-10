import Link from "next/link";
import { type Story as StoryPartial, type StoryFull } from "~/utils/api";
import { unixTimeToRelative } from "~/utils/time";

type Story = StoryPartial | StoryFull;

type Props = {
  story: Story;
  order?: number;
  className?: string;
};

const getRootUrl = (story: Story): string => {
  const url = new URL(story.url);
  let result = url.hostname;
  if (result.startsWith("www.")) {
    result = result.substring(4);
  }
  if (result.includes("git")) {
    result += "/" + url.pathname.split("/")[1];
  }
  if (result.endsWith("/")) {
    result = result.substring(0, result.length - 1);
  }
  return result;
};

export default function StoryInfo({ story, order, className }: Props) {
  return (
    <div className={"flex flex-row" + className !== undefined ? className : ""}>
      {order !== undefined ? (
        <div className="text-gray-500">{order}.</div>
      ) : (
        <div />
      )}{" "}
      <div className="flex flex-col">
        <div className="p-0 pl-2">
          <Link href={`${story.url}`}>{story.title}</Link>{" "}
          <span className="text-xs text-gray-500">({getRootUrl(story)})</span>
        </div>
        <div className="p-0 pl-2 text-xs text-gray-500">
          {story.score} points by {story.by}{" "}
          <Link className="hover:underline" href={`/story/${story.id}`}>
            {unixTimeToRelative(story.time)}
          </Link>{" "}
          |{" "}
          <Link className="hover:underline" href={`/story/${story.id}`}>
            {story.descendants} comments
          </Link>
        </div>
      </div>
    </div>
  );
}
