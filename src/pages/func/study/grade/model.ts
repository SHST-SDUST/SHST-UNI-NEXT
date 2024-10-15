import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type QueryTerms = { show: string; value: string }[];

export type GradeType = {
  kcmc: string;
  kclbmc: string;
  ksxzmc: string;
  zcj: string;
  xf: number;
};

export const INIT_QUERY_TERMS: QueryTerms = [
  { show: "", value: "" },
  { show: "请稍后", value: "" },
];

export const requestForGrade = (term: string): Promise<GradeType[] | null> => {
  const query = term === "" ? "" : "/" + term;
  return HTTP.request<{ data: GradeType[] }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/sw/grade" + query,
  }).then(res => {
    const data = res.data.data;
    if (!data || !data[0]) return [];
    if (res.data.data) return res.data.data;
    return null;
  });
};
