import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

export type RewardItem = {
  name: string;
  reward_time: string;
  amount: string;
};

export const requestForRewardList = (page: number) => {
  return HTTP.request<{ info: RewardItem[] }>({
    load: 2,
    url: App.data.url + `/ext/rewardlist/${page}`,
  }).then(res => {
    if (!res.data.info) {
      Toast.info("加载失败 请重试");
      return [];
    }
    return res.data.info;
  });
};
