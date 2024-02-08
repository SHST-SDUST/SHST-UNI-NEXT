import Taro from "@tarojs/taro";

export const info = (msg: string, time = 2000, icon = "none", mask = false): Promise<string> => {
  Taro.showToast({
    title: msg,
    icon: icon as Required<Parameters<typeof Taro.showToast>>[0]["icon"],
    mask: mask,
    duration: time,
  });
  return new Promise(resolve => setTimeout(() => resolve(msg), time));
};

const confirm = (title: string, content: string): Promise<boolean> => {
  return new Promise<boolean>(resolve => {
    Taro.showModal({
      title,
      content,
      success: choice => {
        if (choice.confirm) resolve(true);
        else resolve(false);
      },
    });
  });
};

export const Toast = { info, confirm };
