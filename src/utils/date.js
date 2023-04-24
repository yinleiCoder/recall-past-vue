import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn"); // 全局使用简体中文

//https://dayjs.gitee.io/docs/zh-CN/parse/unix-timestamp-milliseconds
export function dateToRelative(dateStr) {
  return dayjs().to(dayjs(dateStr));
}
