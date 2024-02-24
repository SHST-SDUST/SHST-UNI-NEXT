import { Label, RichText, View } from "@tarojs/components";
import React, { useState } from "react";

import { Divider } from "@/components/divider";
import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";

import {
  requestForCardUserInfo,
  requestForHistoryStream,
  requestForTodayStream,
  type StreamData,
} from "./model";

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("加载中");
  const [account, setAccount] = useState("加载中");
  const [balance, setBalance] = useState("0.00");
  const [balanceTemp, setBalanceTemp] = useState("0.00");
  const [list, setList] = useState<StreamData[]>([]);

  useOnLoadEffect(() => {
    requestForCardUserInfo().then(res => {
      if (res) {
        setName(res.name);
        setAccount(res.account);
        setBalance(res.balance);
        setBalanceTemp(res.balanceTemp);
        setLoaded(true);
      }
    });
  });

  const queryTodayStream = () => {
    requestForTodayStream().then(res => {
      res && setList(res);
    });
  };

  const queryHistoryStream = () => {
    requestForHistoryStream().then(res => {
      res && setList(res);
    });
  };

  return (
    <React.Fragment>
      <Layout title="校园卡查询">
        <View className="a-color-grey">
          <View className="a-pt-5 a-pb-3 a-flex-space-between">
            <View>姓名</View>
            <RichText nodes={name}></RichText>
          </View>
          <View className="a-pt-5 a-pb-3 a-flex-space-between">
            <View>卡号</View>
            <RichText nodes={account}></RichText>
          </View>
          <View className="a-pt-5 a-pb-3 a-flex-space-between">
            <View>卡余额</View>
            <RichText nodes={balance}></RichText>
          </View>
          <View className="a-pt-5 a-pb-3 a-flex-space-between">
            <View>过渡余额</View>
            <RichText nodes={balanceTemp}></RichText>
          </View>
        </View>
        <Divider></Divider>
        <View className="a-flex-space-between">
          <Label></Label>
          <View>
            <View className="a-btn a-btn-blue" onClick={queryTodayStream}>
              当日流水
            </View>
            <View className="a-btn a-btn-blue a-lml" onClick={queryHistoryStream}>
              历史流水
            </View>
          </View>
        </View>
      </Layout>

      {list.map((item, index) => (
        <Layout key={index}>
          <View className="y-center a-color-grey">
            <Dot background={item.background}></Dot>
            <View className="y-center a-ml">{item.location}</View>
            <View className="y-center a-lml">金额：{item.money}</View>
          </View>
          <View className="y-center a-lmt a-color-grey">
            <View className="y-center a-ml-5">余额：{item.balance}</View>
            <View className="y-center a-lml">{item.status}</View>
          </View>
          <View className="y-center a-lmt a-color-grey">
            <View className="y-center a-ml-5">{item.time}</View>
            <View className="y-center a-lml">流水：{item.serno}</View>
          </View>
        </Layout>
      ))}

      {loaded && (
        <Layout title="Tips">
          <View className="tips-con a-lmt a-color-grey">
            <View>1. 历史消费记录只显示一个月内消费的前17条记录</View>
            <View>2. 仅作参考，具体数据请于行政楼查阅</View>
          </View>
        </Layout>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
