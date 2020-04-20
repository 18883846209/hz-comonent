/*
 * @Aurhor: dengsha
 * @Date: 2020-04-11 10:20:00
 * @LastEditors: dengsha
 * @Description: 下拉、上拉加载
 * @LastEditTime: 2020-04-20 17:29:44
 */
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh } from "antd-mobile";
import PropTypes from "prop-types";
import styles from "./styles/index.less";

/**
 * @description: 下拉刷新
 * @param {type}
 * @return: 下拉刷新
 */
export const PullDownRefresh = props => {
  const { refreshing, onRefresh, direction, children} = props;
  // const [height, setHeight] = useState(document.documentElement.clientHeight);
  const [height, setHeight] = useState("100vh");
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
        {children}
      </PullToRefresh>
    </div>
  );
};

PullDownRefresh.propTypes = {
  children: PropTypes.node,// 图片数据源
  direction: PropTypes.string, // 默认打开图片的index
  onRefresh: PropTypes.func,// 是否打开图片浏览器
  refreshing: PropTypes.func, // 关闭的回调方法
};
