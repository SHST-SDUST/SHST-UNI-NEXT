import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

import type { RemoteTable } from "../timetable/model";

export type Response = {
  user: string;
  status: number;
  pair_user: [string, string];
  succ: {
    pair: string;
    timetable1: RemoteTable;
    timetable2: RemoteTable;
  };
  data: {
    id: string;
    account: string;
    name: string;
  }[];
};

export const requestForShareTable = (): Promise<Response | null> => {
  return HTTP.request<{ info: Response }>({
    load: 2,
    url: App.data.url + "/share/tableShare",
    data: {
      week: App.data.curWeek,
      term: App.data.curTerm,
    },
  }).then(res => {
    const table = res.data.info.succ;
    if (!table.timetable1 || !table.timetable2) {
      Toast.info("加载失败，请重试");
      return null;
    }
    return res.data.info;
  });
};

export const agreePeerRequest = (id: string) => {
  return HTTP.request<{ msg: string }>({
    load: 2,
    data: { id },
    throttle: true,
    method: "POST",
    url: App.data.url + "/share/agreereq",
  }).then(res => {
    Toast.info(res.data.msg);
    return res.data;
  });
};

export const liftingPeerRequest = (id: string) => {
  return HTTP.request<{ msg: string }>({
    load: 2,
    data: { id },
    throttle: true,
    method: "POST",
    url: App.data.url + "/share/lifting",
  }).then(res => {
    Toast.info("成功");
    return res.data;
  });
};

export const refusePeerRequest = (id: string) => {
  return HTTP.request<{ msg: string }>({
    load: 2,
    data: { id },
    throttle: true,
    method: "POST",
    url: App.data.url + "/share/refusereq",
  }).then(res => {
    Toast.info(res.data.msg);
    return res.data;
  });
};
