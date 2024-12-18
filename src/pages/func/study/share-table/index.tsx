import { Input, View } from "@tarojs/components";
import { useState } from "react";

import { Divider } from "@/components/divider";
import { Layout } from "@/components/layout";
import { TimeTable } from "@/components/time-table";
import type { TimeTableType } from "@/components/time-table/types";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { parseTimeTable } from "@/pages/plus/study/timetable/model";
import { App } from "@/utils/app";
import { Toast } from "@/utils/toast";

import styles from "./index.module.scss";
import {
  agreePeerRequest,
  cancelPeerRequest,
  liftingPeerRequest,
  refreshTimeTable,
  refusePeerRequest,
  requestForShareTable,
  type Response,
  startPeerRequest,
} from "./model";

export default function Index() {
  const [status, setStatus] = useState(-1);
  const [account, setAccount] = useState("");
  const [data, setData] = useState<Response>();
  const [table, setTable] = useState<TimeTableType>([]);
  const [week, setWeek] = useState(1);
  const [termStart, setTermStart] = useState(App.data.curTermStart);

  const getData = () => {
    requestForShareTable().then(res => {
      if (!res) {
        Toast.info("加载失败，请重试");
        return void 0;
      }
      if (res.succ) {
        const t1 = parseTimeTable(res.succ.timetable1 || []);
        const t2 = parseTimeTable(res.succ.timetable2 || []);
        t1.forEach(item => (item.className = "(TA)" + item.className));
        const timeTable = t1.concat(t2);
        setWeek(App.data.curWeek);
        setTermStart(App.data.curTermStart);
        setTable(timeTable);
        refreshTimeTable();
      }
      setData(res);
      setStatus(res.status);
    });
  };
  useOnLoadEffect(getData);

  const onStartPeerRequest = () => {
    if (account === "") {
      Toast.info("请输入完整信息");
      return void 0;
    }
    startPeerRequest(account).then(getData);
  };

  const onCancelPeerRequest = () => {
    cancelPeerRequest().then(getData);
  };

  const onAgreePeerRequest = (id: string) => {
    agreePeerRequest(id).then(getData);
  };

  const onRefusePeerRequest = (id: string) => {
    refusePeerRequest(id).then(getData);
  };

  const onLiftingPeerRequest = (id: string) => {
    liftingPeerRequest(id).then(getData);
  };

  return (
    <View className={styles.container}>
      <Layout title="共享课表">
        {/* 1 默认状态 */}
        {status === 1 && (
          <View className="x-center a-flex-warp">
            <View className="x-center a-flex-column">
              <Input
                value={account}
                onInput={e => setAccount(e.detail.value)}
                className="a-input"
                placeholder="对方学号"
                type="number"
              />
              <View className="a-btn a-btn-blue a-btn-large" onClick={onStartPeerRequest}>
                发起请求
              </View>
            </View>
          </View>
        )}
        {/* 2 发起请求状态 */}
        {status === 2 && data && data.pair_user && (
          <View className="x-center a-flex-warp">
            <View className="y-center">
              <View>{data.pair_user[0]}</View>
              <View className="a-ml">{data.pair_user[1]}</View>
              <View className="a-btn a-btn-blue a-btn-small" onClick={onCancelPeerRequest}>
                撤销请求
              </View>
            </View>
          </View>
        )}
        {/* 0 成功状态 */}
        {status !== 0 && <Divider margin={3}></Divider>}
        {/* !0 非成功状态 */}
        {status !== 0 && data && data.data && (
          <View className="x-center a-flex-warp">
            {data.data.map((item, key) => (
              <View key={key} className="y-center">
                <View>{item.account}</View>
                <View
                  className="a-btn a-btn-blue a-btn-small"
                  onClick={() => onAgreePeerRequest(item.id)}
                >
                  同意
                </View>
                <View
                  className="a-btn a-btn-blue a-btn-small"
                  onClick={() => onRefusePeerRequest(item.id)}
                >
                  拒绝
                </View>
              </View>
            ))}
          </View>
        )}
        {status === 0 && (
          <TimeTable week={week} termStart={termStart} timeTable={table}></TimeTable>
        )}
        {status === 0 && data && data.user && data.succ && (
          <View className="y-center">
            <View>{data.user} -</View>
            <View>{data.succ.pair}</View>
            <View
              className="a-btn a-btn-blue a-btn-small"
              onClick={() => onLiftingPeerRequest(data.succ.id)}
            >
              解除关系
            </View>
          </View>
        )}
      </Layout>
      {status === 1 && (
        <Layout title="Tips">
          <View className="tips-con">
            1.向对方发起请求，对方通过后，你们将能够在此看到自己与对方的课表
          </View>
          <View className="tips-con">
            2.双方必须要在建立联系后打开过共享课表，并再次刷新后才可以看到对方的课表
          </View>
        </Layout>
      )}
    </View>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
