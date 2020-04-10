import React, { useState } from "react";
import { Result } from "antd-mobile";
import "react-photo-view/dist/index.css";
import styles from "./styles/index.less";

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

export const EmptyFailedPage = () => {
    return (
        <div className={styles.empty_mainDiv}>
          <div className={styles.messageDiv}>
            <div style={{ textAlign: "center" }}>
              <img src="/static/images/logo.png" />
            </div>
            <div className={styles.contentDiv}>加载失败</div>
    
            {/* <Result
        className={styles.messageDiv}
            style={{ marginTop:"50%", backgroundColor:"#fff" }}
            img={myImg("/static/images/logo.png")}
            // title="支付成功"
            message={
              <div>
                加载失败
              </div>
            }
          /> */}
          </div>
        </div>
      );
}

export const EmptyNoDataPage = () => {
  return (
    <div className={styles.empty_mainDiv}>
      <div className={styles.messageDiv}>
        <div style={{ textAlign: "center" }}>
          <img src="/static/images/catchPic.png" width={100} height={100} />
        </div>
        <div className={styles.contentDiv}>加载失败</div>
      </div>
    </div>
  );
};
