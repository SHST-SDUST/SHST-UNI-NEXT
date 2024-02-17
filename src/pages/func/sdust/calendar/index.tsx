import type { CommonEventFunction, PickerSelectorProps } from "@tarojs/components";
import { Label, Picker, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useState } from "react";

import { Dot } from "@/components/dot";
import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { DateTime } from "@/utils/datetime";
import { Toast } from "@/utils/toast";

import { NOW, TODAY, WEEK_HEADER } from "./constant";
import styles from "./index.module.scss";
import { type CalendarData, requestForTermData, type TermData } from "./model";

export default function Index() {
  const [range, setRange] = useState(["请稍后"]);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<TermData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [curTerm, setCurTerm] = useState("");
  const [curMonth, setCurMonth] = useState("");
  const [curYear, setCurYear] = useState("");
  const [weekCount, setWeekCount] = useState(0);
  const [termStart, setTermStart] = useState("");
  const [vacationDiff, setVacationDiff] = useState(0);
  const [vacationStart, setVacationStart] = useState("");
  const [vacationStartWeek, setVacationStartWeek] = useState(0);
  const [calendar, setCalendar] = useState<CalendarData[][]>([]);

  useOnLoadEffect(() => {
    requestForTermData().then(res => {
      if (!res) return void 0;
      setRange(res.filter(Boolean).map(item => item.term));
      setData(res);
      res[0] && onDatePickerChange(res[0]);
    });
  });

  const deployCalendar = (origin: DateTime, item: TermData) => {
    const deliver = origin.clone().nextMonth(0);
    let monthStartWeekDay = deliver.getDay();
    monthStartWeekDay = monthStartWeekDay === 0 ? 7 : monthStartWeekDay;
    const year = deliver.format("yyyy");
    const month = deliver.format("MM");
    setCurYear(year);
    setCurMonth(month);
    deliver.nextDay(-(monthStartWeekDay - 1));
    const termStartDate = new DateTime(item.startdata);
    const result: CalendarData[][] = [];
    for (let i = 0; i < 6; ++i) {
      const inside: CalendarData[] = [];
      let week = 0;
      for (let k = 0; k < 7; ++k) {
        const date = deliver.format();
        const day = deliver.format("dd");
        if (k === 0) {
          week = deliver.diff(termStartDate).days / 7 + 1;
          week = week > 0 ? week : 0;
          inside.push({ day: week, type: -1 });
        }
        const cell: CalendarData = { day, type: 0 };
        if (date === TODAY) cell.today = true;
        if (date === item.startdata) cell.start = true;
        if (week === item.vacationstart && k === 1) cell.vacation = true;
        if (deliver.getMonth() === origin.getMonth()) cell.currentMonth = true;
        if (k === 5 || k === 6) {
          cell.type = 2;
        } else if (week && week <= item.weekcount) {
          cell.type = 1;
          if (week >= item.vacationstart) cell.type = 3;
        }
        inside.push(cell);
        deliver.nextDay();
      }
      result.push(inside);
    }
    setCalendar(result);
    setLoaded(true);
  };

  const onDatePickerChange = (item: TermData) => {
    setCurTerm(item.term);
    setWeekCount(item.weekcount);
    setTermStart(item.startdata);
    setVacationStartWeek(item.vacationstart);
    const start = new DateTime(item.startdata);
    start.nextDay((item.vacationstart - 1) * 7);
    setVacationStart(start.format());
    setVacationDiff(start.diff(NOW).days);
    deployCalendar(NOW, item);
  };

  const onPickerChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    if (data.length === 0) {
      Toast.info("加载失败，请重试");
      return void 0;
    }
    const i = e.detail.value as number;
    setIndex(i);
    onDatePickerChange(data[i]);
  };

  const onSwitchMonth = (next: number) => {
    const date = new DateTime(`${curYear}-${curMonth}-01`);
    date.nextMonth(next);
    deployCalendar(date, data[index]);
  };

  const transformToDate = (date: string) => {
    const dt = new DateTime(date);
    deployCalendar(dt, data[index]);
  };

  return (
    <React.Fragment>
      <Layout title="校历查询">
        <View className={styles.selector}>
          <View>请选择学期</View>
          <Picker value={index} range={range} className="a-link" onChange={onPickerChange}>
            <View>{range[index]}</View>
          </Picker>
        </View>
      </Layout>
      {loaded && (
        <React.Fragment>
          <Layout>
            <View className="y-center a-flex-space-between">
              <View className="y-center">
                <Icon type="arrow-lift" onClick={() => onSwitchMonth(-1)}></Icon>
                <View>
                  {curYear}年 {curMonth}月
                </View>
                <Icon type="arrow-right" onClick={() => onSwitchMonth(1)}></Icon>
              </View>
              <View className="y-center">
                <View className="y-center x-center" onClick={() => transformToDate(TODAY)}>
                  <Label>今</Label>
                </View>
                <View className="y-center x-center" onClick={() => transformToDate(termStart)}>
                  <Label>开</Label>
                </View>
                <View className="y-center x-center" onClick={() => transformToDate(vacationStart)}>
                  <Label>假</Label>
                </View>
              </View>
            </View>
            <View>
              <View className={styles.line}>
                {WEEK_HEADER.map((item, key) => (
                  <View key={key}>{item}</View>
                ))}
              </View>
              {calendar.map((row, rowIndex) => (
                <View key={rowIndex} className={styles.line}>
                  {row.map((item, columnIndex) => (
                    <View key={columnIndex}>{item.day}</View>
                  ))}
                </View>
              ))}
            </View>
          </Layout>
          <Layout>
            <View className={cs("y-center", styles.footerBanner)}>
              <View style={{ width: "40%" }}>
                <Dot background="#3cb371"></Dot>
                <View className="text">学期:{curTerm}</View>
              </View>
              <View style={{ width: "24%" }}>
                <Dot background="#9f8bec"></Dot>
                <View className="text">周次:{weekCount}</View>
              </View>
              <View style={{ width: "36%" }}>
                <Dot background="#ff6347"></Dot>
                <View className="text">开学:{termStart}</View>
              </View>
            </View>
          </Layout>
          <Layout>
            <View className={cs("y-center", styles.footerBanner)}>
              <View style={{ width: "40%" }}>
                <Dot background="#3cb371"></Dot>
                <View className="text">假期:{vacationStart}</View>
              </View>
              <View style={{ width: "24%" }}>
                <Dot background="#9f8bec"></Dot>
                <View className="text">周次:{vacationStartWeek}</View>
              </View>
              <View style={{ width: "36%" }}>
                <Dot background="#ff6347"></Dot>
                <View className="text">距离:{vacationDiff}天</View>
              </View>
            </View>
          </Layout>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
