import { Button, View } from "@tarojs/components";
import React from "react";

import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { PATH } from "@/config/page";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { App } from "@/utils/app";
import { Nav } from "@/utils/nav";

import styles from "./index.module.scss";

export default function Func() {
  useOnLoadEffect(() => {
    !App.data.isPLUSLogin && Nav.to(PATH.PLUS_LOGIN);
  });

  const onNav = (url: string, check?: boolean) => {
    if (check && !App.data.isPLUSLogin) {
      Nav.to(PATH.PLUS_LOGIN);
    } else {
      Nav.to(url);
    }
  };

  return (
    <React.Fragment>
      <Layout title="学习" color="rgb(var(--red-5))" inheritColor>
        <View className="y-center">
          <View className={styles.iconBox} onClick={() => onNav(PATH.TIMETABLE, true)}>
            <Icon type="kebiao"></Icon>
            <View className={styles.text}>查课表</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.TIMETABLE, true)}>
            <Icon type="classroom"></Icon>
            <View className={styles.text}>查教室</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.TIMETABLE, true)}>
            <Icon type="grade"></Icon>
            <View className={styles.text}>查成绩</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.TIMETABLE, true)}>
            <Icon type="biji-copy"></Icon>
            <View className={styles.text}>考试安排</View>
          </View>
        </View>
      </Layout>

      <Layout title="信息" color="rgb(var(--green-5))" inheritColor>
        <View className="y-center">
          <View className={styles.iconBox} onClick={() => onNav(PATH.TIMETABLE, false)}>
            <Icon type="jihua"></Icon>
            <View className={styles.text}>执行计划</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.TIMETABLE, true)}>
            <Icon type="mc-wcqk"></Icon>
            <View className={styles.text}>完成情况</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.TIMETABLE, true)}>
            <Icon type="jiaofu-1"></Icon>
            <View className={styles.text}>教材信息</View>
          </View>
          <Button open-type="feedback" className={styles.iconBox} hover-class="none">
            <Icon type="bianji"></Icon>
            <View className={styles.text}>意见反馈</View>
          </Button>
        </View>
      </Layout>
    </React.Fragment>
  );
}

Func.onShareAppMessage = () => void 0;
Func.onShareTimeline = () => void 0;
