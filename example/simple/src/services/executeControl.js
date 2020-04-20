import globalConfig from "@/utils/getConfig";
import request from "../utils/request";

const { server = "" } = globalConfig;

/** 查询布控列表 */
export async function getExecuteList(params = {}) {
  return request(`${server}/disposition/face/list`, {
    method: "POST",
    body: params
  });
}

/** 订阅/取消订阅 */
export async function subscribe(params = {}) {
  return request(`${server}/disposition/subscribe`, {
    method: "POST",
    body: params
  });
}

/** 设备查询 */
export async function getDevices(params = {}) {
  return request(`${server}/disposition/devices`, {
    method: "POST",
    body: params
  });
}
