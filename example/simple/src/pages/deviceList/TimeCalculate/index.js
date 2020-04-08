import moment from "moment";

//value:可传时间戳/时间格式的字符串  isStringTime:默认是false，代表是时间戳；穿true时间格式的字符串
export const getCalculateTime = (value, isStringTime = false) => {
  const time = isStringTime ? 
  (new Date().getTime() - moment(value, "YYYY-MM-DD HH:mm:ss").valueOf()) / 1000
  :
  (new Date().getTime() - value) / 1000;
  //当天日期
  const today = moment(new Date().getTime()).format("YYYY-MM-DD");
  //前一天的日期
  const preDate = new Date().getTime() - 24 * 60 * 60 * 1000;
  let preDateTime = moment(parseInt(preDate)).format("YYYY-MM-DD");
  //当年
  const today_year = moment(new Date().getTime()).format("YYYY");
  //获取日期年份
  const getTimeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
  let getTime_year = moment(parseInt(getTimeValue)).format("YYYY");
  //获取的时间日期
  let getTime = moment(parseInt(getTimeValue)).format("YYYY-MM-DD");
  if (time < 1) {
    return "刚刚";
  } else if (time >= 1 && time < 30) {
    return `${time}秒以前`;
  } else if (time >= 30 && time < 60) {
    return "半分钟前";
  } else if (time >= 60 && time < 60 * 60) {
    let min = parseInt(time / 60);
    return `${min}分钟以前`;
  } else if (time >= 60 * 60 && today == getTime) {
    let timeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
    let now = moment(parseInt(timeValue)).format("HH:mm");
    return `今天 ${now}`;
  } else if (time >= 60 * 60 && preDateTime == getTime) {
    let timeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
    let now = moment(parseInt(timeValue)).format("HH:mm");
    return `昨天 ${now}`;
  } else if (getTime_year == today_year) {
    let timeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
    let now = moment(parseInt(timeValue)).format("MM-DD HH:mm");
    return now;
  } else {
    let timeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
    let now = moment(parseInt(timeValue)).format("YYYY-MM-DD HH:mm");
    return now;
  }
};
