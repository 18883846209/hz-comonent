/*
 * @Aurhor: dengsha
 * @Date: 2020-04-11 10:20:00
 * @LastEditors: dengsha
 * @Description: 下拉、上拉加载
 * @LastEditTime: 2020-04-13 15:55:52
 */
import React, { useState,useEffect,useRef } from "react";
import { PullToRefresh } from "antd-mobile";
import ReactDOM from 'react-dom';

/**
 * @description: 下拉刷新
 * @param {type}
 * @return: 下拉刷新
 */
export const PullDownRefresh = (props) => {
    const {refreshing, onRefresh, direction} = props;
    const [hei, setHei] = useState("calc(100vh - 45px)");
    const dateRef = useRef()
    return (
      <div>
        <PullToRefresh
        damping={60}
        style={{
          height: hei,
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
