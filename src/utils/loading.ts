import Taro from "@tarojs/taro";

import { globalAppData } from "./global";

type Options = { load: number; title?: string };

export const Loading = {
  /**
   * 1 - Nav Loading
   * 2 - Nav Loading + Title
   * 3 - Mask Loading
   */
  start: (options: Options) => {
    switch (options.load) {
      case 1:
        Taro.showNavigationBarLoading();
        break;
      case 2:
        Taro.showNavigationBarLoading();
        Taro.setNavigationBarTitle({
          title: options.title || "加载中...",
        });
        break;
      case 3:
        Taro.showLoading({
          title: options.title || "请求中",
          mask: true,
        });
        break;
    }
  },
  /**
   * 1 - Nav Loading
   * 2 - Nav Loading + Title
   * 3 - Mask Loading
   */
  end: (options: Options) => {
    switch (options.load) {
      case 1:
        Taro.hideNavigationBarLoading();
        break;
      case 2:
        Taro.hideNavigationBarLoading();
        Taro.setNavigationBarTitle({
          title: options.title || globalAppData.project,
        });
        break;
      case 3:
        Taro.hideLoading();
        break;
    }
  },
};
