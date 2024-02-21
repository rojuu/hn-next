import MainLayout from "~/components/MainLayout";
import { Metadata } from "next";

import "~/styles/globals.css";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "HN-Next",
  description: "Hacker News client with Next.js/React",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
};

export default RootLayout;
