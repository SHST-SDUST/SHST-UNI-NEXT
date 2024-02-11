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

export type TimeTableItem = {
  week: number; // 周几的课
  serial: number; // 第几节 `5`节制
  className: string; // 课程名
  classRoom: string; // 教室名
  teacher: string; // 教师名
  ext?: string; // 扩展信息
  background?: string; // 背景颜色 无则自动计算
  isCurWeek?: boolean; // 若为该周的课 则优先显示
};

export type TimeTable = Array<TimeTableItem>;

export function parseTable(info: RemoteTableInfo, oneDay = false): TimeTable {
  const timeTable: Array<TimeTableItem> = [];
  let week = new DateTime().getDay() - 1;
  if (week === -1) week = 6; // 周日
  info.forEach(value => {
    if (!value) return void 0;
    const day = ~~value.kcsj[0] - 1;
    if (oneDay && day !== week) return void 0;
    const serialGroup = value.kcsj
      .slice(1)
      .replace(/(\d{4})/g, "$1,")
      .split(",");
    serialGroup.forEach(v => {
      if (!v) return void 0;
      const serial = Number(v.slice(1, 2)) >> 1;
      timeTable.push({
        serial,
        week: day,
        className: value.kcmc.split("（")[0],
        classRoom: value.jsmc,
        teacher: value.jsxm,
      });
    });
  });
  return timeTable;
}
