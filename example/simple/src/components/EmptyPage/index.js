/*
 * @Aurhor: dengsha
 * @Date: 2020-04-09 17:20:49
 * @LastEditors: dengsha
 * @Description: 为空处理页
 * @LastEditTime: 2020-04-10 16:10:46
 */
import React, { useState } from "react";
import { Result, Button } from "antd-mobile";
import "react-photo-view/dist/index.css";
import styles from "./styles/index.less";

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

/**
 * @description: 失败页面
 * @param reloadAction(() => {}):点击重新加载回调页 
 * @return: 失败页面
 */
export const EmptyFailedPage = (props) => {
    return (
        <div className={styles.empty_mainDiv}>
          <div className={styles.messageDiv}>
            <div style={{ textAlign: "center" }}>
              <img src="/static/2x/empty_failed.png" width={294} height={165} />
            </div>
            <div className={styles.contentDiv}>加载失败</div>
            <div className={styles.buttonDiv}>
                <Button className={styles.buttonStyle} onClick={props.reloadAction}>重新加载</Button>
            </div>
          </div>
        </div>
      );
}

/**
 * @description: 无数据为空页
 * @param {type} 
 * @return: 无数据页面
 */
export const EmptyNoDataPage = () => {
  return (
    <div className={styles.empty_mainDiv}>
      <div className={styles.messageDiv}>
        <div style={{ textAlign: "center" }}>
          <img src="/static/2x/empty_noData.png" width={294} height={165} />
        </div>
        <div className={styles.contentDiv}>暂无数据</div>
      </div>
    </div>
  );
};
