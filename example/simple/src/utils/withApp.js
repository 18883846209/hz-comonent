import getConfig from "next/config";

import { isBrowser } from "./utils";

const { publicRuntimeConfig } = getConfig();

// 注册事件
export function register(name, fn) {
  if (typeof name !== "string") {
    return new Error("First param must be a string.");
  } else if (typeof fn !== "function") {
    return new Error("Second param must be a function.");
  } else if (typeof window === "undefined") {
    return new Error("Please place the registration method in the customer service life cycle.");
  }
  if (typeof window[publicRuntimeConfig.appConfig.callName] !== "object") {
    window[publicRuntimeConfig.appConfig.callName] = {};
  }
  if (!window[publicRuntimeConfig.appConfig.callName][name]) {
    window[publicRuntimeConfig.appConfig.callName][name] = fn;
  }
}

// 触发事件
export function trigger(name, param) {
  if (typeof window === "undefined") {
    return new Error("Please place the registration method in the customer service life cycle.");
  }
  const browser = isBrowser();
  try {
    if (typeof param !== "string") {
      param = JSON.stringify(param);
    }
    if (browser === "android") {
      window[publicRuntimeConfig.appConfig.callAndroid][name](param);
    } else if (browser === "ios") {
      window.webkit.messageHandlers[name].postMessage(param);
    }
  } catch (e) {
    // eslint-disable-next-line
    console.trace(e);
  }
}
