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
  cookiePrefix: "hz_m_simple_",
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
  }
};

module.exports = {
  development: {
    ...base,
    host: "127.0.0.1",
    wx_debug: false,
    server: "http://192.168.100.127:8080"
  },
  production: {
    ...base,
    host: "0.0.0.0",
    server: "http://192.168.100.127:8080"
  }
}[process.env.NODE_ENV || "development"];
