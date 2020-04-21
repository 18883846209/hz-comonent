/** 判断布控状态 */
const getRedirectStatus = status => {
  status = Number(status);
  let text = "布控中";
  switch (status) {
    case 0:
      text = "布控中";
      break;
    case 1:
      text = "已撤控";
      break;
    case 2:
      text = "已到期";
      break;
    case 9:
      text = "未开始";
      break;
    default:
      text = "未知";
      break;
  }
  return text;
};

/** 判断证件类型 */
const getRedirectType = type => {
  let text = "居民身份证";
  switch (type) {
    case "111":
      text = "居民身份证";
      break;
    case "112":
      text = "临时居民身份证";
      break;
    case "113":
      text = "其他";
      break;
    case "114":
      text = "军官证";
      break;
    case "123":
      text = "警官证";
      break;
    case "335":
      text = "驾驶证";
      break;
    case "414":
      text = "普通护照";
      break;
    case "-1":
      text = "未知";
      break;
    default:
      text = "未知";
      break;
  }
  return text;
};

/** 判断filterTitle */
const getTitle = type => {
  let text = "状态";
  switch (type) {
    case "disposition_status":
      text = "状态";
      break;
    case "disposition_target_type":
      text = "目标";
      break;
    case "subscribe_status":
      text = "告警订阅";
      break;
    default:
      break;
  }
  return text;
};

/** 点击图处理 status(0: 已订阅 1：未订阅 2：订阅动画 3：取消动画 4: 订阅失败) */
const changeImgUrl = status => {
  let imgForUrl = ["add_subscribe", ".png"];
  switch (status) {
    case 0:
      imgForUrl = ["add_subscribe", ".png"];
      break;
    case 1:
      imgForUrl = ["subscribed_small", ".png"];
      break;
    case 2:
      imgForUrl = ["sub_success", ".gif"];
      break;
    case 3:
      imgForUrl = ["sub_cancel", ".gif"];
      break;
    case 4:
      imgForUrl = ["sub_fail", ".gif"];
      break;
    default:
      break;
  }
  return imgForUrl;
};

export { getRedirectStatus, getRedirectType, getTitle, changeImgUrl };
