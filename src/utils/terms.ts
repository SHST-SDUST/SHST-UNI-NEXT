import { App } from "./app";

/**
 * 生成学期数组
 */
export const generateTerms = (start = null, peak = null) => {
  const year = start || Number(App.data.curTerm.split("-")[1]);
  const limit = peak || App.data.curTerm;
  const years: { show: string; value: string }[] = [];
  for (let i = 1; i <= 4; ++i) {
    const firstTerm = year - i + "-" + (year - i + 1) + "-2";
    const secondTerm = year - i + "-" + (year - i + 1) + "-1";
    if (firstTerm <= limit) {
      years.push({ show: firstTerm, value: firstTerm });
    }
    if (secondTerm <= limit) {
      years.push({ show: secondTerm, value: secondTerm });
    }
  }
  return years;
};
