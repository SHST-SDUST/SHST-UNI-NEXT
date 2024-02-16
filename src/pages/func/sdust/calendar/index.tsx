import type { CommonEventFunction, PickerSelectorProps } from "@tarojs/components";
import { Picker, View } from "@tarojs/components";
import React, { useState } from "react";

import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { DateTime } from "@/utils/datetime";
import { Toast } from "@/utils/toast";

import { NOW, TODAY } from "./constant";
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
    });
  });

  const deployCalendar = (originDate: DateTime, item: TermData) => {
    const origin = originDate.clone().nextMonth(0);
    let monthStartWeekDay = origin.getDay();
    monthStartWeekDay = monthStartWeekDay === 0 ? 7 : monthStartWeekDay;
    origin.nextDay(-(monthStartWeekDay - 1));
    const year = origin.format("yyyy");
    const month = origin.format("MM");
    setCurYear(year);
    setCurMonth(month);
    const result: CalendarData[][] = [];
    for (let i = 0; i < 6; ++i) {
      const inside: CalendarData[] = [];
      let week = 0;
      for (let k = 0; k < 7; ++k) {
        const date = origin.format();
        const day = origin.format("dd");
        if (k === 0) {
          week = origin.diff(new DateTime(this.termStart)).days / 7 + 1;
          week = week > 0 ? week : 0;
          inside.push({ day: week, type: -1 });
        }
        const cell: CalendarData = { day, type: 0 };
        if (date === TODAY) cell.today = true;
        if (date === item.startdata) cell.start = true;
        if (week === item.vacationstart && k === 1) cell.vacation = true;
        if (k === 5 || k === 6) {
          cell.type = 2;
        } else if (week && week <= item.weekcount) {
          cell.type = 1;
          if (week >= item.vacationstart) cell.type = 3;
        }
        inside.push(cell);
        origin.nextDay();
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

  const onSwitchMonth = (op: number) => {
    const date = new DateTime(`${curYear}-${curMonth}-01`);
    date.nextMonth(op);
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
          <Layout></Layout>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
