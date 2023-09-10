import { env } from "~/env.mjs";

type Item = Record<string, string | number | number[] | boolean>;

export interface ItemBase {
  id: number;
  by: string;
  time: number;
  type: string;
}

export interface StoryBase extends ItemBase {
  title: string;
  score: number;
  descendants: number;
  url: string;
}

export interface CommentBase extends ItemBase {
  text: string;
  time: number;
  parent: number;
}

export interface Comment extends CommentBase {
  kids: number[];
}
export interface CommentFull extends CommentBase {
  kids: CommentFull[];
}
export interface Story extends StoryBase {
  kids: number[];
}
export interface StoryFull extends StoryBase {
  kids: CommentFull[];
}

export const getStories = async () => {
  const response = await fetch(`${env.HN_API_URL}/topstories.json`);
  const ids = (await response.json()) as number[];
  const items = await Promise.all(
    ids.map(async (id) => {
      const response = await fetch(`${env.HN_API_URL}/item/${id}.json`);
      const item = (await response.json()) as Item;
      return item;
    }),
  );
  const stories = items
    .filter((item) => {
      const type = item.type;
      return item.dead !== true && typeof type === "string" && type === "story";
    })
    .map((item) => item as unknown as Story);
  return stories.slice(0, 50);
};

const fillCommentKids = async (
  parentComment: CommentFull,
  kidIds: number[],
  depth = 0,
) => {
  const kids = await Promise.all(
    kidIds.map(async (kidId) => {
      const response = await fetch(`${env.HN_API_URL}/item/${kidId}.json`);
      const kid = (await response.json()) as Item;
      if (kid.type === "comment") {
        const comment = kid as unknown as Comment;
        const commentFull: CommentFull = {
          ...comment,
          kids: [],
        };
        if (comment.kids) {
          await fillCommentKids(commentFull, comment.kids, depth + 1);
        }
        return commentFull;
      }
      return null;
    }),
  );
  const finalKids = kids.filter((k) => k !== null) as CommentFull[];
  parentComment.kids = [...parentComment.kids, ...finalKids];
};

export const getStoryFull = async (id: number) => {
  const response = await fetch(`${env.HN_API_URL}/item/${id}.json`);
  const item = (await response.json()) as Item;
  const type = item.type;
  if (!(item.dead !== true && typeof type === "string" && type === "story"))
    return null;

  const story = item as unknown as Story;
  const storyFull: StoryFull = {
    ...story,
    kids: [],
  };

  if (story.kids) {
    const comments = await Promise.all(
      story.kids.map(async (kidId) => {
        const response = await fetch(`${env.HN_API_URL}/item/${kidId}.json`);
        const kid = (await response.json()) as Item;
        if (kid.type === "comment") {
          const comment = kid as unknown as Comment;
          const commentFull: CommentFull = {
            ...comment,
            kids: [],
          };
          if (comment.kids) {
            await fillCommentKids(commentFull, comment.kids);
          }
          return commentFull;
        }
        return null;
      }),
    );
    const finalComments = comments.filter((c) => c !== null) as CommentFull[];
    storyFull.kids = [...storyFull.kids, ...finalComments];
  }
  return storyFull;
};
