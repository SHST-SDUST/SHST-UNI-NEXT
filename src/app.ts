import "./styles/global.scss";

import { useLaunch } from "@tarojs/taro";
import { PropsWithChildren } from "react";

function App({ children }: PropsWithChildren<unknown>) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
