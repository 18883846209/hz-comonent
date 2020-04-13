/*
 * @Aurhor: dengsha
 * @Date: 2020-04-11 10:20:00
 * @LastEditors: zhangjie
 * @Description: 下拉、上拉加载
 * @LastEditTime: 2020-04-13 17:18:23
 */
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh } from "antd-mobile";
import styles from "./styles/index.less";

/**
 * @description: 下拉刷新
 * @param {type}
 * @return: 下拉刷新
 */
export const PullDownRefresh = props => {
  const { refreshing, onRefresh, direction } = props;
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  const dateRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      // console.log(height, ReactDOM.findDOMNode(dateRef.current).offsetTop);
      setHeight(height - ReactDOM.findDOMNode(dateRef.current).offsetTop);
    }, 0);
  }, []);
  return (
    <div className={styles.pulldown}>
      <PullToRefresh
        damping={60}
        style={{
          height,
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
