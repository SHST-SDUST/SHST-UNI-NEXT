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
    const rooms = data as ClassItem[];
    const exclude = [
      "实验室",
      "活动教室",
      "电教室",
      "乒乓球馆",
      "体育场",
      "计算机房",
      "专用教室",
      "物理实验室",
      "田径场",
      "足球场",
      "篮排馆",
      "网球场",
      "健身房",
      "制图室",
    ];
    return rooms.filter(item => exclude.indexOf(item.type) === -1);
  });
};
