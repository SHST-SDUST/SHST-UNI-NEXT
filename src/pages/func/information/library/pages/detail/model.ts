import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type BookDetail = {
  name: string;
  info: string[];
  storage: string[];
};

export const requestForBookDetail = (id: string) => {
  return HTTP.request<{ info: string }>({
    load: 2,
    url: App.data.url + "/lib/detail",
    throttle: true,
    data: { id },
  }).then(res => {
    if (!res.data) return null;
    return res.data.info;
  });
};
