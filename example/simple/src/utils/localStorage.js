import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const prefix = publicRuntimeConfig.localStoragePrefix;

const separatorStr = `/@@/`;

export function deleteStore(key) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(`${prefix}${key}`);
  } catch (e) {
    throw e;
  }
}

/**
 * @param key
 * @param value 不传则表示删除
 * @param time  单位：秒
 */
export function setStore(key, value, time) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof value === "undefined") {
    deleteStore(key);
    return;
  }

  try {
    let str = "";
    if (typeof value === "object") {
      str = `${JSON.stringify(value)}`;
    } else {
      str = `${value}`;
    }

    const lastTime = time ? `${separatorStr}${Date.now() + time * 1000}` : "";

    window.localStorage.setItem(`${prefix}${key}`, `${str}${lastTime}`);
  } catch (e) {
    throw e;
  }
}

export function getStore(key) {
  if (typeof window === "undefined") {
    return;
  }

  let str = ``;
  try {
    str = window.localStorage.getItem(`${prefix}${key}`);
  } catch (e) {
    throw e;
  }

  if (str) {
    const arr = str.split(separatorStr);
    let value = arr[0];
    try {
      value = JSON.parse(arr[0]);
    } catch (e) {
      throw e;
    }

    const time = arr[1];
    if (time) {
      if (Date.now() <= +time) {
        return value;
      }
      deleteStore(key);
    }
    return value;
  }
}
