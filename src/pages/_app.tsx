import { type AppType } from "next/app";
import MainLayout from "~/components/MainLayout";
import NextNProgress from "nextjs-progressbar";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress color="#0099FF" />
      <MainLayout>
        <Component className {...pageProps} />{" "}
      </MainLayout>
    </>
  );
};

export default MyApp;
