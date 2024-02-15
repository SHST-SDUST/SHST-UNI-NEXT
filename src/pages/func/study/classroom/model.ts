import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

export type ClassRoomType = {
  jxl: string;
  jsList: { jsmc: string }[];
};

export const requestForClassRoom = (
  date: string,
  time: string,
  floor: string,
  campus: number
): Promise<ClassRoomType | null> => {
  return HTTP.request<{ data: ClassRoomType[] }>({
    load: 0,
    throttle: true,
    url: App.data.url + "/sw/classroom",
    data: {
      searchData: date,
      searchTime: time,
      searchFloor: floor,
      searchCampus: campus,
    },
  }).then(res => {
    const data = res.data.data;
    if (!data) {
      Toast.info("加载失败，请重试");
      return null;
    }
    // @ts-expect-error flag
    if (data.flag) {
      Toast.info("该日期不在教学周期内");
      return null;
    }
    let result = data[0];
    if (!result) {
      result = { jxl: floor + "号楼", jsList: [{ jsmc: "无空教室" }] };
    }
    result.jsList.sort((a, b) => (a.jsmc > b.jsmc ? 1 : -1));
    return result;
  });
};
