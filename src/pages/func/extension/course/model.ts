import { App } from "@/utils/app";
import { DateTime } from "@/utils/datetime";
import { HTTP } from "@/utils/request";

import { START_CLASS, WEEK } from "./constant";

export type Course = {
  class_name: string;
  teacher: string;
  classWeek: number;
  week: string;
  start: string;
  classroom: string;
  date_start: string;
  day_of_week: number;
  turn_index: number;
};

export const requestForCourse = (page: number, className?: string, teacher?: string) => {
  const data: Record<string, string> = {};
  className && (data.classname = className);
  teacher && (data.teacher = teacher);
  return HTTP.request<{ info: Course[] }>({
    load: 2,
    throttle: true,
    url: App.data.url + `/sw/loadclasses/${page}`,
    data: data,
  }).then(res =>
    (res.data.info || []).map(item => {
      return {
        ...item,
        week: WEEK[item.day_of_week],
        start: START_CLASS[item.turn_index],
        classWeek:
          Math.floor(
            new DateTime(App.data.curTermStart).diff(new DateTime(item.date_start)).days / 7
          ) + 1,
      } as Course;
    })
  );
};
