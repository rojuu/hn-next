import { type GetServerSideProps } from "next";
import Story from "~/components/Story";
import { getStoryFull, type StoryFull } from "~/utils/api";

type Props = {
  story: StoryFull;
};

export default function StoryView({ story }: Props) {
  return <Story story={story} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { id } = context.query;
  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const story = await getStoryFull(Number(id));
  if (story === null) {
    return {
      notFound: true,
    };
  }

  return { props: { story } };
};
