import { View } from "@tarojs/components";
import type { FC } from "react";
import React, { useState } from "react";

import styles from "./index.module.scss";
import type { TimeTableType } from "./types";

export const TimeTable: FC<{
  data: TimeTableType;
  className?: string;
}> = props => {
  return (
    <View className={props.className}>
      <View></View>
    </View>
  );
};
