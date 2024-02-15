import { Input, View } from "@tarojs/components";
import React, { useState } from "react";

import { Divider } from "@/components/divider";
import { Layout } from "@/components/layout";
import type { TimeTableType } from "@/components/time-table/types";

import styles from "./index.module.scss";
import type { Response } from "./model";

export default function Index() {
  const [status, setStatus] = useState(-1);
  const [account, setAccount] = useState("");
  const [peerName, setPeerName] = useState("");
  const [data, setData] = useState<Response>();
  const [table, setTable] = useState<TimeTableType>([]);
  const [peerTable, setPeerTable] = useState<TimeTableType>([]);

  return (
    <View className={styles.container}>
      <Layout title="共享课表">
        {status === 1 && (
          <View className="x-center a-flex-warp">
            <View className="x-center a-flex-column">
              <Input value={account} className="a-input" placeholder="对方学号" type="number" />
              <Input value={peerName} className="a-input a-mt" placeholder="对方姓名" />
              <View className="a-btn a-btn-blue a-btn-large">发起请求</View>
            </View>
          </View>
        )}
        {status === 2 && data && (
          <View className="x-center a-flex-warp">
            <View className="y-center">
              <View>{data.pair_user[0]}</View>
              <View className="a-ml">{data.pair_user[1]}</View>
              <View className="a-btn a-btn-blue a-btn-small">撤销请求</View>
            </View>
          </View>
        )}
        {status !== 0 && <Divider margin={3}></Divider>}
        {status !== 0 && data && (
          <View className="x-center a-flex-warp">
            {data.data.map((item, key) => (
              <View key={key} className="y-center">
                <View>{item.account}</View>
                <View className="a-ml">{item.name}</View>
                <View className="a-btn a-btn-blue a-btn-small">同意</View>
                <View className="a-btn a-btn-blue a-btn-small">拒绝</View>
              </View>
            ))}
          </View>
        )}
        <Divider margin={3}></Divider>
        {data && (
          <View className="y-center">
            <View>{data.user} -</View>
            <View>{data.succ.pair}</View>
            <View className="a-btn a-btn-blue a-btn-small">解除关系</View>
          </View>
        )}
      </Layout>
      {status === 1 && (
        <Layout title="Tips">
          <View className="tips-con">
            1.向对方发起请求(对方必须是正常登陆过软件或者小程序才可以)，对方通过后，你们将能够在此看到自己与对方的课表
          </View>
        </Layout>
      )}
    </View>
  );
}
