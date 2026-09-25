import type { RemoteTable, TableCache, TableData } from "@/pages/plus/study/timetable/model";
import { App } from "@/utils/app";
import { CACHE } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
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
      syncTimeTableCache();
      return { info: data.data, week: week };
    } else {
      keepTimeTableCache();
      return requestRemoteTimeTable(load, throttle);
    }
  });
};

/**
 * 保持时间表缓存, 过期时间为下一天
 */
export const keepTimeTableCache = async () => {
  const key = CACHE.TIMETABLE_CACHE_ASYNC;
  const now = new DateTime();
  const nextDay = now.nextDay();
  return LocalStorage.setPromise(key, true, nextDay);
};

/** 标记课表同步中 */
let isSyncing = false;

/**
 * 同步课表缓存
 */
export const syncTimeTableCache = async () => {
  if (!App.data.isPLUSLogin || isSyncing) return;
  const now = new DateTime();
  const hour = now.getHours();
  // 7 - 12 点之间不同步缓存数据
  if (6 < hour && hour < 12) return;
  const key = CACHE.TIMETABLE_CACHE_ASYNC;
  const cached = await LocalStorage.getPromise<boolean>(key);
  if (cached || isSyncing) return;
  isSyncing = true;
  await keepTimeTableCache();
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("START SYNC TIME-TABLE CACHE");
  // 同步缓存数据 函数内部会写缓存
  await requestRemoteTimeTable(-1, false);
  isSyncing = false;
};
