const envConfig = require("./client");

/**
 * 字段              含义               取值
 * log4js           日志记录            undefined -> 不记录, log -> 写成日志, console -> 控制台打印
 * port             端口号
 * token            后端接口临时长存token
 * api              后端接口地址
 * proxyUpload      重定向上传地址
 * ocrApi           orc地址
 */
const base = {
  ...envConfig,
  port: "3000",
  log4js: "",
  proxyUpload: "",
  wx_Secret: "",
  amapApiWeb: "",
  token: "",
  ocrApi: "http://192.168.111.114:8081"
};

module.exports = {
  development: {
    ...base,
    api: "http://192.168.111.142:8908"
  },
  production: {
    ...base,
    log4js: "log",
    api: "http://192.168.111.142:8908"
  }
}[process.env.NODE_ENV || "development"];
