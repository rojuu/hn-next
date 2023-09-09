import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  const topStories = api.stories.top.useQuery();

  return (
    <>
      <Head>
        <title>HN Next</title>
        <meta name="description" content="Hacker News client with Next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <ul>{topStories.data?.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </main>
    </>
  );
}
