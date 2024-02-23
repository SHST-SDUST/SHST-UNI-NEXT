import type { CommonEventFunction, PickerSelectorProps } from "@tarojs/components";
import { Picker, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useState } from "react";

import { Banner } from "@/components/banner";
import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { App } from "@/utils/app";
import { Toast } from "@/utils/toast";

import styles from "./index.module.scss";
import { type GradeType, INIT_QUERY_TERMS, type QueryTerms, requestForGrade } from "./model";

export default function Index() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState<number>(1);
  const [point, setPoint] = useState<number>(0);
  const [pointN, setPointN] = useState<string>("0");
  const [pointW, setPointW] = useState<string>("0");
  const [data, setData] = useState<GradeType[]>([]);
  const [terms, setTerms] = useState<QueryTerms>(INIT_QUERY_TERMS);

  const initQueryTerms = () => {
    const year = parseInt(App.data.curTerm.split("-")[1]);
    const group: QueryTerms = [{ show: "全部学期", value: "" }];
    for (let i = 1; i <= 4; ++i) {
      const firstTerm = year - i + "-" + (year - i + 1) + "-2";
      const secondTerm = year - i + "-" + (year - i + 1) + "-1";
      if (firstTerm <= App.data.curTerm) {
        group.push({ show: firstTerm, value: firstTerm });
      }
      if (secondTerm <= App.data.curTerm) {
        group.push({ show: secondTerm, value: secondTerm });
      }
    }
    setTerms(group);
  };

  const getRemoteGrade = (term: string, title?: string) => {
    setText(title || term);
    requestForGrade(term).then(res => {
      if (!res) {
        Toast.info("加载失败，请重试");
        return void 0;
      }
      let tmpPoint = 0;
      let tmpPointN = 0;
      let tmpPointW = 0;
      let n = 0;
      res.forEach(value => {
        if (value.kclbmc !== "公选") {
          n++;
          tmpPoint = tmpPoint + value.xf;
          if (value.zcj === "优") {
            tmpPointN = tmpPointN + 4.5;
            tmpPointW += 4.5 * value.xf;
          } else if (value.zcj === "良") {
            tmpPointN = tmpPointN + 3.5;
            tmpPointW += 3.5 * value.xf;
          } else if (value.zcj === "中") {
            tmpPointN = tmpPointN + 2.5;
            tmpPointW += 2.5 * value.xf;
          } else if (value.zcj === "及格") {
            tmpPointN = tmpPointN + 1.5;
            tmpPointW += 1.5 * value.xf;
          } else if (value.zcj === "不及格") {
            // do nothing
          } else {
            const s = parseInt(value.zcj);
            if (s >= 60) {
              tmpPointN = tmpPointN + (s - 50) / 10;
              tmpPointW = tmpPointW + ((s - 50) / 10) * value.xf;
            }
          }
        }
      });
      setPoint(tmpPoint);
      setPointN(n === 0 ? "0" : (tmpPointN / n).toFixed(2));
      setPointW(tmpPoint === 0 ? "0" : (tmpPointW / tmpPoint).toFixed(2));
      const defaultValue = {
        kclbmc: "暂无",
        kcmc: term + "学期暂无成绩",
        ksxzmc: "暂无成绩",
        xf: 0,
        zcj: "100",
      };
      const list = !res.length ? [defaultValue] : res;
      setData(list);
    });
  };

  useOnLoadEffect(() => {
    initQueryTerms();
    getRemoteGrade(App.data.curTerm);
  });

  const onPickChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    const current = e.detail.value as number;
    setIndex(current);
    getRemoteGrade(terms[current].value, terms[current].show);
  };

  return (
    <React.Fragment>
      <Layout title="查成绩">
        <View className={styles.selector}>
          <View>请选择学期</View>
          <Picker
            value={index}
            range={terms}
            className="a-link"
            range-key="show"
            onChange={onPickChange}
          >
            <View>{terms[index].show}</View>
          </Picker>
        </View>
      </Layout>

      {data.length > 0 && (
        <React.Fragment>
          <Banner title={text}>
            <View className="y-center a-fontsize-13 a-flex-wrap">
              <View className={cs("y-center", styles.overview)}>
                <Dot background="#6495ed"></Dot>
                <View>学分:{point}</View>
              </View>
              <View className={cs("y-center", styles.overview)}>
                <Dot background="#aca4d5"></Dot>
                <View>绩点:{pointN}</View>
              </View>
              <View className={cs("y-center", styles.overview)}>
                <Dot background="#eaa78c"></Dot>
                <View>加权:{pointW}</View>
              </View>
            </View>
          </Banner>
          <View className="a-lmt"></View>
          {data.map((item, key) => (
            <Layout key={key}>
              <View className={cs(styles.gradeItem, "adapt")}>
                <View className={styles.left}>
                  <View className={styles.name}>{item.kcmc}</View>
                  <View className={styles.minor}>{item.kclbmc}</View>
                  <View className={styles.minor}>{item.ksxzmc}</View>
                </View>
                <View className={styles.right}>
                  <View className={styles.grade}>{item.zcj}</View>
                  <View className={cs(styles.minor, "a-mt")}>{item.xf}学分</View>
                </View>
              </View>
            </Layout>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
