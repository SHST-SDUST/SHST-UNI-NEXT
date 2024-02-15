import { View } from "@tarojs/components";
import React, { useState } from "react";

import { Banner } from "@/components/banner";
import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";

import styles from "./index.module.scss";
import { type ExamItem, requestForExam } from "./model";

export default function Index() {
  const [tips, setTips] = useState<string>("");
  const [list, setList] = useState<ExamItem[]>([]);

  useOnLoadEffect(() => {
    requestForExam().then(res => {
      setTips(res.length !== 0 ? "" : "暂无考试信息");
      setList(res.length !== 0 ? (res.filter(Boolean) as ExamItem[]) : []);
    });
  });

  return (
    <React.Fragment>
      <Banner title="考试安排"></Banner>

      <View className="a-gap-10"></View>

      {tips && (
        <Layout>
          <View className="y-center">
            <Dot></Dot>
            <View>{tips}</View>
          </View>
        </Layout>
      )}

      {list.map((item, index) => (
        <Layout key={index}>
          <View className={styles.item}>
            <View className="x-center y-center">
              <View className={styles.name}>{item.kcmc}</View>
              <View className="a-color-grey">
                {item.startTime}-{item.endTimeSplit}
              </View>
            </View>
            <View className="x-center y-center">
              <View className={styles.classroom}>{item.jsmc}</View>
              <View className="a-color-grey">{item.vksjc}</View>
            </View>
          </View>
        </Layout>
      ))}
    </React.Fragment>
  );
}
