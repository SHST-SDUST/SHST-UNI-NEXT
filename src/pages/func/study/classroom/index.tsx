import type { CommonEventFunction, PickerViewProps } from "@tarojs/components";
import { PickerView, PickerViewColumn, View } from "@tarojs/components";
import React, { useState } from "react";

import { Layout } from "@/components/layout";
import { Loading } from "@/utils/loading";

import { NOW, QUERY_DATA, QUERY_FLOOR, QUERY_TIME } from "./constant";
import styles from "./index.module.scss";
import { type ClassRoomType, requestForClassRoom } from "./model";

export default function Index() {
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState(NOW);
  const [data, setData] = useState<ClassRoomType | null>(null);
  const [index, setIndex] = useState<[number, number, number]>([0, 0, 0]);

  const onPickerChange: CommonEventFunction<PickerViewProps.onChangeEventDetail> = e => {
    setIndex(e.detail.value as [number, number, number]);
  };

  const onSearch = () => {
    Loading.start({ load: 2 });
    setTimeout(() => {
      const [dataIndex, timeIndex, floorIndex] = index;
      const date = QUERY_DATA[dataIndex][0];
      const time = QUERY_TIME[timeIndex][1];
      const floor = QUERY_FLOOR[floorIndex][1];
      const campus = QUERY_FLOOR[floorIndex][2];
      requestForClassRoom(date, time, floor, campus).then(res => {
        if (res) {
          setData(res);
          setSuffix(date);
          setPrefix(QUERY_TIME[timeIndex][2]);
        }
        Loading.end({ load: 2 });
      });
    }, 100);
  };

  return (
    <React.Fragment>
      <Layout title="空教室" topSpace>
        <View className="text-center a-flex-space-between a-lmt">
          <PickerView
            className={styles.pickerContainer}
            indicator-style="height: 40px;"
            onChange={onPickerChange}
          >
            <PickerViewColumn>
              {QUERY_DATA.map((item, key) => (
                <View className={styles.pickerItem} key={key}>
                  {item[1]}
                </View>
              ))}
            </PickerViewColumn>
            <PickerViewColumn>
              {QUERY_TIME.map((item, key) => (
                <View className={styles.pickerItem} key={key}>
                  {item[0]}
                </View>
              ))}
            </PickerViewColumn>
            <PickerViewColumn>
              {QUERY_FLOOR.map((item, key) => (
                <View className={styles.pickerItem} key={key}>
                  {item[0]}
                </View>
              ))}
            </PickerViewColumn>
          </PickerView>
          <View className="y-center">
            <View className="a-btn a-btn-blue" onClick={onSearch}>
              搜索
            </View>
          </View>
        </View>
      </Layout>

      {data && (
        <Layout title={`${prefix}[${suffix}]`}>
          <View className={styles.floorName}>{data.jxl}</View>
          <View className="x-center y-center a-flex-warp">
            {data.jsList.map((item, key) => (
              <View key={key}>
                <view className={styles.roomItem}>{item.jsmc}</view>
              </View>
            ))}
          </View>
        </Layout>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
