import Taro from "@tarojs/taro";

const webviewPath = "/pages/app/webview/index?url=";
const fail = (e: TaroGeneral.CallbackResult) => console.log(e);

export const Nav = {
  to: (url: string) => Taro.navigateTo({ url, fail }),
  tab: (url: string) => Taro.switchTab({ url, fail }),
  launch: (url: string) => Taro.reLaunch({ url, fail }),
  back: (delta = 1) => Taro.navigateBack({ delta, fail }),
  redirect: (url: string) => Taro.redirectTo({ url, fail }),
  webview: (url: string) =>
    Taro.navigateTo({
      url: webviewPath + encodeURIComponent(url),
      fail,
    }),
};
