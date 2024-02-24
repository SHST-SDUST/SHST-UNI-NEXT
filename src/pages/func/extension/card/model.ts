import { App } from "@/utils/app";
import { RegExec } from "@/utils/regex";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

export type CardUserInfo = {
  name: string;
  account: string;
  balance: string;
  balanceTemp: string;
};

export const requestForCardUserInfo = (): Promise<CardUserInfo | null> => {
  return HTTP.request<{ info: string }>({
    load: 2,
    url: App.data.url + "/card/userInfo",
  }).then(res => {
    const info = res.data.info;
    if (!info) {
      Toast.info("加载失败 请稍后重试");
      return null;
    }
    const userInfo = info.match(/<div align="left">[\S]*<\/div>/g);
    const balanceInfo = info.match(/<td class="neiwen">[\S]*<\/td>/g);
    const balance = RegExec.get(balanceInfo, 0).split("（")[0];
    const balanceTemp = RegExec.get(balanceInfo, 0).split("）")[1].split("(")[0];
    return {
      name: RegExec.get(userInfo, 0),
      account: RegExec.get(userInfo, 3),
      balance: balance,
      balanceTemp: balanceTemp,
    };
  });
};

export type StreamData = {
  time: string;
  status: string;
  location: string;
  money: string;
  balance: string;
  serno: string;
  background: string;
};

const parse = (info: string): StreamData[] => {
  const lineData = info.match(/<tr class="listbg[2]?">[\s\S]*?<\/tr>/g);
  if (!lineData) {
    Toast.info("暂无数据");
    return [];
  } else {
    return lineData.map((item, index) => {
      const infoArr = item.match(/<td[\s\S]*?>[\s\S]*?<\/td>/g);
      const time = RegExec.get(infoArr, 0).replace(/<[\s\S]*?>/g, "");
      const status = RegExec.get(infoArr, 3).replace(/<[\s\S]*?>/g, "");
      const location = RegExec.get(infoArr, 4).replace(/<[\s\S]*?>/g, "");
      const money = RegExec.get(infoArr, 5).replace(/<[\s\S]*?>/g, "");
      const balance = RegExec.get(infoArr, 6).replace(/<[\s\S]*?>/g, "");
      const serno = RegExec.get(infoArr, 7).replace(/<[\s\S]*?>/g, "");
      const background = App.data.colorList[index % App.data.colorList.length];
      return {
        time: time,
        status: status,
        location: location,
        money: money,
        balance: balance,
        serno: serno,
        background: background,
      };
    });
  }
};

export const requestForTodayStream = (): Promise<StreamData[]> => {
  return HTTP.request<{ info: string }>({
    load: 2,
    url: App.data.url + "/card/today",
  }).then(res => {
    if (!res.data.info) {
      Toast.info("暂无数据");
      return [];
    }
    return parse(res.data.info);
  });
};

export const requestForHistoryStream = (): Promise<StreamData[]> => {
  return HTTP.request<{ info: string }>({
    load: 2,
    url: App.data.url + "/card/history",
  }).then(res => {
    if (!res.data.info) {
      Toast.info("暂无数据");
      return [];
    }
    return parse(res.data.info);
  });
};
