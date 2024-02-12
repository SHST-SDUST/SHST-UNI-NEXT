import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { stopBubble } from "@/utils/stop";

import { Icon } from "../icon";
import styles from "./index.module.scss";

export const Dialog: FC<{
  visible: boolean;
}> = props => {
  const [visible, setVisible] = useState(props.visible);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const onClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }
  return (
    <View className={styles.container} onClick={onClose}>
      <View className={styles.member} onClick={stopBubble}>
        {props.children}
        <View onClick={onClose} className={cs(styles.close, "x-center y-center")}>
          <Icon type="x" className={styles.iconX}></Icon>
        </View>
      </View>
    </View>
  );
};
