import type {
  CommonEventFunction,
  PickerMultiSelectorProps,
  PickerSelectorProps,
} from "@tarojs/components";
import { Input, Picker, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { cs, TSON } from "laser-utils";
import React, { useState } from "react";

import { Banner } from "@/components/banner";
import { Dot } from "@/components/dot";
import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { App } from "@/utils/app";
import { Event, EVENT_ENUM } from "@/utils/event";
import { Toast } from "@/utils/toast";

import { MAPPER, SERIAL_RANGE, WEEK_RANGE, WEEKDAY_RANGE } from "./constant";
import styles from "./index.module.scss";
import { requestForSaveTable, requestForTable, type TableItem } from "./model";

export default function Editor() {
  const [editIndex, setEditIndex] = useState(-2);
  const [isDraft, setIsDraft] = useState(false);
  const [editClassName, setEditClassName] = useState("");
  const [editClassRoom, setEditClassRoom] = useState("");
  const [editTeacher, setEditTeacher] = useState("");
  const [weekDayIndex, setWeekDayIndex] = useState(0);
  const [weekIndex, setWeekIndex] = useState([0, 1]);
  const [serialIndex, setSerialIndex] = useState([0, 0]);
  const [table, setTable] = useState<TableItem[]>([]);

  const onDayPickerChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    setWeekDayIndex(e.detail.value as number);
  };

  const onWeekPickerChange: CommonEventFunction<PickerMultiSelectorProps.ChangeEventDetail> = e => {
    const select = e.detail.value as [number, number];
    if (select[0] > select[1]) select[1] = select[0];
    setWeekIndex(select);
  };

  const onSerialPickerChange: CommonEventFunction<
    PickerMultiSelectorProps.ChangeEventDetail
  > = e => {
    const select = e.detail.value as [number, number];
    if (select[0] > select[1]) select[1] = select[0];
    setSerialIndex(select);
  };

  useOnLoadEffect(() => {
    requestForTable().then(res => {
      if (!res) return void 0;
      setTable(res);
      res.length > 0 && setIsDraft(true);
    });
  });

  const onClear = () => {
    setEditClassName("");
    setEditClassRoom("");
    setEditTeacher("");
    setWeekDayIndex(0);
    setWeekIndex([0, 1]);
    setSerialIndex([0, 0]);
  };

  const onSave = (index: number) => {
    const item: TableItem = {
      className: editClassName,
      classroom: editClassRoom,
      teacherName: editTeacher || "无",
      weekStart: WEEK_RANGE[0][weekIndex[0]],
      weekEnd: WEEK_RANGE[1][weekIndex[1]],
      timeStart: SERIAL_RANGE[0][serialIndex[0]],
      timeEnd: SERIAL_RANGE[1][serialIndex[1]],
      term: App.data.curTerm,
      day: WEEKDAY_RANGE[weekDayIndex],
    };
    if (!item.className || !item.classroom) {
      Toast.info("请将数据填写完整");
      return void 0;
    }
    if (index === -1) {
      setTable([...table, item]);
      setIsDraft(true);
    } else {
      table[index] = item;
      setTable([...table]);
      setEditIndex(-1);
      onClear();
    }
  };

  const onEditUnit = (index: number) => {
    setEditIndex(index);
    const item = table[index];
    setEditClassName(item.className);
    setEditClassRoom(item.classroom);
    setEditTeacher(item.teacherName);
    setWeekIndex([item.weekStart, item.weekEnd]);
    setSerialIndex([item.timeStart - 1, item.timeEnd - 1]);
    setWeekDayIndex(item.day - 1);
    Taro.pageScrollTo({ scrollTop: -1 });
  };

  const onDeleteUnit = (index: number) => {
    Toast.confirm("提示", "确定要删除吗？").then(choice => {
      if (choice) {
        table.splice(index, 1);
        setTable([...table]);
      }
    });
  };

  const onSubmit = () => {
    const data = table.map(v => {
      const tmp = {};
      for (const key in MAPPER) tmp[MAPPER[key]] = v[key];
      return tmp;
    });
    requestForSaveTable(TSON.stringify(data) as string).then(() => {
      Toast.info("保存成功");
      setEditIndex(-2);
      Event.commit(EVENT_ENUM.REFRESH_TIMETABLE, null);
    });
  };

  const onClearAll = () => {
    setEditIndex(-2);
    onClear();
    setTable([]);
  };

  return (
    <React.Fragment>
      {editIndex !== -2 && (
        <Layout title="添加课程">
          <View className="a-flex">
            <View className="a-input-con-line a-mb y-center a-mt a-flex-full">
              <View>课程名:</View>
              <Input
                value={editClassName}
                onInput={e => setEditClassName(e.detail.value)}
                className="a-input"
                placeholder="必填"
              />
            </View>
            <View className="a-input-con-line a-mb y-center a-flex-full">
              <View>教室:</View>
              <Input
                value={editClassRoom}
                onInput={e => setEditClassRoom(e.detail.value)}
                className="a-input"
                placeholder="必填"
              />
            </View>
          </View>
          <View className="a-flex">
            <View className="a-input-con-line a-mb y-center a-flex-full">
              <View>教师名:</View>
              <Input
                value={editTeacher}
                onInput={e => setEditTeacher(e.detail.value)}
                className="a-input"
                placeholder="选填"
              />
            </View>
            <View className="a-input-con-line a-mb y-center a-flex-full">
              <Picker
                className="x-full"
                value={weekDayIndex}
                range={WEEKDAY_RANGE}
                onChange={onDayPickerChange}
              >
                <View className="a-flex-space-between y-center">
                  <View>日期:</View>
                  <View className="y-center">
                    <View>周 {WEEKDAY_RANGE[weekDayIndex]}</View>
                  </View>
                  <View></View>
                </View>
              </Picker>
            </View>
          </View>
          <View className="a-flex">
            <View className="a-input-con-line a-mb a-flex-full">
              <Picker
                className="x-full"
                mode="multiSelector"
                value={weekIndex}
                range={WEEK_RANGE}
                onChange={onWeekPickerChange}
              >
                <View className="a-flex-space-between y-center">
                  <View>周次:</View>
                  <View className="y-center">
                    <View>第 {WEEK_RANGE[0][weekIndex[0]]}</View>
                    <View className="a-lml a-lmr">-</View>
                    <View>{WEEK_RANGE[1][weekIndex[1]]} 周</View>
                  </View>
                  <View></View>
                </View>
              </Picker>
            </View>
            <View className="a-input-con-line a-mb a-flex-full">
              <Picker
                className="x-full"
                mode="multiSelector"
                value={serialIndex}
                range={SERIAL_RANGE}
                onChange={onSerialPickerChange}
              >
                <View className="a-flex-space-between y-center">
                  <View>时间:</View>
                  <View className="a-flex">
                    <View>第 {SERIAL_RANGE[0][serialIndex[0]]}</View>
                    <View className="a-lml a-lmr">-</View>
                    <View>{SERIAL_RANGE[1][serialIndex[1]]} 节</View>
                  </View>
                </View>
              </Picker>
            </View>
          </View>
          <View className="a-flex">
            <View className="a-btn a-btn-blue a-flex-full a-lmt" onClick={() => onSave(editIndex)}>
              {editIndex === -1 ? "添加" : "保存"}
            </View>
            <View className="a-btn a-btn-orange a-flex-full a-lmt a-lml" onClick={onClear}>
              重置
            </View>
          </View>
        </Layout>
      )}

      <Banner title="课表管理">
        <View className="a-lmr y-full y-center">
          <Icon type="jia" onClick={() => setEditIndex(-1)}></Icon>
        </View>
      </Banner>

      <View className="a-lmt"></View>

      {table.map((item, index) => (
        <Layout key={index} cardClassName="a-flex-space-between">
          <View>
            <View className={styles.className}>
              {item.className}
              {editIndex === index ? "[编辑中]" : ""}
            </View>
            <View className="a-lmt">{item.term}</View>
            <View className="a-lmt">
              第{item.weekStart} - {item.weekEnd}周
            </View>
            <View className="a-flex a-lmt">
              <View>周{item.day}</View>
              <View className="a-lml">
                第{item.timeStart} - {item.timeEnd}节
              </View>
            </View>
          </View>
          <View className="y-center">
            <View className={cs("x-center", styles.right)}>
              <View className={styles.classRoom}>{item.classroom}</View>
              <View className="a-lmt">{item.teacherName}</View>
              <View className="a-flex a-lmt">
                <Icon type="bianji" onClick={() => onEditUnit(index)}></Icon>
                <Icon type="x" className="a-lml" onClick={() => onDeleteUnit(index)}></Icon>
              </View>
            </View>
          </View>
        </Layout>
      ))}

      {!table.length && (
        <Layout>
          <View className="y-center">
            <Dot></Dot>
            <View>暂无课表数据</View>
          </View>
        </Layout>
      )}

      {isDraft && (
        <Layout>
          <View className="a-flex">
            <View className="a-btn a-btn-blue x-full" onClick={onSubmit}>
              保存
            </View>
            <View className="a-btn a-btn-orange x-full a-lml" onClick={onClearAll}>
              清空
            </View>
          </View>
        </Layout>
      )}

      <Layout>
        <View className="tips-con">
          <View>注意：</View>
          <View>1. 课表目前只能添加数据，不能对原课表进行删除操作。</View>
          <View>2. 进行的操作必须在最后进行保存，否则操作会丢失。</View>
          <View>3. 数据以缓存形式保存在本地，清理缓存会导致数据丢失。</View>
        </View>
      </Layout>
    </React.Fragment>
  );
}
