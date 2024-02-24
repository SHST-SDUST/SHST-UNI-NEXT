import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useEffect, useState } from "react";

import { Layout } from "@/components/layout";
import { Clipboard } from "@/utils/clipboard";

import styles from "./index.module.scss";
import { type HyperLinkType, requestForHyperLink } from "./model";

export default function Index() {
  const [urls, setUrls] = useState<HyperLinkType[]>([]);

  useEffect(() => {
    requestForHyperLink().then(res => {
      res && setUrls(res);
    });
  }, []);

  return (
    <React.Fragment>
      <Layout title="常用链接">
        {urls.map((item, index) => (
          <View key={index}>
            <view className={cs("a-flex", styles.line)}>
              <view>{item.name}：</view>
              <view className="a-link" onClick={() => Clipboard.copy(item.url)}>
                {item.url}
              </view>
            </view>
          </View>
        ))}
      </Layout>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
