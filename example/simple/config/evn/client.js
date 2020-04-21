/**
 * 字段                      含义               取值
 * cookiePrefix             cookie前缀
 * localStoragePrefix       localStorage前缀
 * OK_CODE                  请求api成功code
 * host                     本机地址
 * cdn                      cdn地址
 * wx_debug                 wx_debug模式
 * wx_AppID                 wx_AppID
 * amapWeb                  高德web组件token
 * uploadUrl                上传地址
 * ocr_options              ocr配置
 */
const base = {
  title: "hz-react-m-simple",
  cookiePrefix: "",
  localStoragePrefix: "hz_m_simple_",
  OK_CODE: "0000",
  cdn: "",
  subsystem: "",
  // uploadUrl: "http://222.177.11.1:8909",
  wx_AppID: "",
  amapWeb: "",
  version: "1.0.0",
  ocr_options: {
    username: "test",
    signdata: "NULL"
  },
  appConfig: {
    callName: "hzAppCallFn",
    callAndroid: "android"
  },
  server: "http://192.168.111.231:8080",
  websocket: "http://192.168.111.231:8080",
  settings: [
    { key: "homeTopBg", value: 1, desc: "首页背景图片" },
    {
      key: "Portra",
      value: JSON.stringify({
        name: "人像布控",
        enName: "Portra",
        icon: 1
      }),
      desc: "首页人像布控模块"
    },
    {
      key: "Alarm",
      value: JSON.stringify({
        name: "告警",
        enName: "Alarm",
        icon: 1
      }),
      desc: "首页告警模块"
    }
  ]
};

module.exports = {
  development: {
    ...base,
    host: "127.0.0.1",
    wx_debug: false
  },
  production: {
    ...base,
    host: "0.0.0.0"
  }
}[process.env.NODE_ENV || "development"];
