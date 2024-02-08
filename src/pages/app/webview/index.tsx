import { WebView as AppWebView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { type FC, useState } from "react";

const WebView: FC<{
  url: string;
}> = props => {
  const [src, setSrc] = useState("");

  useLoad(options => {
    props.url && setSrc(decodeURIComponent(options.url));
  });

  return src ? <AppWebView src={src} /> : null;
};

export default WebView;
