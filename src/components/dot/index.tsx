import { View } from "@tarojs/components";
import type { FC } from "react";

import styles from "./index.module.scss";

export const Dot: FC<{ type?: string; background?: string }> = props => {
  return (
    <View
      className={styles.dot}
      style={{
        background: props.background ? props.background : `var(--color-${props.type || "fill-3"})`,
      }}
    ></View>
  );
};
