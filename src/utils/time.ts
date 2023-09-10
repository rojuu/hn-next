import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const unixTimeToRelative = (unixTime: number) => {
  return dayjs.unix(unixTime).fromNow();
};
