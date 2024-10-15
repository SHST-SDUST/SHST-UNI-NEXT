import type { RemoteTable, TableCache, TableData } from "@/pages/plus/study/timetable/model";
import { App } from "@/utils/app";
import { CACHE } from "@/utils/constant";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

export type SwiperItemType = {
  img: string;
  url: string;
};

export const requestRemoteTimeTable = (load = 1, throttle = false): Promise<TableData | null> => {
  if (!App.data.isPLUSLogin) return Promise.resolve(null);
  console.log("GET TABLE FROM REMOTE");
  return HTTP.request<RemoteTable>({
    load: load,
    throttle: throttle,
    url: App.data.url + "/plus/table",
    data: {
      week: App.data.curWeek,
      term: App.data.curTerm,
    },
  }).then(res => {
    if (res.data.status === 1) {
      const data = res.data;
      const table = data.info.filter(Boolean);
      const key = CACHE.PLUS_TABLE;
      const cache: TableCache = { data: table, term: App.data.curTerm };
      LocalStorage.setPromise(key, cache);
      return { info: table, week: res.data.week };
    } else {
      return null;
    }
  });
};

export const requestTimeTable = (
  cache = true,
  load = 1,
  throttle = false
): Promise<TableData | null> => {
  const week = App.data.curWeek;
  const key = CACHE.PLUS_TABLE;
  if (!cache) return requestRemoteTimeTable(load, throttle);
  return LocalStorage.getPromise<TableCache>(key).then(data => {
    if (data && data.term === App.data.curTerm) {
      console.log("GET TABLE FROM CACHE");
      return { info: data.data, week: week };
    } else {
      return requestRemoteTimeTable(load, throttle);
    }
  });
};
