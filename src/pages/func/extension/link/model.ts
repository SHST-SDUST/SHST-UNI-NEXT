import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

export type HyperLinkType = {
  name: string;
  url: string;
};

export const requestForHyperLink = () => {
  return HTTP.request<{ url: HyperLinkType[] }>({
    load: 2,
    url: App.data.url + "/ext/urlshare",
  }).then(res => {
    if (!res.data) {
      Toast.info("加载失败 请稍后重试");
      return null;
    }
    return res.data.url;
  });
};
