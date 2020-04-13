/* eslint no-undef: "error" */
/* eslint-env browser */

import { stringify } from "qs";
import getConfig from "next/config";
require("isomorphic-unfetch");

import { getCookie } from "@/utils/cookie";

const { publicRuntimeConfig } = getConfig();

// 解析返回数据
function parseResponse(response) {
  const resType = response.headers.get("content-type");
  if (resType.includes("json")) {
    return response.json();
  }

  if (resType.includes("text")) {
    return response.text();
  }

  if (resType.includes("jpg" || resType.includes("mp3"))) {
    return response.blob();
  }

  throw new Error("请定义返回数据类型");
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return modelResponse(parseResponse(response));
  }
  return response;
}

const initOptions = {
  // 跨域设置 cors, no-cors, same-origin, navigate
  // mode: "cors",
  credentials: "include"
};

function getHeaders() {
  return {
    token: getCookie("token") || publicRuntimeConfig.token,
    "Content-Type": "application/json;charset=UTF-8"
  };
}

export default function request(url, options = {}) {
  options.method = options.method ? options.method.toUpperCase() : "GET";

  if (options.method === "GET" && typeof options.body === "object") {
    url = `${url}?${stringify(options.body)}`;
    delete options.body;
  }

  options.headers = {
    ...getHeaders(),
    ...options.headers
  };

  if (typeof options.body === "object") {
    options.body = JSON.stringify(options.body);
  }

  const newOptions = {
    ...initOptions,
    ...options
  };

  return fetch(url, newOptions)
    .then(checkStatus)
    .catch(error => {
      throw error;
    });
}

// hz java 接口处理
export function modelResponse(response = {}) {
  const sendMsg = {
    isSuccess: false,
    msg: "",
    res: {}
  };

  const { OK_CODE } = publicRuntimeConfig;
  if (!response.code || response.code.slice(-4) !== OK_CODE) {
    sendMsg.isSuccess = false;
    sendMsg.msg = response.message || "请求失败";
  } else {
    sendMsg.res = response.data;
    sendMsg.isSuccess = true;
    sendMsg.msg = "操作成功";
  }
  return sendMsg;
}

/**
 * extendCode 自定义成功的状态码
 */
export function modelResponseExtend(response = {}, extendCode) {
  const sendMsg = {
    isSuccess: false,
    msg: "",
    res: {}
  };

  const { OK_CODE } = publicRuntimeConfig;
  if ((!response.code || response.code.slice(-4) !== OK_CODE) && response.code !== extendCode) {
    sendMsg.isSuccess = false;
    sendMsg.msg = response.message;
  } else {
    sendMsg.res = response.data;
    sendMsg.isSuccess = true;
    sendMsg.msg = response.message;
    sendMsg.extendCode = response.code;
  }
  return sendMsg;
}

// nodejs 接口处理
export function modelResponseNode(response = {}) {
  const sendMsg = {
    isSuccess: false,
    msg: "",
    res: {}
  };

  if (response.success !== true) {
    sendMsg.isSuccess = false;
    sendMsg.msg = response.message;
  } else {
    sendMsg.res = response.data;
    sendMsg.isSuccess = true;
    sendMsg.msg = "操作成功";
  }
  return sendMsg;
}
