import type { CommonEventFunction, PickerSelectorProps } from "@tarojs/components";
import { Picker, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React from "react";

import { Divider } from "@/components/divider";
import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { TimeTable } from "@/components/time-table";
import type { TimeTableType } from "@/components/time-table/types";
import { useStateRef } from "@/hooks/use-state-ref";
import { Limit } from "@/utils/limit";
import { Toast } from "@/utils/toast";

import { ALL_CLASSROOM, ALL_CLASSROOM_KEYS } from "./constant";
import styles from "./index.module.scss";
import { requestForClasses } from "./model";

export default function Index() {
  const [week, setWeek, weekRef] = useStateRef(1);
  const [loaded, setLoaded] = React.useState(false);
  const [floorIndex, setFloorIndex, floorIndexRef] = useStateRef(0);
  const [data, setData] = React.useState<TimeTableType>([]);
  const [classroomIndex, setClassroomIndex, classroomIndexRef] = useStateRef(0);

  const getRemoteClasses = () => {
    const building = ALL_CLASSROOM_KEYS[floorIndexRef.current];
    const classroom = ALL_CLASSROOM[building][classroomIndexRef.current];
    requestForClasses(classroom, weekRef.current).then(res => {
      if (!res) {
        Toast.info("请求失败 请重试");
        setLoaded(false);
        return void 0;
      }
      setData(res);
      setLoaded(true);
    });
  };

  const onFloorPickerChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    const current = e.detail.value as number;
    setFloorIndex(current);
    setWeek(1);
    setLoaded(false);
  };

  const onClassroomPickerChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    const current = e.detail.value as number;
    setClassroomIndex(current);
    setWeek(1);
    setLoaded(false);
  };

  const onSwitchWeek = (type: 1 | -1) => {
    Limit.throttleGlobal(500, () => {
      if (type === -1 && week <= 1) return void 0;
      const next = week + type;
      setWeek(next);
      getRemoteClasses();
    });
  };

  return (
    <React.Fragment>
      <Layout>
        <View className="y-center a-flex-space-around">
          <View className={cs(styles.selector, "x-center")}>
            <Picker value={floorIndex} range={ALL_CLASSROOM_KEYS} onChange={onFloorPickerChange}>
              <View>{ALL_CLASSROOM_KEYS[floorIndex]}</View>
            </Picker>
          </View>
          <View className={cs(styles.selector, "x-center")}>
            <Picker
              value={classroomIndex}
              range={ALL_CLASSROOM[ALL_CLASSROOM_KEYS[floorIndex]]}
              onChange={onClassroomPickerChange}
            >
              <View>{ALL_CLASSROOM[ALL_CLASSROOM_KEYS[floorIndex]][classroomIndex]}</View>
            </Picker>
          </View>
          <View className="a-btn a-btn-blue" onClick={getRemoteClasses}>
            确定
          </View>
        </View>
      </Layout>
      {loaded && (
        <Layout title={ALL_CLASSROOM[ALL_CLASSROOM_KEYS[floorIndex]][classroomIndex]}>
          <View className="a-flex-space-between y-center a-lpl a-lpr">
            <View>周次：{week}</View>
            <View>
              <View className="a-btn a-btn-blue a-btn-small a-lmr" onClick={() => onSwitchWeek(-1)}>
                <Icon type="arrow-lift" className="a-fontsize-16"></Icon>
              </View>
              <View className="a-btn a-btn-blue a-btn-small" onClick={() => onSwitchWeek(1)}>
                <Icon type="arrow-right" className="a-fontsize-16"></Icon>
              </View>
            </View>
          </View>
          <Divider margin={3} />
          <TimeTable week={week} timeTable={data}></TimeTable>
        </Layout>
      )}
      <Layout>
        <View className="tips-con">
          <View>提示：</View>
          <View>1. 该数据不能保持实时更新，所以信息仅供参考。</View>
          <View>2. 数据为根据课程信息整理，某些教室信息收录不全。</View>
          <View>3. 由于研究生分离管理，J5数据收录严重不全，请酌情对待。</View>
        </View>
      </Layout>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
