import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

export type TermData = {
  term: string;
  weekcount: number;
  startdata: string;
  vacationstart: number;
};

export type CalendarData = {
  day: number | string;
  today?: boolean;
  start?: boolean;
  vacation?: boolean;
  // `-1`周次 `0`非本学期 `1`教学 `2`周末 `3`假期
  type: -1 | 0 | 1 | 2 | 3;
};

export const requestForTermData = () => {
  return HTTP.request<{ info: TermData[] }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/ext/calendar",
  }).then(res => {
    if (!res.data.info || !res.data.info[0]) {
      Toast.info("加载失败，请重试");
      return null;
    }
    return res.data.info.reverse();
  });
};
