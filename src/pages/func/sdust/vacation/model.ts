import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

export type Vacation = {
  name: string;
  v_time: string;
  info: string;
};

export const requestForVacation = () => {
  return HTTP.request<{ info: Vacation[] }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/ext/vacation",
  }).then(res => {
    if (!res || !res.data) {
      Toast.info("数据获取失败,请重试");
      return null;
    }
    return res.data.info;
  });
};
