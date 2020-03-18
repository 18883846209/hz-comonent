import Cookies from "js-cookie";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const prefix = publicRuntimeConfig.cookiePrefix;

export function setCookie(name, value, day = 0, options = {}) {
  Cookies.set(prefix + name, value, {
    expires: day,
    ...options
  });
}

export function getCookie(name, options = {}) {
  return Cookies.get(prefix + name, options);
}

export function removeCookie(name, options = {}) {
  Cookies.remove(prefix + name, options);
}
