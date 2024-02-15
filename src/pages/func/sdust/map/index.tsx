import { Image, Map, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";

import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { Preview } from "@/utils/preview";

import { MAP_IMG } from "./constant";
import styles from "./index.module.scss";

export default function Index() {
  const [longitude, setLongitude] = useState(120.12487);
  const [latitude, setLatitude] = useState(35.9994);
  const [msg, setMsg] = useState("定位中");
  const [dot, setDot] = useState("#FFB800");

  useEffect(() => {
    Taro.getLocation({
      type: "gcj02", // gcj02 wgs84
      // altitude: true, //高精度定位
      success: res => {
        setLongitude(res.longitude);
        setLatitude(res.latitude);
        setMsg("定位成功");
        setDot("#009688");
      },
      fail: () => {
        setMsg("定位失败");
        setDot("#FF5722");
      },
    });
  }, []);

  return (
    <React.Fragment>
      <Layout title="嵙地图" topSpace>
        <View style={{ position: "relative" }}>
          <Image
            src={MAP_IMG}
            className={styles.card}
            mode="widthFix"
            onClick={() => Preview.image(MAP_IMG)}
          ></Image>
          <View className={styles.from}>山东科技大学新闻媒体部制</View>
        </View>
      </Layout>

      <Layout title="在线地图" topSpace>
        <View className={styles.tips}>
          <Dot background={dot}></Dot>
          <View>{msg}</View>
          <View>{longitude.toFixed(6)}</View>
          <View>{latitude.toFixed(6)}</View>
        </View>
        <View className={styles.mapContainer}>
          <Map
            className={styles.card}
            longitude={longitude}
            latitude={latitude}
            enable-building
            onError={() => null}
            show-location
            show-scale
          ></Map>
        </View>
      </Layout>
    </React.Fragment>
  );
}
