import CommentClient from "./CommentClient";
import { type CommentFull } from "~/utils/api";
import SanitizeHTML from "./SanitizeHtml";

function CommentChildren({ comment }: { comment: CommentFull }) {
  return (
    <>
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
    </>
  );
}

function CommentContents({ comment }: { comment: CommentFull }) {
  return <SanitizeHTML html={comment.text} />;
}

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
  return (
    <CommentClient
      comment={comment}
      commentContents={<CommentContents comment={comment} />}
      commentChildren={<CommentChildren comment={comment} />}
      nextId={nextId}
      prevId={prevId}
      parentId={parentId}
      isChild={isChild}
    />
  );
}
