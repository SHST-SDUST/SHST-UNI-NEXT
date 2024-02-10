import { View } from "@tarojs/components";
import type { FC } from "react";

import styles from "./index.module.scss";

export const Divider: FC<{
  style?: React.CSSProperties;
}> = props => {
  return <View className={styles.divider} style={props.style}></View>;
};
