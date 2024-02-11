import { DateTime as DT } from "laser-utils";

export class DateTime extends DT {
  public nextDay(n = 1) {
    const date = new Date(this.getTime());
    date.setDate(date.getDate() + n);
    date.setHours(0, 0, 0, 0);
    return new DateTime(date);
  }

  public nextHour(n = 1) {
    const date = new Date(this.getTime());
    date.setHours(date.getHours() + n);
    date.setMinutes(0, 0, 0);
    return new DateTime(date);
  }
}
