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
      <header className="bg-orange-500 p-1 font-semibold">
        <Link href="/" className="">
          HN Hext
        </Link>
      </header>
      <main>
        <Stories stories={stories} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const stories = await getStories();
  return { props: { stories } };
};
