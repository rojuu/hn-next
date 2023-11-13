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
  descendants: number;
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
  if (!response.ok) return null;
  const json: unknown = await response.json();
  if (!json) return null;
  const ids = (json as number[]).slice(0, 50);
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

const fillCommentFullDescendants = (comments: CommentFull[]): number => {
  let descendants = 0;
  for (const comment of comments) {
    comment.descendants +=
      fillCommentFullDescendants(comment.kids) + comment.kids.length;
    descendants += comment.descendants;
  }
  return descendants;
};

const getFullCommentFromItem = async (item: Item) => {
  if (
    item.type === "comment" &&
    item.dead !== false &&
    item.deleted !== false
  ) {
    const comment = item as unknown as Comment;
    if (
      comment.text !== undefined &&
      comment.by !== undefined &&
      comment.text.length > 0 &&
      comment.by.length > 0
    ) {
      const commentFull: CommentFull = {
        ...comment,
        descendants: 0,
        kids: [],
      };
      if (comment.kids) {
        await fillCommentKids(commentFull, comment.kids);
      }
      return commentFull;
    }
  }
  return null;
};

const fillCommentKids = async (
  parentComment: CommentFull,
  kidIds: number[],
) => {
  const kids = await Promise.all(
    kidIds.map(async (kidId) => {
      const response = await fetch(`${env.HN_API_URL}/item/${kidId}.json`);
      if (!response.ok) return null;
      const json: unknown = await response.json();
      if (!json) return null;
      const kid = json as Item;
      return getFullCommentFromItem(kid);
    }),
  );
  const finalKids = kids.filter((k) => k !== null) as CommentFull[];
  parentComment.kids = [...parentComment.kids, ...finalKids];
};

export const getStoryPartial = async (id: number) => {
  const response = await fetch(`${env.HN_API_URL}/item/${id}.json`);
  if (!response.ok) return null;
  const json: unknown = await response.json();
  if (!json) return null;
  const item = json as Item;
  const type = item.type;
  if (
    !(
      item.dead !== true &&
      item.deleted !== true &&
      typeof type === "string" &&
      type === "story"
    )
  ) {
    return null;
  }

  const story = item as unknown as Story;
  return story;
};

export const getStoryFull = async (id: number) => {
  const story = await getStoryPartial(id);
  if (!story) {
    return null;
  }

  const storyFull: StoryFull = {
    ...story,
    kids: [],
  };

  if (story.kids) {
    const comments = await Promise.all(
      story.kids.map(async (kidId) => {
        const response = await fetch(`${env.HN_API_URL}/item/${kidId}.json`);
        if (!response.ok) return null;
        const json: unknown = await response.json();
        if (!json) return null;
        const kid = json as Item;
        return getFullCommentFromItem(kid);
      }),
    );
    const finalComments = comments.filter((c) => c !== null) as CommentFull[];
    storyFull.kids = [...storyFull.kids, ...finalComments];
    fillCommentFullDescendants(storyFull.kids);
  }
  return storyFull;
};
