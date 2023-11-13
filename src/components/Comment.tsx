import { type CommentFull } from "~/utils/api";
import SanitizeHTML from "./SanitizeHtml";
import {
  CommentLink,
  CommentTime,
  CommentToggleFold,
  CommentMaybeFoldNext,
} from "./CommentClient";

export default function Comment({
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
  const child = isChild !== undefined && isChild;

  return (
    <div className={`${child ? "pl-10" : ""}`} id={`comment-${comment.id}`}>
      <div className="p-2">
        <div className="text-xs text-gray-500">
          <CommentTime by={comment.by} unixTime={comment.time} />
          <CommentLink id={parentId}>parent</CommentLink>
          <CommentLink id={prevId}>prev</CommentLink>
          <CommentLink id={nextId}>next</CommentLink>{" "}
          <CommentToggleFold
            id={comment.id}
            descendants={comment.descendants}
          />
        </div>
        <CommentMaybeFoldNext id={comment.id} />
        <div>
          <SanitizeHTML html={comment.text} />
        </div>
      </div>
      <CommentMaybeFoldNext id={comment.id} />
      <div>
        {" "}
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
    </div>
  );
}
