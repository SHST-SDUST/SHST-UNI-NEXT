import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useState } from "react";

import { Banner } from "@/components/banner";
import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { App } from "@/utils/app";

import styles from "./index.module.scss";
import { requestForVacation, type Vacation } from "./model";

export default function Index() {
  const [data, setData] = useState<Vacation[]>([]);

  useOnLoadEffect(() => {
    requestForVacation().then(res => {
      res && setData(res);
    });
  });

  return (
    <React.Fragment>
      <Banner title="节假日安排"></Banner>
      <View className="a-lmt"></View>
      {data.map((item, index) => (
        <Layout key={index}>
          <View className={cs("y-center", styles.line)}>
            <Dot background={App.data.colorList[index % App.data.colorList.length]}></Dot>
            <View>{item.name}</View>
            <View>{item.v_time}</View>
          </View>
          <View className={styles.subLine}>{item.info}</View>
        </Layout>
      ))}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
