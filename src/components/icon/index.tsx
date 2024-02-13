import type { ITouchEvent } from "@tarojs/components";
import { Text } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";

import styles from "./index.modules.scss";

export const Icon: FC<{
  type: string;
  size?: number;
  className?: string;
  space?: boolean;
  onClick?: (event: ITouchEvent) => void;
}> = props => {
  return (
    <Text
      className={cs(
        "shst-icon",
        `icon-${props.type}`,
        props.space && styles.space,
        props.className
      )}
      onClick={props.onClick}
      style={{ fontSize: props.size }}
    ></Text>
  );
};
