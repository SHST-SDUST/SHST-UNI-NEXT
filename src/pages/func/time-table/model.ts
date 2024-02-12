import type { TimeTableItem, TimeTableType } from "@/components/time-table/types";
import { DateTime } from "@/utils/datetime";

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
  let week = new DateTime().getDay() - 1;
  if (week === -1) week = 6; // 周日
  data.forEach(value => {
    if (!value) return void 0;
    const day = ~~value.kcsj[0] - 1;
    if (today && day !== week) return void 0;
    const serialGroup = value.kcsj
      .slice(1)
      .replace(/(\d{4})/g, "$1,")
      .split(",");
    serialGroup.forEach(v => {
      if (!v) return void 0;
      const serial = Number(v.slice(1, 2)) >> 1;
      timeTable.push({
        serial,
        weekDay: day,
        className: value.kcmc.split("（")[0],
        classRoom: value.jsmc,
        teacher: value.jsxm,
      });
    });
  });
  return timeTable;
};
