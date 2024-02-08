export default defineAppConfig({
  pages: ["pages/index/tips/index", "pages/app/404/index", "pages/app/webview/index"],
  window: {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "山科小站",
    navigationBarBackgroundColor: "#F1F1F1",
    backgroundColor: "#F8F8F8",
  },
  tabBar: {
    color: "#aaa",
    selectedColor: "#8A8A8A",
    backgroundColor: "#F7F7FA",
    list: [
      {
        iconPath: "./static/index.png",
        selectedIconPath: "./static/index-active.png",
        pagePath: "pages/index/tips/index",
        text: "首页",
      },
      {
        iconPath: "./static/func.png",
        selectedIconPath: "./static/func-active.png",
        pagePath: "pages/index/tips/index",
        text: "功能",
      },
      {
        iconPath: "./static/news.png",
        selectedIconPath: "./static/news-active.png",
        pagePath: "pages/index/tips/index",
        text: "强智",
      },
      {
        iconPath: "./static/user.png",
        selectedIconPath: "./static/user-active.png",
        pagePath: "pages/index/tips/index",
        text: "用户",
      },
    ],
  },
});
