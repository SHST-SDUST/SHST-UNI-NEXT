import type { TimeTableItem, TimeTableType } from "@/components/time-table/types";
import { App } from "@/utils/app";
import { CACHE } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

type RemoteTableInfo = Array<null | {
  jsxm: string;
  jsmc: string;
  jssj: string;
  kssj: string;
  kkzc: string;
  kcsj: string;
  kcmc: string;
  sjbz: number;
}>;

export type RemoteTable = { data: RemoteTableInfo; status: number; week: number };
export type TableData = Omit<RemoteTable, "status">;
export type TableCache = { data: RemoteTableInfo; term: string };

export const parseTimeTable = (data: RemoteTableInfo, today = false): TimeTableType => {
  const timeTable: Array<TimeTableItem> = [];
  let todayWeekDay = new DateTime().getDay() - 1;
  if (todayWeekDay === -1) todayWeekDay = 6; // 周日
  const colorList = App.data.colorList;
  for (const value of data) {
    if (!value) continue;
    const day = Number(value.kcsj[0]) - 1;
    if (today && day !== todayWeekDay) continue;
    const serialGroup = value.kcsj
      .slice(1)
      .replace(/(\d{4})/g, "$1,")
      .split(",");
    serialGroup.forEach(v => {
      if (!v) return void 0;
      const serial = Number(v.slice(1, 2)) >> 1;
      const className = value.kcmc.split("（")[0];
      const uniqueNum = className.split("").reduce((pre, cur) => pre + cur.charCodeAt(0), 0);
      const background = colorList[uniqueNum % colorList.length];
      timeTable.push({
        serial,
        weekDay: day,
        className,
        background,
        classRoom: value.jsmc,
        teacher: value.jsxm,
      });
    });
  }
  return timeTable;
};

export const requestRemoteTimeTable = (
  week: number,
  throttle = false
): Promise<TableData | null> => {
  if (!App.data.isSHSTLogin) return Promise.resolve(null);
  console.log("GET TABLE FROM REMOTE WEEK", week);
  let urlTemp = "";
  if (typeof week === "number") urlTemp += "/" + week;
  return HTTP.request<RemoteTable>({
    load: 2,
    throttle: throttle,
    url: App.data.url + "/sw/table" + urlTemp,
    data: {
      week: App.data.curWeek,
      term: App.data.curTerm,
    },
  }).then(res => {
    if (res.data.status === 1) {
      const data = res.data;
      const table = data.data.filter(Boolean);
      const key = CACHE.TIMETABLE_WEEK + res.data.week;
      const cache: TableCache = { data: table, term: App.data.curTerm };
      LocalStorage.setPromise(key, cache);
      return { data: table, week: res.data.week };
    } else {
      return null;
    }
  });
};

export const requestTimeTable = (
  week: number,
  cache = true,
  throttle = false
): Promise<TableData | null> => {
  const key = CACHE.TIMETABLE_WEEK + week;
  if (!cache) return requestRemoteTimeTable(week, throttle);
  return LocalStorage.getPromise<TableCache>(key).then(data => {
    if (data && data.term === App.data.curTerm) {
      console.log("GET TABLE FROM CACHE WEEK", week);
      return { data: data.data, week: week };
    } else {
      return requestRemoteTimeTable(week, throttle);
    }
  });
};
