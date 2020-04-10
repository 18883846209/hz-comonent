import { memo } from "react";

// 为函数组件提供的去除页面重复刷新的方法
export const memoTransition = Comp => {
  return memo(Comp, (pre, next) => {
    return JSON.stringify(pre) === JSON.stringify(next);
  });
};
