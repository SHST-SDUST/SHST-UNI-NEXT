import { Navigator, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useState } from "react";

import { Divider } from "@/components/divider";
import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { TimeTable } from "@/components/time-table";
import type { TimeTableType } from "@/components/time-table/types";
import { PATH } from "@/config/page";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { App } from "@/utils/app";
import { Toast } from "@/utils/toast";

import styles from "./index.module.scss";
import { parseTimeTable, requestTimeTable } from "./model";

export default function TimeTablePage() {
  const [week, setWeek] = useState(1);
  const [termStart, setTermStart] = useState("");
  const [table, setTable] = useState<TimeTableType>([]);

  const getTimeTable = (currentWeek: number, cache = true, throttle = false) => {
    requestTimeTable(currentWeek, cache, throttle).then(res => {
      if (res) {
        const list = parseTimeTable(res.data, true);
        setTable(list);
      } else {
        Toast.info("加载失败，请刷新重试");
      }
    });
  };

  useOnLoadEffect(() => {
    setWeek(App.data.curWeek);
    setTermStart(App.data.curTermStart);
    getTimeTable(App.data.curWeek);
  });

  return (
    <React.Fragment>
      <Layout title="查课表">
        <View className={styles.tableHeader}>
          <View className={(cs(styles.week), "a-lml")}>第{week}周</View>
          <View className="y-center">
            <Navigator
              className="a-btn a-btn-white a-btn-square a-lml y-center"
              url={PATH.TIMETABLE_EDITOR}
            >
              <Icon type="jia"></Icon>
            </Navigator>
            <View className="a-btn a-btn-white a-btn-square a-lml y-center">
              <Icon type="shuaxin1"></Icon>
            </View>
            <View className="a-btn a-btn-white a-btn-square a-lml y-center">
              <Icon type="arrow-lift"></Icon>
            </View>
            <View className="a-btn a-btn-white a-btn-square a-lml y-center">
              <Icon type="arrow-right"></Icon>
            </View>
          </View>
        </View>
        <Divider margin={3} />
        <TimeTable termStart={termStart} week={week} timeTable={table}></TimeTable>
      </Layout>
    </React.Fragment>
  );
}
