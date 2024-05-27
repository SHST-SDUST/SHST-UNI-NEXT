import { DateTime } from "./datetime";

export { PATH } from "../config/page";

export const CACHE = {
  WEATHER: "WEATHER",
  SENTENCE: "SENTENCE",
  SENTENCE_LONG: "SENTENCE_LONG",
  USER: "USER",
  TIMETABLE_WEEK: "TIMETABLE:",
  ANNOUNCE_INDEX: "ANNOUNCE_INDEX",
  USER_INFO: "USER_INFO",
  PLUS_TABLE: "PLUS_TABLE",
};

export const DEV_HOST = "http://dev.shst.touchczy.top";
export const PROD_HOST = "https://shst.touchczy.top";
export const REMOTE_STATIC = DEV_HOST + "/public/static/";

export const NOW = new DateTime();
export const TODAY = NOW.format();
export const BUILD_TIME = new DateTime(process.env.NOW);
export const EXPLORATION = BUILD_TIME.nextDay(3).format("yyyy-MM-dd");
