/*
 * @Aurhor: dengsha
 * @Date: 2020-04-11 10:20:00
 * @LastEditors: dengsha
 * @Description: 下拉、上拉加载
 * @LastEditTime: 2020-04-11 15:03:51
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
    // const [refreshing, setRefreshing] = useState(false);
    // const hei =  - ReactDOM.findDOMNode(this.ptr).offsetTop;
    const [hei, setHei] = useState("calc(100vh - 45px)");
    const dateRef = useRef()
    console.log('00000');
    useEffect(() => {
        console.log('11111',window.innerHeight,hei);//ReactDOM.findDOMNode(dateRef)
        // setHei(hei - dateRef.offsetTop);

//         const dom = document.getElementById('aaa');
//  const height =  ReactDOM.findDOMNode(submitObj).offsetHeight
      });
    return (
      <div>
          {console.log('2222')}
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
