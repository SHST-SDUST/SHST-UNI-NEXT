import type { TimeTableType } from "@/components/time-table/types";
import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type Classroom = {
  day_of_week: number;
  turn_index: number;
  class_name: string;
  teacher: string;
  date_start: string;
};

export const requestForClasses = (
  classroom: string,
  week: number
): Promise<TimeTableType | null> => {
  const data = { classroom, term_week: week };
  return HTTP.request<{ data: Classroom[] }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/sw/loadclassromm",
    data: data,
  }).then(res => {
    if (res.data.data) {
      return res.data.data.map(item => ({
        weekDay: item.day_of_week,
        serial: item.turn_index,
        className: item.class_name,
        teacher: item.teacher,
        classRoom: "",
        ext: item.date_start.replace(/\d{4}-/, ""),
      }));
    }
    return null;
  });
};
