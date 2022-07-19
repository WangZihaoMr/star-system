// 引入格式化日期插件
import dayjs from "dayjs";

const format = (time = "", format = "YYYY-MM-DD") => {
  return dayjs(time).format(format);
};

export default format;
