import { Text } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";

import styles from "./index.modules.scss";

export const Icon: FC<{
  type: string;
  size?: number;
  className?: string;
  space?: boolean;
}> = props => {
  return (
    <Text
      className={cs(
        "shst-icon",
        `icon-${props.type}`,
        props.space && styles.space,
        props.className
      )}
      style={{ fontSize: props.size }}
    ></Text>
  );
};
