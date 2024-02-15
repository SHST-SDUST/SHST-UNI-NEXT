import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

import type { RemoteTableInfo } from "../timetable/model";

export type Response = {
  user: string;
  status: number;
  pair_user: [string, string];
  succ: {
    id: string;
    pair: string;
    timetable1: RemoteTableInfo;
    timetable2: RemoteTableInfo;
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
    if (!res.data.info) {
      Toast.info("加载失败，请重试");
      return null;
    }
    return res.data.info;
  });
};

export const startPeerRequest = (account: string, name: string) => {
  return HTTP.request<{ msg: string }>({
    url: App.data.url + "/share/startReq",
    throttle: true,
    method: "POST",
    data: { account, user: name },
  }).then(res => {
    Toast.info(res.data.msg);
    return res.data;
  });
};

export const cancelPeerRequest = () => {
  return HTTP.request<{ msg: string }>({
    throttle: true,
    method: "POST",
    url: App.data.url + "/share/cancelReq",
  }).then(res => {
    Toast.info(res.data.msg);
    return res.data;
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
    Toast.info(res.data.msg);
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
