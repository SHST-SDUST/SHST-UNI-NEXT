import { Navigator, View } from "@tarojs/components";
import type { FC } from "react";

import styles from "./index.module.scss";

const NotFound: FC = () => {
  return (
    <View>
      <View className={styles.status}>404</View>
      <View className={styles.status}>NOT</View>
      <View className={styles.status}>FOUND</View>
      <Navigator
        url="/pages/home/tips/tips"
        open-type="reLaunch"
        className={styles.back}
        hover-class="none"
      >
        返回首页
      </Navigator>
    </View>
  );
};

export default NotFound;
