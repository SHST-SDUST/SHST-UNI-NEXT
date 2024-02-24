import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type LoginResponse = {
  status: number;
  msg: string;
};

export const loginApp = (account: string, password: string) => {
  return HTTP.request<LoginResponse>({
    url: App.data.url + "/auth/login/1",
    method: "POST",
    throttle: true,
    data: {
      account: account,
      password: encodeURIComponent(password),
      openid: App.data.openid,
    },
  }).then(res => res.data);
};
