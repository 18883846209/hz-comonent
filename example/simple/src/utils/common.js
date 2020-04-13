/** 判断布控状态 */
const getRedirectStatus = status => {
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

export { getRedirectStatus };
