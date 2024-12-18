import Taro from "@tarojs/taro";
import { isArray, TSON } from "laser-utils";

import { CACHE, PATH } from "./constant";
import { Event, EVENT_ENUM } from "./event";
import type { InitDataType } from "./global";
import { globalAppData } from "./global";
import { Loading } from "./loading";
import { Nav } from "./nav";
import { HTTP } from "./request";
import { LocalStorage } from "./storage";
import { Toast } from "./toast";

export const App = {
  data: globalAppData,
  init: () => {
    Loading.start({ load: 3, title: "初始化中..." });
    return Taro.login()
      .then(({ errMsg, code }) => {
        if (!code) return Promise.reject(errMsg);
        interface InitResponse {
          status: number;
          openid: string;
          initData: InitDataType;
        }
        return HTTP.request<InitResponse>({
          load: 0,
          url: App.data.url + "/auth/wxPlus",
          method: "POST",
          data: { code },
        });
      })
      .then(res => {
        /* 判断是否正常初始化 */
        const response = res.data;
        if (!response || !response.initData || !response.initData.curTerm) {
          return Promise.reject("HTTP INIT DATA FAIL");
        }

        /* 初始化全局信息 */
        App.data.curTerm = response.initData.curTerm;
        App.data.curTermStart = response.initData.termStart;
        App.data.curWeek = response.initData.curWeek;
        App.data.initData = response.initData;

        /* 自定义配色 */
        if (App.data.initData.custom) {
          const custom = App.data.initData.custom;
          const colorList = custom.color_list && TSON.parse<string[]>(custom.color_list);
          if (colorList && isArray(colorList) && colorList.length > 0) {
            App.data.colorList = colorList;
          }
        }

        /* 用户使用信息  `1`已注册用户  `2`未注册用户*/
        // if (response.status === 1) App.data.isSHSTLogin = true;
        App.data.isInitialized = true;
        // console.log("Status:", App.data.isSHSTLogin ? "User Login" : "New user");

        /* DOT */
        const notify = response.initData.tips;
        App.data.point = notify;
        const point = LocalStorage.get(CACHE.ANNOUNCE_INDEX);
        if (point !== notify) Taro.showTabBarRedDot({ index: 3 }).catch(() => void 0);

        /* Openid */
        console.log("SetOpenid:", response.openid);
        App.data.openid = response.openid;

        /* 处理弹出式公告 */
        const popup = response.initData.popup;
        const popupCache = LocalStorage.get<number>("popup");
        if (popupCache !== popup.serial && popup.popup) {
          Taro.showModal({
            title: "公告",
            confirmText: popup.path ? "立即查看" : "确认",
            cancelText: "下次查看",
            content: popup.popup,
            success: ({ confirm }) => {
              if (confirm) {
                LocalStorage.setPromise<number>("popup", popup.serial);
                if (popup.path) Nav.webview(popup.path);
              }
            },
          });
        }

        /* resolve */
        return Promise.resolve();
      })
      .catch((err: Error) => {
        console.log(err);
        Toast.modal(
          "警告",
          // @ts-expect-error errMsg
          "数据初始化失败，点击确定重新初始化数据 \r\n" + err.errMsg || err.message || ""
        ).then(() => {
          App.init();
        });
      })
      .then(() => {
        Loading.end({ load: 3 });
        const lastLoggedIn = LocalStorage.get<boolean>(CACHE.PLUS_LAST_LOGGED_IN);
        const userInfo = LocalStorage.get<{ account: string; password: string }>(CACHE.USER);
        // 自动登录 1. 上次登录成功 2.存在用户信息缓存
        if (lastLoggedIn && userInfo && userInfo.account) {
          Loading.start({ load: 3, title: "自动登录中..." });
          interface LoginResponse {
            status: number;
            msg: string;
          }
          const loginType = process.env.TARO_ENV === "weapp" ? 1 : 2;
          return HTTP.request<LoginResponse>({
            load: 0,
            url: App.data.url + "/plus/autoLogin/" + loginType,
            method: "POST",
            data: {
              account: userInfo.account,
              password: encodeURIComponent(userInfo.password),
            },
          }).then(res => {
            if (res.data.status !== 1) {
              Toast.info("自动登录失败: " + res.data.msg, 1000).then(() => {
                Nav.to(PATH.PLUS_LOGIN);
              });
              LocalStorage.setPromise(CACHE.PLUS_LAST_LOGGED_IN, false);
            }
            if (res.data.status === 1) {
              // PLUS 自动登录成功
              App.data.isPLUSLogin = true;
              LocalStorage.setPromise(CACHE.PLUS_LAST_LOGGED_IN, true);
              Event.emit(EVENT_ENUM.PLUS_LOGIN, null);
            }
          });
        }
        return Promise.resolve();
      })
      .then(() => {
        Loading.end({ load: 3 });
        Event.commit(EVENT_ENUM.ON_LOADED, null);
      });
  },
  onload: (func: () => void) => {
    return new Promise<void>(resolve => {
      if (App.data.isInitialized) {
        func();
        resolve();
      } else {
        const delay = () => {
          func();
          resolve();
        };
        Event.once(EVENT_ENUM.ON_LOADED, delay);
      }
    });
  },
  update: () => {
    if (!Taro.getUpdateManager) return;
    Taro.getUpdateManager().onCheckForUpdate(res => {
      console.log("Update:", res.hasUpdate);
      // 如果有新版本
      if (!res.hasUpdate) return void 0;
      // 新版本下载完成
      Taro.getUpdateManager().onUpdateReady(() => {
        Toast.confirm("更新提示", "新版本已经准备好，单击确定重启应用").then(result => {
          // `ApplyUpdate`应用新版本并重启
          if (result) Taro.getUpdateManager().applyUpdate();
        });
      });
      // 当新版本下载失败
      Taro.getUpdateManager().onUpdateFailed(() => {
        Toast.modal("提示", "检查到有新版本，但下载失败，请检查网络设置");
      });
    });
  },
};
