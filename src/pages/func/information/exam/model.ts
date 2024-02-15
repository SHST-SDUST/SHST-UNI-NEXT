import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type ExamItem = {
  kcmc: string;
  startTime: string;
  endTime: string;
  endTimeSplit: string;
  jsmc: string;
  vksjc: string;
  ksqssj: string;
};

export const requestForExam = () => {
  return HTTP.request<{ data: (ExamItem | null)[] }>({
    load: 2,
    url: App.data.url + "/sw/exam",
  }).then(res => {
    if (!res.data) return [];
    if (!res.data.data[0]) res.data.data = [];
    res.data.data.forEach(value => {
      if (!value) return;
      [value.startTime, value.endTime] = value.ksqssj.split("~");
      value.endTimeSplit = value.endTime.split(" ")[1];
    });
    return res.data.data;
  });
};
