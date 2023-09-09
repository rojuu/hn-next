import Head from "next/head";
import Stories from "~/components/Stories";
import { api } from "~/utils/api";

export default function Home() {
  const {
    isLoading,
    isError,
    data: stories,
    error,
  } = api.stories.top.useQuery();

  return (
    <>
      <Head>
        <title>HN Next</title>
        <meta name="description" content="Hacker News client with Next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isLoading ? <div>Loading...</div> : <></>}
        {isError ? <div className="text-red-500">{error.message}</div> : <></>}
        {stories ? <Stories stories={stories} /> : <></>}
      </main>
    </>
  );
}
