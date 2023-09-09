import { type GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Stories from "~/components/Stories";
import { type Story, getStories } from "~/utils/api";

type Props = {
  stories: Story[];
};

export default function Home({ stories }: Props) {
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
        <main className="bg-[#F6F6EF]">
          <Stories stories={stories} />
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const stories = await getStories();
  return { props: { stories } };
};
