import { type Story } from "~/server/api/routers/stories";

type Props = {
  story: Story;
};
export default function Story({ story }: Props) {
  return (
    <>
      {story.id}: {story.title}
    </>
  );
}
