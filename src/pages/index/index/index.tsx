import { Button, Image, Navigator, RichText, Swiper, SwiperItem, View } from "@tarojs/components";
import { cs, DateTime } from "laser-utils";
import React, { useState } from "react";

import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { OneSentence } from "@/components/one-sentence";
import { Weather } from "@/components/weather";
import { PATH } from "@/config/page";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { App } from "@/utils/app";
import { Nav } from "@/utils/nav";

import styles from "./index.module.scss";
import type { SwiperItemType } from "./model";

const NOW = new DateTime().format("yyyy-MM-dd K");

export default function Index() {
  const [swiper, setSwiper] = useState<SwiperItemType[]>([]);
  const [post, setPost] = useState("");
  const [postUrl, setPostUrl] = useState("");

  const onInit = () => {
    setSwiper(App.data.initData.ads);
    setPost(App.data.initData.articalName);
    setPostUrl(App.data.initData.articleUrl);
  };
  useOnLoadEffect(onInit);

  return (
    <React.Fragment>
      {/* `Banner` */}
      <Layout>
        <View className={styles.swiperContainer}>
          <Swiper indicatorDots interval={5000} duration={1000} autoplay circular>
            {swiper.map((item, index) => (
              <SwiperItem
                key={index}
                className="x-center y-center"
                onClick={() => Nav.webview(item.url)}
              >
                <Image className="x-full" mode="aspectFill" src={item.img} lazyLoad></Image>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </Layout>
      {/* 天气 */}
      <Layout
        topSpace
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
      {/* 公告 */}
      <Layout title="系统公告">
        <View className={cs(styles.article, "text-ellipsis")} onClick={() => Nav.webview(postUrl)}>
          <Icon space type="gonggao" className="a-lmr" size={16}></Icon>
          <RichText className="a-link" nodes={post}></RichText>
        </View>
        <Navigator
          url={PATH.POST}
          open-type="navigate"
          className={cs(styles.article, "text-ellipsis")}
          hover-class="none"
        >
          <Icon space type="gonggao" className="a-lmr" size={16}></Icon>
          <text className="a-link">更多公告...</text>
        </Navigator>
      </Layout>
      {/* 每日一句 */}
      <Layout title="每日一句">
        <OneSentence></OneSentence>
      </Layout>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
