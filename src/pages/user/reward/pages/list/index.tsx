import { View } from "@tarojs/components";
import React, { useRef, useState } from "react";

import { Banner } from "@/components/banner";
import { Gap } from "@/components/gap";
import { Layout } from "@/components/layout";
import { Loading } from "@/components/loading";
import { LOADING_STATE } from "@/components/loading/constant";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";

import styles from "./index.module.scss";
import { requestForRewardList, type RewardItem } from "./model";

export default function Index() {
  const page = useRef(1);
  const [data, setData] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState<string>(LOADING_STATE.LOADING_MORE);

  const loadRewardList = () => {
    requestForRewardList(page.current).then(res => {
      setData([...data, ...res]);
      setLoading(res.length < 10 ? LOADING_STATE.NO_MORE : LOADING_STATE.LOADING_MORE);
    });
  };

  useOnLoadEffect(() => {
    loadRewardList();
  });

  return (
    <React.Fragment>
      <Banner title="赞赏列表"></Banner>
      <Gap size={10}></Gap>
      {data.map((item, index) => (
        <Layout key={index}>
          <View className={styles.info}>
            <View>
              <View className={styles.name}>{item.name}</View>
              <View className={styles.time}>{item.reward_time}</View>
            </View>
            <View className={styles.amount}>{item.amount}</View>
          </View>
        </Layout>
      ))}
      <Loading block state={loading} onNext={() => ++page.current && loadRewardList()}></Loading>
      <Gap size={5}></Gap>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
