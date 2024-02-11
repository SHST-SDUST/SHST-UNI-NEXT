import { Button, Image, Swiper, SwiperItem, View } from "@tarojs/components";
import { cs, DateTime } from "laser-utils";
import React, { useEffect, useState } from "react";

import { Layout } from "@/components/layout";
import { Weather } from "@/components/weather";
import { useMemoizedFn } from "@/hooks/use-memoized-fn";
import { App } from "@/utils/app";

import styles from "./index.module.scss";
import type { SwiperItemType } from "./model";

const NOW = new DateTime().format("yyyy-MM-dd K");

export default function Index() {
  const [swiper, setSwiper] = useState<SwiperItemType[]>([]);

  const onInit = useMemoizedFn(() => {
    setSwiper(App.data.initData.ads);
  });

  useEffect(() => {
    App.onload(() => onInit());
  }, [onInit]);

  return (
    <React.Fragment>
      {/* `Banner` */}
      <Layout minTopSpace>
        <View className={styles.swiperContainer}>
          <Swiper indicatorDots interval={5000} duration={1000} autoplay circular>
            {swiper.map((item, index) => (
              <SwiperItem key={index} className="x-center y-center">
                <Image className="x-full" mode="aspectFill" src={item.img} lazyLoad></Image>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </Layout>
      {/* 天气 */}
      <Layout
        title={NOW}
        captainSlot={
          <View className={styles.yCenter}>
            <Button
              open-type="share"
              className={cs("shst-icon icon-fenxiang", styles.shareButton)}
            ></Button>
          </View>
        }
      >
        <Weather></Weather>
      </Layout>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
