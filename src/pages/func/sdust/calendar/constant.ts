import { DateTime } from "@/utils/datetime";

export const WEEK_HEADER = ["周", "一", "二", "三", "四", "五", "六", "日"];
export const NOW = new DateTime();
export const TODAY = NOW.format();

export const CALENDAR_TYPE = {
  "-1": "周次",
  "0": "--",
  "1": "教学",
  "2": "周末",
  "3": "假期",
};
