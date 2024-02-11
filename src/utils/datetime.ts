import { DateTime as DT } from "laser-utils";

export class DateTime extends DT {
  public nextDay() {
    const date = new Date(this.getTime());
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    return new DateTime(date);
  }

  public nextHour() {
    const date = new Date(this.getTime());
    date.setHours(date.getHours() + 1);
    date.setMinutes(0, 0, 0);
    return new DateTime(date);
  }
}
