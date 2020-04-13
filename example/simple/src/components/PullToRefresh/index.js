/*
 * @Aurhor: dengsha
 * @Date: 2020-04-11 10:20:00
 * @LastEditors: zhangjie
 * @Description: 下拉、上拉加载
 * @LastEditTime: 2020-04-13 16:03:23
 */
import React, { useState, useRef } from "react";
import { PullToRefresh } from "antd-mobile";
import styles from "./styles/index.less";

/**
 * @description: 下拉刷新
 * @param {type}
 * @return: 下拉刷新
 */
export const PullDownRefresh = props => {
  const { refreshing, onRefresh, direction } = props;
  // const [refreshing, setRefreshing] = useState(false);
  // const hei =  - ReactDOM.findDOMNode(this.ptr).offsetTop;
  const [hei, setHei] = useState("calc(100vh - 45px)");
  const dateRef = useRef();
  return (
    <div className={styles.pulldown}>
      <PullToRefresh
        damping={60}
        style={{
          // height: "100%",
          overflow: "auto"
        }}
        direction={direction}
        refreshing={refreshing}
        ref={dateRef}
        onRefresh={onRefresh}
      >
        {props.children}
      </PullToRefresh>
    </div>
  );
};
