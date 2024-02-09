import "./styles/global.scss";

import { useError, useLaunch, usePageNotFound } from "@tarojs/taro";
import type { FC } from "react";

import { ErrorBoundary } from "./components/error";
import { App as AppAPI } from "./utils/app";
import { Nav } from "./utils/nav";
import { Report } from "./utils/report";
import { Toast } from "./utils/toast";

const App: FC = ({ children }) => {
  useLaunch(() => {
    AppAPI.update();
    AppAPI.init();
  });

  usePageNotFound(() => {
    Nav.launch("pages/app/404/index");
  });

  useError(err => {
    // 避免无限递归调用
    try {
      Report.error(err);
      console.log(err);
      Toast.info("发生内部错误: \r\n" + err);
    } catch (e) {
      console.log(e);
    }
  });

  // `children`是将要会渲染的页面
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default App;
