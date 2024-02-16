import type { CommonEventFunction, MapProps } from "@tarojs/components";
import { Label, Map, ScrollView, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useMemo, useState } from "react";

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, TOUR_CONFIG } from "./constant";
import styles from "./index.module.scss";

export default function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectIndex, setSelectIndex] = useState(-1);
  const [passiveSelectIndex, setPassiveSelectIndex] = useState(-1);
  const tabs = useMemo(() => TOUR_CONFIG.map(item => item.name), []);
  const config = useMemo(() => {
    const part = TOUR_CONFIG[activeTab];
    return {
      ...part,
      data: part.data.map((item, index) => ({
        ...item,
        iconPath: part.icon,
        width: 30,
        height: 30,
        id: index,
        callout:
          index === selectIndex
            ? { content: item.name, padding: 10, borderRadius: 2, display: "ALWAYS" }
            : undefined,
      })),
    };
  }, [activeTab, selectIndex]);

  const onSwitchTab = (index: number) => {
    setActiveTab(index);
    setSelectIndex(-1);
    Promise.resolve(passiveSelectIndex === 0 ? -1 : 0).then(setPassiveSelectIndex);
  };

  const onMarkerTap: CommonEventFunction<MapProps.onMarkerTapEventDetail> = e => {
    setSelectIndex(Number(e.detail.markerId));
    setPassiveSelectIndex(Number(e.detail.markerId));
  };

  return (
    <React.Fragment>
      <ScrollView scrollX enableFlex>
        <View className={cs(styles.tab, "text-center")}>
          {tabs.map((item, index) => (
            <Label
              onClick={() => onSwitchTab(index)}
              key={index}
              className={cs(styles.item, index === activeTab && styles.active)}
            >
              <Label>{item}</Label>
            </Label>
          ))}
        </View>
      </ScrollView>
      <Map
        scale={config.scale}
        className={styles.map}
        latitude={DEFAULT_LATITUDE}
        longitude={DEFAULT_LONGITUDE}
        onError={console.log}
        markers={config.data as MapProps.marker[]}
        includePoints={config.data}
        show-location
        enable-overlooking
        enable-3D
        onMarkerTap={onMarkerTap}
      ></Map>
      <ScrollView scrollY className={styles.list} scrollTop={passiveSelectIndex * 50}>
        {config.data.map((item, index) => (
          <View
            key={index}
            className={cs(styles.item, selectIndex === index && styles.active)}
            onClick={() => setSelectIndex(selectIndex === index ? -1 : index)}
          >
            <Label>{item.name}</Label>
          </View>
        ))}
      </ScrollView>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
