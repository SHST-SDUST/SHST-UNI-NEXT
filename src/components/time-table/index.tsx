import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";
import React, { useMemo, useState } from "react";

import { DateTime } from "@/utils/datetime";

import { Dialog } from "../dialog";
import { Divider } from "../divider";
import { Dot } from "../dot";
import styles from "./index.module.scss";
import type {
  DateRowType,
  DefinedTableItem,
  DefinedTableRecord,
  TimeTableItem,
  TimeTableType,
} from "./types";
import { getKey, WEEK_DAY } from "./utils";

export const TimeTable: FC<{
  className?: string;
  week: number;
  termStart: string;
  timeTable: TimeTableType;
}> = props => {
  const [dialogContent, setDialogContent] = useState<TimeTableItem[] | null>(null);

  const dateRow = useMemo(() => {
    const result: DateRowType = [];
    const today = new DateTime().format("MM/dd");
    const curWeekDate = props.termStart ? new DateTime(props.termStart) : new DateTime();
    const latest = curWeekDate.nextDay((props.week - 1) * 7);
    for (let i = 0; i < 7; ++i) {
      latest.nextDay();
      const date = latest.format("MM/dd");
      result.push({ weekDay: WEEK_DAY[i], date: date, today: date === today });
    }
    return result;
  }, [props.termStart, props.week]);

  const table = useMemo(() => {
    const result: DefinedTableRecord = {};
    for (const item of props.timeTable) {
      const key = getKey(item.weekDay, item.serial);
      const record: DefinedTableItem = result[key] || { simple: item, all: [] };
      if (item.isCurWeek) record.simple = item;
      record.all.push(item);
      result[key] = record;
    }
    return result;
  }, [props.timeTable]);

  const onClose = () => {
    setDialogContent(null);
  };

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
      {Array(5)
        .fill(0)
        .map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <View className="a-flex">
              <View className="a-flex a-flex-full">
                {Array(7)
                  .fill(0)
                  .map((__, columnIndex) => (
                    <View key={columnIndex} className="a-flex a-flex-full">
                      <View className={cs("a-flex-full", styles.placeholder)}>
                        {table &&
                          table[getKey(columnIndex, rowIndex)] &&
                          ((item: DefinedTableItem) => (
                            <View
                              onClick={() => setDialogContent(item.all)}
                              className={styles.tableBlock}
                              style={{ background: item.simple.background }}
                            >
                              <View>{item.simple.className}</View>
                              <View>{item.simple.classRoom}</View>
                              <View>{item.simple.teacher}</View>
                              {item.simple.ext && <View>{item.simple.ext}</View>}
                              {item.all.length > 1 && <View className={styles.triangle}></View>}
                            </View>
                          ))(table[getKey(columnIndex, rowIndex)])}
                      </View>
                    </View>
                  ))}
              </View>
            </View>
            <Divider margin={3}></Divider>
          </React.Fragment>
        ))}

      <Dialog visible={!!dialogContent} onClose={onClose} className={styles.dialog}>
        {dialogContent &&
          dialogContent.map((item, index) => (
            <View key={index} className={cs("a-mt-10 a-mb-10", index && "a-lmt")}>
              <View className="y-center">
                <Dot background={item.background}></Dot>
                <View>{item.className}</View>
              </View>
              <View className="a-flex-space-between a-pt">
                <View className="y-center">
                  <Dot type="fill-2"></Dot>
                  <View>教室</View>
                </View>
                <View>{item.classRoom}</View>
              </View>
              <View className="a-flex-space-between a-pt">
                <View className="y-center">
                  <Dot type="fill-2"></Dot>
                  <View>讲师</View>
                </View>
                <View>{item.teacher}</View>
              </View>
              {item.ext && (
                <View className="a-flex-space-between a-pt">
                  <View className="y-center">
                    <Dot type="fill-2"></Dot>
                    <View>{item.ext}</View>
                  </View>
                </View>
              )}
            </View>
          ))}
      </Dialog>
    </View>
  );
};
