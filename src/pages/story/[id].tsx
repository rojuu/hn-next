import { type GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Story from "~/components/Story";
import { getStory, type Story as StoryT } from "~/utils/api";

type Props = {
  story: StoryT;
};

export default function StoryView({ story }: Props) {
  return (
    <>
      <Head>
        <title>HN Next</title>
        <meta name="description" content="Hacker News client with Next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ml-auto mr-auto max-w-7xl justify-center p-2">
        <header className="bg-[#FF6600] pl-2  font-bold">
          <Link href="/" className="">
            HN Next
          </Link>
        </header>
        <main className="bg-[#F6F6EF] pb-2 pl-2 pr-2 pt-1">
          <Story story={story} />
        </main>
      </div>
    </>
  );
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

  const story = await getStory(Number(id));
  if (story === null) {
    return {
      notFound: true,
    };
  }

  return { props: { story } };
};
