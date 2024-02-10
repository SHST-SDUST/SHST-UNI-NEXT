import { Button, View } from "@tarojs/components";
import { cs, DateTime } from "laser-utils";
import React from "react";

import { Layout } from "@/components/layout";
import { Weather } from "@/components/weather";

import styles from "./index.module.scss";

const NOW = new DateTime().format("yyyy-MM-dd K");

export default function Index() {
  return (
    <React.Fragment>
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
