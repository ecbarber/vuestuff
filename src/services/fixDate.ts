import dayjs from "dayjs";

export function fixDate(theDate: Date): string {
  return dayjs(theDate.toString()).format("YYYY-MM-DDTHH:mm") as string;
}
