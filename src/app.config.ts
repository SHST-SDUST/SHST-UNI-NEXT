import { PATH } from "./utils/constant";

export default defineAppConfig({
  pages: [...Object.values(PATH).map(path => path.slice(1))],
  window: {
    // @ts-expect-error color var
    navigationBarTextStyle: "@navigationBarTextStyle",
    navigationBarTitleText: "山科小站",
    navigationBarBackgroundColor: "@navigationBarBackgroundColor",
    backgroundColor: "@backgroundColor",
  },
  tabBar: {
    color: "@tabBarColor",
    selectedColor: "@tabBarSelectedColor",
    backgroundColor: "@backgroundColor",
    list: [
      {
        iconPath: "./static/index.png",
        selectedIconPath: "./static/index-active.png",
        pagePath: "pages/index/index/index",
        text: "首页",
      },
      {
        iconPath: "./static/func.png",
        selectedIconPath: "./static/func-active.png",
        pagePath: "pages/func/index/index",
        text: "功能",
      },
      {
        iconPath: "./static/sw.png",
        selectedIconPath: "./static/sw-active.png",
        pagePath: "pages/sw/index/index",
        text: "强智",
      },
      {
        iconPath: "./static/user.png",
        selectedIconPath: "./static/user-active.png",
        pagePath: "pages/user/index/index",
        text: "用户",
      },
    ],
  },
  darkmode: true,
  themeLocation: "config/theme.json",
});
