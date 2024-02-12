import type { RemoteTable, TableCache, TableData } from "@/pages/func/time-table/model";
import { App } from "@/utils/app";
import { CACHE } from "@/utils/constant";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

export type SwiperItemType = {
  img: string;
  url: string;
};

export const requestRemoteTimeTable = (load = 1, throttle = false): Promise<TableData | null> => {
  if (!App.data.isSHSTLogin) return Promise.resolve(null);
  console.log("GET TABLE FROM REMOTE");
  return HTTP.request<RemoteTable>({
    load: load,
    throttle: throttle,
    url: App.data.url + "/sw/table",
    data: {
      week: App.data.curWeek,
      term: App.data.curTerm,
    },
  }).then(res => {
    if (res.data.status === 1) {
      const data = res.data;
      const table = data.data.filter(Boolean);
      const key = CACHE.TABLE_WEEK + res.data.week;
      const cache: TableCache = { data: table, term: App.data.curTerm };
      LocalStorage.setPromise(key, cache);
      return { data: table, week: res.data.week };
    } else {
      return null;
    }
  });
};

export const requestTimeTable = (): Promise<TableData | null> => {
  const week = App.data.curWeek;
  const key = CACHE.TABLE_WEEK + week;
  return LocalStorage.getPromise<TableCache>(key).then(cache => {
    if (cache && cache.term === App.data.curTerm) {
      console.log("GET TABLE FROM CACHE");
      return { data: cache.data, week: week };
    } else {
      return requestRemoteTimeTable();
    }
  });
};
