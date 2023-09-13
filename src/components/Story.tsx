import { type CommentFull, type StoryFull } from "~/utils/api";
import StoryInfo from "./StoryInfo";
import { unixTimeToRelative } from "~/utils/time";
import SanitizeHTML from "./SanitizeHtml";
import Link from "next/link";
import { useState } from "react";

type Props = {
  story: StoryFull;
};

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
};

function CommentLink({
  id,
  children,
}: {
  id?: number;
  children: React.ReactNode;
}) {
  return (
    id != undefined && (
      <>
        {" | "}
        <Link
          className="hover:underline"
          href={`#comment-${id}`}
          onClick={(ev) => {
            ev.preventDefault();
            scrollToId(`comment-${id}`);
          }}
        >
          {children}
        </Link>
      </>
    )
  );
}

function Comment({
  comment,
  nextId,
  prevId,
  parentId,
  isChild,
}: {
  comment: CommentFull;
  nextId?: number;
  prevId?: number;
  parentId?: number;
  isChild?: boolean;
}) {
  const [isFolded, setIsFolded] = useState(false);
  const child = isChild !== undefined && isChild;

  return (
    <div className={`${child ? "pl-10" : ""}`} id={`comment-${comment.id}`}>
      <div className="p-2">
        <div className="text-xs text-gray-500">
          <span suppressHydrationWarning>
          {comment.by} {unixTimeToRelative(comment.time)}
          </span>
          <CommentLink id={parentId}>parent</CommentLink>
          <CommentLink id={prevId}>prev</CommentLink>
          <CommentLink id={nextId}>next</CommentLink>{" "}
          <span
            className="hover:underline"
            onClick={() => {
              setIsFolded((p) => !p);
            }}
          >
            [ – ]
          </span>
        </div>
        {!isFolded && (
          <div>
            <SanitizeHTML html={comment.text} />
          </div>
        )}
      </div>
      {!isFolded && (
        <div>
          {comment.kids.map((c, index) => {
            const prevId = comment.kids[index - 1]?.id;
            const nextId = comment.kids[index + 1]?.id;
            return (
              <Comment
                key={c.id}
                comment={c}
                isChild={true}
                prevId={prevId}
                nextId={nextId}
                parentId={comment.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Story({ story }: Props) {
  return (
    <div>
      <StoryInfo story={story} />
      <div className="mt-6">
        {story.kids.map((comment, index) => {
          const prevId = story.kids[index - 1]?.id;
          const nextId = story.kids[index + 1]?.id;
          return (
            <Comment
              key={comment.id}
              comment={comment}
              prevId={prevId}
              nextId={nextId}
            />
          );
        })}
      </div>
    </div>
  );
}
