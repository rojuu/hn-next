import { type GetServerSideProps } from "next";
import Stories from "~/components/Stories";
import { type Story, getStories } from "~/utils/api";

type Props = {
  stories: Story[];
};

export default function Home({ stories }: Props) {
  return <Stories stories={stories} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const stories = await getStories();
  return { props: { stories } };
};
