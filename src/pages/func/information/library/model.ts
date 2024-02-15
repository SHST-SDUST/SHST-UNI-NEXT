import { TSON } from "laser-utils";

import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type BookType = {
  id: string;
  infoList: string[];
  isbn: string;
  img: string;
};

export type BookCover = {
  isbn: string;
  coverlink: string;
};

export const requestForBooks = (name: string, page: number) => {
  const param = "?q=" + name.replace(/\s/g, "") + "&page=" + page;
  return HTTP.request<{ info: string; page: number }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/lib/query" + param,
  }).then(res => res.data);
};

export const requestForCovers = (isbnGroup: string[]) => {
  return HTTP.request<{ info: string }>({
    load: 0,
    url: App.data.url + "/lib/cover",
    method: "POST",
    data: { isbn: isbnGroup.join(",") },
  }).then(res => {
    if (!res.data) return null;
    const covers = TSON.parse<{ result: BookCover[] }>(res.data.info);
    if (!covers) return null;
    return covers.result.reduce(
      (pre, cur) => ({ ...pre, [cur.isbn]: cur.coverlink }),
      {} as Record<string, string>
    );
  });
};
