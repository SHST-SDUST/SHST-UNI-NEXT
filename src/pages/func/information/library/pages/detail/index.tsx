import { Image, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useState } from "react";

import { Layout } from "@/components/layout";
import { useOnLoad } from "@/hooks/use-onload";
import { App } from "@/utils/app";
import { RegExec } from "@/utils/regex";

import type { BookType } from "../../model";
import styles from "./index.module.scss";
import type { BookDetail } from "./model";
import { requestForBookDetail } from "./model";

export default function Index() {
  const [book, setBook] = useState<BookType | null>(null);
  const [detail, setDetail] = useState<BookDetail | null>(null);

  useOnLoad(e => {
    const bookTmp = App.data.tmp.book as BookType;
    const id = e.id;
    if (!bookTmp || !id) return void 0;
    App.data.tmp.book = null;
    setBook(bookTmp);
    requestForBookDetail(id).then(res => {
      if (!res) return void 0;
      const name = RegExec.match(/<h2>(.*?)<\/h2>/g, res)[0];
      const info: string[] = [];
      RegExec.match(/<tr><td>([\S]*?)<\/?td><\/tr>/g, res).forEach(value => info.push(value));
      const liBookInfo = RegExec.match(/<ul data-role="listview">[\s\S]*?<\/ul>/g, res)[0];
      const storage = RegExec.match(/<p.*?>(.*?)<\/p>/g, liBookInfo);
      setDetail({ name, info, storage });
    });
  });

  return (
    <React.Fragment>
      {book && (
        <Layout title="图书信息">
          <view className="y-center">
            <View className={cs(styles.img, "a-lmr a-flex-none")}>
              <Image className={cs(styles.img, "x-center y-center")} src={book.img}></Image>
            </View>
            <View className="tips-con">
              {detail && (
                <>
                  <View className="a-fontsize-16">{detail.name?.replace(/^标题: /, "") || ""}</View>
                  <View className="a-color-grey a-mt-6">{detail.info[0]}</View>
                  <View className="a-color-grey a-mt-6">{detail.info[1]}</View>
                  <View className="a-color-grey a-mt-6">{detail.info[2]}</View>
                </>
              )}
            </View>
          </view>
        </Layout>
      )}
      {detail && (
        <Layout topSpace title="馆藏信息">
          <View className="tips-con">
            {detail.storage.map((item, index) => (
              <View key={index}>
                {index % 5 === 0 && index !== 0 && <view className="a-gap-15"></view>}
                <View>{item}</View>
              </View>
            ))}
          </View>
        </Layout>
      )}
    </React.Fragment>
  );
}
