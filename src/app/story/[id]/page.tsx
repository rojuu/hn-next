import { notFound } from "next/navigation";
import { Story, getStoryFull, getStoryPartial } from "~/utils/api";
import StoryInfo from "~/components/StoryInfo";
import Comment from "~/components/Comment";
import { Suspense } from "react";

async function StoryBody({ id }: { id: number }) {
  const story = await getStoryFull(id);
  if (!story) {
    notFound();
  }

  return (
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
  );
}

export default async function StoryView({
  params: { id },
}: {
  params: { id: number };
}) {
  const story = await getStoryPartial(id);
  if (!story) {
    notFound();
  }

  return (
    <div>
      <StoryInfo story={story} />
      <Suspense fallback={<div>Loading comments...</div>}>
        <StoryBody id={id} />
      </Suspense>
    </div>
  );
}
