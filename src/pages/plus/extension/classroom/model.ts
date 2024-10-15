import type { CourseTableItem } from "@/components/course-table/types";
import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export const requestForCourses = (
  region: string,
  building: string
): Promise<Record<string, CourseTableItem[]>> => {
  return HTTP.request<{ info: Record<string, CourseTableItem[]> }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/plus/course",
    data: {
      term: App.data.curTerm,
      region: region,
      building: building,
      academy: "",
      type: "classroom",
    },
  }).then(res => {
    return res.data?.info || {};
  });
};
