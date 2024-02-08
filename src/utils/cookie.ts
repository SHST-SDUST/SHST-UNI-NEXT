import { Storage } from "./storage";

export const Cookie = {
  get: (res: { header: { [key: string]: string } }): string => {
    let cookies = "";
    if (res && res.header) {
      for (const item in res.header) {
        if (item.toLowerCase() === "set-cookie") {
          const cookie = res.header[item].match(/.*?=.*?;/);
          cookies += cookie; // [] + "" = ""
        }
      }
      console.log("SetCookie:", cookies);
      Storage.setPromise("cookies", cookies);
    } else {
      console.log("Get Cookie From Cache");
      cookies = Storage.get("cookies") || "";
    }
    return cookies;
  },
};
