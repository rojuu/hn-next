import { type CommentFull, type StoryFull } from "~/utils/api";
import StoryInfo from "./StoryInfo";
import { unixTimeToRelative } from "~/utils/time";

type Props = {
  story: StoryFull;
};

function Comment({
  comment,
  isChild,
}: {
  comment: CommentFull;
  isChild?: boolean;
}) {
  const child = isChild !== undefined && isChild;
  return (
    <div className={`${child ? "pl-10" : ""}`}>
      <div className="p-2">
        <div className="text-xs text-gray-500">
          {comment.by} {unixTimeToRelative(comment.time)}
        </div>
        <div className="">{comment.text}</div>
      </div>
      <div>
        {comment.kids.map((c) => {
          return <Comment key={c.id} comment={c} isChild={true} />;
        })}
      </div>
    </div>
  );
}

export default function Story({ story }: Props) {
  return (
    <div>
      <StoryInfo className="mb-6" story={story} />
      <div>
        {story.kids.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </div>
  );
}
