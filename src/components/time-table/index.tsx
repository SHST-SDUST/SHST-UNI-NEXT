import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";
import { useMemo } from "react";

import { DateTime } from "@/utils/datetime";

import styles from "./index.module.scss";
import type { DateRowType, TimeTableType } from "./types";
import { WEEK_DAY } from "./utils";

export const TimeTable: FC<{
  className?: string;
  week: number;
  termStart: string;
  timeTable: TimeTableType;
}> = props => {
  // 计算当前周的日期
  const dateRow = useMemo(() => {
    const result: DateRowType = [];
    const today = new DateTime().format("MM/dd");
    const curWeekDate = new DateTime(props.termStart);
    const latest = curWeekDate.nextDay((props.week - 1) * 7);
    for (let i = 0; i < 7; ++i) {
      latest.nextDay();
      const date = latest.format("MM/dd");
      result.push({ weekDay: WEEK_DAY[i], date: date, today: date === today });
    }
    return result;
  }, [props.termStart, props.week]);

  return (
    <View className={props.className}>
      <View className="a-flex">
        {dateRow.map((item, index) => {
          <View key={index} className={styles.weekUnit}>
            <View className={styles.line}>{item.weekDay}</View>
            <View className={cs(styles.line, styles.border, item.today && styles.active)}>
              {item.weekDay}
            </View>
          </View>;
        })}
      </View>
    </View>
  );
};
