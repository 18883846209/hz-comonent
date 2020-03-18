/**
 * 字段                     含义               取值
 * cookiePrefix             cookie前缀
 * localStoragePrefix       localStorage前缀
 * OK_CODE                  请求api成功code
 * staticUrl                静态资源地址
 * host                     本机地址
 * cdn                      cdn地址
 * wx_debug                 wx_debug模式
 * wx_AppID                 wx_AppID
 * amapWeb                  高德web组件token
 * uploadUrl                上传地址
 */
const base = {
  title: "重庆公安入渝人车码",
  cookiePrefix: "hz_",
  localStoragePrefix: "hz_m_simple_",
  OK_CODE: "0000",
  staticUrl: "",
  cdn: "",
  // uploadUrl: "http://222.177.11.1:8909",
  wx_AppID: "wxd05feefd9af32068",
  amapWeb: "acdaf810fa83112bd91bab13d4f0d58b",
  version: "2.6.1",
  ocr_options: {
    username: "test",
    signdata: "NULL"
  }
};

module.exports = {
  development: {
    ...base,
    host: "127.0.0.1",
    wx_debug: false
    // api: "http://192.168.111.16:8928"
  },
  production: {
    ...base,
    host: "0.0.0.0"
    // api: "http://192.168.111.16:8928"
  }
}[process.env.NODE_ENV || "development"];
