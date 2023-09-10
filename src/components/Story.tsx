import { type Story } from "~/utils/api";

type Props = {
  story: Story;
};
export default function Story({ story }: Props) {
  return <>{story.id}</>;
}
