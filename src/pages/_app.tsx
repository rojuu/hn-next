import { type AppType } from "next/app";
import MainLayout from "~/components/MainLayout";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MainLayout>
      <Component className {...pageProps} />{" "}
    </MainLayout>
  );
};

export default MyApp;
