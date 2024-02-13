import { TSON } from "laser-utils";

import { App } from "@/utils/app";
import { Limit } from "@/utils/limit";
import { HTTP } from "@/utils/request";

import { MAPPER } from "./constant";

export type TableItem = {
  weekStart: number;
  weekEnd: number;
  term: string;
  className: string;
  classroom: string;
  teacherName: string;
  timeStart: number;
  timeEnd: number;
  day: number;
};

export const requestForTable = (): Promise<TableItem[] | null> => {
  return HTTP.request<{ info: string }>({
    load: 2,
    url: App.data.url + "/sw/getCustomTable",
  }).then(res => {
    const data = TSON.parse<TableItem[]>(res.data.info);
    if (!data) return null;
    return data.map(v => {
      const tmp = {};
      for (const key in MAPPER) tmp[key] = v[MAPPER[key]];
      return tmp as TableItem;
    });
  });
};

export const requestForSaveTable = (data: string) => {
  return new Promise<void>(resolve => {
    Limit.throttleGlobal(1000, async () => {
      await HTTP.request({
        load: 2,
        method: "POST",
        url: App.data.url + "/sw/setCustomTable",
        data: {
          data: JSON.stringify(data),
        },
      });
      resolve();
    });
  });
};
