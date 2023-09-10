import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type Story } from "~/utils/api";

type Props = {
  stories: Story[];
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

dayjs.extend(relativeTime);

export default function Stories({ stories }: Props) {
  return (
    <ul>
      {stories?.map((story, index) => {
        if (story.url === undefined) return <li key={story.id}></li>;
        else
          return (
            <li key={story.id}>
              <div className="flex flex-row">
                <div className="text-gray-500">{index + 1}.</div>{" "}
                <div className="flex flex-col">
                  <div className="p-0 pl-2">
                    <Link href={`${story.url}`}>{story.title}</Link>{" "}
                    <span className="text-xs text-gray-500">
                      ({getRootUrl(story)})
                    </span>
                  </div>
                  <div className="p-0 pl-2 text-xs text-gray-500">
                    {story.score} points by {story.by}{" "}
                    <Link
                      className="hover:underline"
                      href={`/story/${story.id}`}
                    >
                      {dayjs.unix(story.time).fromNow()}
                    </Link>{" "}
                    |{" "}
                    <Link
                      className="hover:underline"
                      href={`/story/${story.id}`}
                    >
                      {story.descendants} comments
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
      })}
    </ul>
  );
}
