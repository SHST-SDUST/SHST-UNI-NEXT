/* eslint-disable @typescript-eslint/no-unused-vars */
import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

export type ClassItem = {
  date: [boolean, boolean, boolean, boolean, boolean];
  room: string;
  type: string;
};
export type RemoteClassRoom = {
  info: ClassItem[] & {
    msg?: string;
  };
};

export const requestForClassRoom = (campus: string, date: string) => {
  return HTTP.request<RemoteClassRoom>({
    load: 0,
    throttle: true,
    url: App.data.url + "/plus/classroom2",
    data: {
      date: date,
      campus: campus,
    },
  }).then(res => {
    const data = res.data.info;
    if (!data || data.msg) {
      Toast.info(data.msg || "加载失败，请重试");
      return null;
    }
    return data as ClassItem[];
  });
};
