import { Input, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useRef, useState } from "react";

import { Layout } from "@/components/layout";
import { Loading } from "@/components/loading";
import { LOADING_STATE } from "@/components/loading/constant";
import { Toast } from "@/utils/toast";

import styles from "./index.module.scss";
import { type Course, requestCourse } from "./model";

export default function Index() {
  const page = useRef(1);
  const [loaded, setLoaded] = useState(false);
  const [className, setClassName] = useState("");
  const [data, setData] = useState<Course[]>([]);
  const [teacherName, setTeacherName] = useState("");
  const [loadingType, setLoadingType] = useState<string>(LOADING_STATE.LOADING_MORE);

  const loadCourse = (reset?: boolean) => {
    if (!className && !teacherName) {
      Toast.info("请至少输入一个搜索项");
      return void 0;
    }
    setLoadingType(LOADING_STATE.LOADING);
    requestCourse(page.current, className, teacherName).then(res => {
      setData(reset ? res : [...data, ...res]);
      if (res.length < 10) {
        setLoadingType(LOADING_STATE.NO_MORE);
      } else {
        setLoadingType(LOADING_STATE.LOADING_MORE);
      }
      setLoaded(true);
    });
  };

  const loadNextPage = () => {
    page.current++;
    loadCourse();
  };

  const onConfirm = () => {
    page.current = 1;
    loadCourse(true);
  };

  return (
    <React.Fragment>
      <Layout>
        <View className="a-input-con-line a-lmb">
          <View className="a-label">课程名:</View>
          <Input
            value={className}
            onInput={e => setClassName(e.detail.value)}
            className="a-input"
            placeholder="请输入(可选)"
          />
        </View>
        <View className="a-input-con-line a-lmb">
          <View className="a-label">教师名:</View>
          <Input
            value={teacherName}
            onInput={e => setTeacherName(e.detail.value)}
            className="a-input"
            placeholder="请输入(可选)"
          />
        </View>
        <View className="a-btn a-btn-blue a-btn-large x-full" onClick={onConfirm}>
          确定
        </View>
      </Layout>

      {loaded && (
        <View>
          {data.map((item, index) => (
            <View key={index} className={styles.classContainer}>
              <Layout>
                <View className="a-flex-space-between">
                  <View>
                    <View className={styles.className}>{item.class_name}</View>
                    <View className="a-lmt">{item.teacher}</View>
                    <View className="a-flex a-lmt">
                      <View>第{item.classWeek}周</View>
                      <View className="a-lml">{item.week}</View>
                      <View className="a-lml">第{item.start}</View>
                    </View>
                  </View>
                  <View className="y-center">
                    <View className={cs("x-center", styles.right)}>
                      <View className={styles.classRoom}>{item.classroom}</View>
                      <View className="a-lmt">{item.date_start}</View>
                    </View>
                  </View>
                </View>
              </Layout>
            </View>
          ))}
          <Loading className={styles.loading} state={loadingType} onClick={loadNextPage}></Loading>
        </View>
      )}

      <Layout>
        <View className="tips-con">
          <View>提示：</View>
          <View>1. 该数据不能保持实时更新，所以信息仅供参考。</View>
          <View>2. 数据为根据课程信息整理，某些课程信息收录不全。</View>
          <View>3. 当一门课同时有两位老师授课时，不作检索。</View>
        </View>
      </Layout>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
