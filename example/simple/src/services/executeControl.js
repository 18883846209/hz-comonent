import request from "../utils/request";

/** 查询设备列表 */
export async function getDeviceList(params = {}) {
  return request(`http://192.168.111.231:8080/disposition/devices`, {
    method: "POST",
    body: params,
    headers: {
      User: 'admin',
    }
  });
}

/** 查询布控列表 */
export async function getExecuteList(params = {}) {
  return request(`http://192.168.100.205:8080/disposition/face/list`, {
    method: "POST",
    body: params,
    headers: {
      User: '#',
    }
  });
}

/** 订阅/取消订阅 */
export async function subscribe(params = {}) {
  return request(`http://192.168.100.205:8080/disposition/subscribe`, {
    method: "POST",
    body: params,
    headers: {
      User: 'admin',
    }
  });
}
