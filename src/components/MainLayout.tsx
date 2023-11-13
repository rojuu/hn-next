import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ml-auto mr-auto justify-center xl:max-w-7xl xl:p-2">
      <header className="bg-[#FF6600] pl-2  font-bold">
        <Link href="/" className="">
          HN Next
        </Link>
      </header>
      <main className="bg-[#F6F6EF] pb-2 pl-2 pr-2 pt-1">{children}</main>
    </div>
  );
}
