import { Navigator, View } from "@tarojs/components";
import React from "react";

import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { PATH } from "@/config/page";
import { App } from "@/utils/app";
import { Nav } from "@/utils/nav";

import styles from "./index.module.scss";

export default function Func() {
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
          <View className={styles.iconBox} onClick={() => onNav(PATH.PLUS_TIMETABLE, true)}>
            <Icon type="kebiao"></Icon>
            <View className={styles.text}>查课表</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.PLUS_CLASSROOM, true)}>
            <Icon type="classroom"></Icon>
            <View className={styles.text}>查教室</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.PLUS_GRADE, true)}>
            <Icon type="grade"></Icon>
            <View className={styles.text}>查成绩</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.SHARE_TABLE, true)}>
            <Icon type="fly"></Icon>
            <View className={styles.text}>共享课表</View>
          </View>
        </View>
      </Layout>

      <Layout title="信息" color="rgb(var(--green-5))" inheritColor>
        <View className="y-center">
          <View className={styles.iconBox} onClick={() => onNav(PATH.LIBRARY, false)}>
            <Icon type="lib"></Icon>
            <View className={styles.text}>图书检索</View>
          </View>
          <Navigator
            className={styles.iconBox}
            target="miniProgram"
            app-id="wx3e1205c6aa103080"
            hover-class="none"
            version="release"
          >
            <Icon type="shujia"></Icon>
            <View className={styles.text}>二手教材</View>
          </Navigator>
          <Navigator
            className={styles.iconBox}
            target="miniProgram"
            app-id="wxa53da62a53aaddea"
            hover-class="none"
            version="release"
          >
            <Icon type="lubiao-xf"></Icon>
            <View className={styles.text}>迎新专版</View>
          </Navigator>
          <View className={styles.iconBox} onClick={() => onNav(PATH.PLUS_EXAM, true)}>
            <Icon type="biji-copy"></Icon>
            <View className={styles.text}>考试安排</View>
          </View>
        </View>
      </Layout>

      <Layout title="科大" color="rgb(var(--purple-5))" inheritColor>
        <View className="y-center">
          <View className={styles.iconBox} onClick={() => onNav(PATH.MAP, false)}>
            <Icon type="map"></Icon>
            <View className={styles.text}>嵙地图</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.TOUR, false)}>
            <Icon type="nav"></Icon>
            <View className={styles.text}>校园导览</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.CALENDAR, false)}>
            <Icon type="calendar"></Icon>
            <View className={styles.text}>校历</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.VACATION, false)}>
            <Icon type="vacation"></Icon>
            <View className={styles.text}>放假安排</View>
          </View>
        </View>
      </Layout>

      <Layout title="扩展" color="rgb(var(--arcoblue-5))" inheritColor>
        <View className="y-center">
          <View className={styles.iconBox} onClick={() => onNav(PATH.CLASSES, false)}>
            <Icon type="kebiao1"></Icon>
            <View className={styles.text}>教室课表</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.COURSE, false)}>
            <Icon type="tubiao-"></Icon>
            <View className={styles.text}>蹭课查询</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.LINK, false)}>
            <Icon type="link"></Icon>
            <View className={styles.text}>常用链接</View>
          </View>
          <View className={styles.iconBox} onClick={() => onNav(PATH.CARD, true)}>
            <Icon type="xuehao"></Icon>
            <View className={styles.text}>校园卡</View>
          </View>
        </View>
      </Layout>
    </React.Fragment>
  );
}

Func.onShareAppMessage = () => void 0;
Func.onShareTimeline = () => void 0;
