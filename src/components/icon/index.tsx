import { cs } from "laser-utils";
import type { FC } from "react";

export const Icon: FC<{
  type: string;
  size?: number;
}> = props => {
  return <i className={cs("shst-icon", `icon-${props.type}`)} style={{ fontSize: props.size }}></i>;
};
