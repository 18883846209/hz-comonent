/* eslint no-undef: "error" */
/* eslint-env browser */
import moment from "moment";

export function getDpr(url, ext = ".png") {
  const win = typeof window !== "undefined";
  const dpr = win && win.devicePixelRatio <= 2 ? "@2x" : "@3x";
  return `/static/images/${url + dpr + ext}`;
}

export function pxToRem(px) {
  return `${px / 100}rem`;
}

export function getImg(require1, require2) {
  if (typeof window !== "undefined" && window.devicePixelRatio > 2) {
    return require2;
  }
  return require1;
}

function stopTouch(e) {
  e.preventDefault();
}

export function toggleContainerTouchAction(v) {
  const dom = document.body;
  if (!dom) {
    return;
  }

  if (v) {
    dom.addEventListener("touchmove", stopTouch, {
      passive: false,
      capture: true
    });
  } else {
    dom.removeEventListener("touchmove", stopTouch, { capture: true });
  }
  dom.style["touch-action"] = v ? "none" : "auto";
}

export function dataURLtoFile(dataurl, filename = "fileName") {
  try {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const suffix = mime.split("/")[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `${filename}.${suffix}`, { type: mime });
  } finally {
    // empty
  }
}

// 判断微信中ios 、android
export function isBrowser() {
  const userAgent = window.navigator.userAgent;
  const isAndroid = userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1; // android终端
  const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isAndroid) {
    // console.dir("是在安卓手机的微信浏览器里");
    return "android";
  } else if (isiOS) {
    // console.dir("是在ios手机里的微信浏览器里");
    return "ios";
  }
  return "";
}

// value:可传时间戳/时间格式的字符串  isStringTime:默认是false，代表是时间戳；穿true时间格式的字符串
export const getCalculateTime = (value, isStringTime = false, needTranslate = true) => {
  const time = isStringTime
    ? (new Date().getTime() - moment(value, "YYYY-MM-DD HH:mm:ss").valueOf()) / 1000
    : (new Date().getTime() - value) / 1000;
  if (!needTranslate) return moment(Number(value)).format("YYYY-MM-DD HH:mm:ss");
  // 当天日期
  const today = moment(new Date().getTime()).format("YYYY-MM-DD");
  // 前一天的日期
  const preDate = new Date().getTime() - 24 * 60 * 60 * 1000;
  const preDateTime = moment(parseInt(preDate)).format("YYYY-MM-DD");
  // 当年
  const today_year = moment(new Date().getTime()).format("YYYY");
  // 获取日期年份
  const getTimeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
  const getTime_year = moment(parseInt(getTimeValue)).format("YYYY");
  // 获取的时间日期
  const getTime = moment(parseInt(getTimeValue)).format("YYYY-MM-DD");
  if (time < 1) {
    return "刚刚";
  } else if (time >= 1 && time < 30) {
    return `${time}秒以前`;
  } else if (time >= 30 && time < 60) {
    return "半分钟前";
  } else if (time >= 60 && time < 60 * 60) {
    const min = parseInt(time / 60);
    return `${min}分钟以前`;
  } else if (time >= 60 * 60 && today == getTime) {
    const timeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
    const now = moment(parseInt(timeValue)).format("HH:mm");
    return `今天 ${now}`;
  } else if (time >= 60 * 60 && preDateTime == getTime) {
    const timeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
    const now = moment(parseInt(timeValue)).format("HH:mm");
    return `昨天 ${now}`;
  } else if (getTime_year == today_year) {
    const timeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
    const now = moment(parseInt(timeValue)).format("MM-DD HH:mm");
    return now;
  }
  const timeValue = isStringTime ? moment(value, "YYYY-MM-DD HH:mm:ss").valueOf() : value;
  const now = moment(parseInt(timeValue)).format("YYYY-MM-DD HH:mm");
  return now;
};
