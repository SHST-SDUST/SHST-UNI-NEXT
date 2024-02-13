import { View } from "@tarojs/components";
import React from "react";

import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { PATH } from "@/config/page";
import { App } from "@/utils/app";
import { Nav } from "@/utils/nav";
import { Toast } from "@/utils/toast";

import styles from "./index.module.scss";

export default function Func() {
  const onNav = (url: string, check?: boolean) => {
    if (check && !App.data.isSHSTLogin) {
      Toast.confirm("提示", "该功能需要绑定强智教务系统，是否前去绑定").then(res => {
        res && Nav.to(PATH.LOGIN);
      });
    } else {
      Nav.to(url);
    }
  };

  return (
    <React.Fragment>
      <Layout title="学习" color="#FF6347" inheritColor>
        <View className="y-center">
          <View className={styles.iconBox} onClick={() => onNav(PATH.TIMETABLE, true)}>
            <Icon type="kebiao"></Icon>
            <View className={styles.text}></View>
          </View>
        </View>
      </Layout>
    </React.Fragment>
  );
}
