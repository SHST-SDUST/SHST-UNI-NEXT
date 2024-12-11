import type { RemoteTableInfo } from "@/pages/plus/study/timetable/model";
import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

/** 1.默认状态 2.发起请求 3.拒绝 0.成功 */

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

export const refreshTimeTable = () => {
  return HTTP.request<{ msg: string }>({
    load: 0,
    url: App.data.url + "/share/refreshTimeTable",
    method: "POST",
  });
};

export const requestForShareTable = async (): Promise<Response | null> => {
  const res = await HTTP.request<{ info: Response }>({
    load: 2,
    url: App.data.url + "/share/tableShare",
    data: {
      week: App.data.curWeek,
      term: App.data.curTerm,
    },
  });
  if (!res.data.info) {
    Toast.info("加载失败，请重试");
    return null;
  }
  return res.data.info;
};

export const startPeerRequest = async (account: string) => {
  const res = await HTTP.request<{ msg: string }>({
    url: App.data.url + "/share/startReq",
    throttle: true,
    method: "POST",
    data: { account },
  });
  Toast.info(res.data.msg);
  return res.data;
};

export const cancelPeerRequest = async () => {
  const res = await HTTP.request<{ msg: string }>({
    throttle: true,
    method: "POST",
    url: App.data.url + "/share/cancelReq",
  });
  Toast.info(res.data.msg);
  return res.data;
};

export const agreePeerRequest = async (id: string) => {
  // 在同意请求前先刷新课表
  await refreshTimeTable();
  const res = await HTTP.request<{ msg: string }>({
    load: 2,
    data: { id },
    throttle: true,
    method: "POST",
    url: App.data.url + "/share/agreereq",
  });
  Toast.info(res.data.msg);
  return res.data;
};

export const liftingPeerRequest = async (id: string) => {
  const res = await HTTP.request<{ msg: string }>({
    load: 2,
    data: { id },
    throttle: true,
    method: "POST",
    url: App.data.url + "/share/lifting",
  });
  Toast.info(res.data.msg);
  return res.data;
};

export const refusePeerRequest = async (id: string) => {
  const res = await HTTP.request<{ msg: string }>({
    load: 2,
    data: { id },
    throttle: true,
    method: "POST",
    url: App.data.url + "/share/refusereq",
  });
  Toast.info(res.data.msg);
  return res.data;
};
