import { Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";

import styles from "./index.module.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className={styles.index}>
      <Text>Hello world!</Text>
    </View>
  );
}
