/*
 * @Aurhor: dengsha
 * @Date: 2020-04-09 17:20:49
 * @LastEditors: dengsha
 * @Description: 为空处理页
 * @LastEditTime: 2020-04-21 09:39:23
 */
import React from "react";
import { Button } from "antd-mobile";
import PropTypes from "prop-types";
import { getDpr } from "@/utils/utils";
import styles from "./styles/index.less";

/**
 * @description: 失败页面
 * @param reloadAction(() => {}):点击重新加载回调页
 * @return: 失败页面
 */
export const EmptyFailedPage = props => {
  const {reloadAction} = props;
  return (
    <div className={styles.empty_mainDiv} style={{height:"calc(100vh - 45px)"}}>
      <div className={styles.messageDiv}>
        <div style={{ textAlign: "center" }}>
          <img src={getDpr("common/empty_failed")} width={294} height={165} alt="" />
        </div>
        <div className={styles.contentDiv}>加载失败</div>
        <div className={styles.buttonDiv}>
          <Button className={styles.buttonStyle} onClick={reloadAction}>
            重新加载
          </Button>
        </div>
      </div>
    </div>
  );
};

EmptyFailedPage.propTypes = {
  reloadAction: PropTypes.func
};

/**
 * @description: 无数据为空页
 * @param {type}
 * @return: 无数据页面
 */
export const EmptyNoDataPage = () => {
  return (
    <div className={styles.empty_mainDiv} style={{height:"calc(100vh - 45px)"}}>
      <div className={styles.messageDiv}>
        <div style={{ textAlign: "center" }}>
          <img src={getDpr("common/empty_noData")} width={294} height={165} alt="" />
        </div>
        <div className={styles.contentDiv}>暂无数据</div>
      </div>
    </div>
  );
};

/**
 * @description: Loading加载页面
 * @param {type}
 * @return: 加载页面
 */
export const LoadingPage = () => {
  return (
    <div className={styles.empty_mainDiv} style={{height:"calc(100vh - 45px)", backgroundColor: '#f4f4f4'}}>
      <div className={styles.messageDiv} style={{backgroundColor: '#f4f4f4'}}>
        <div style={{ textAlign: "center" }}>
          <img src="/static/images/loading.gif" width={55} height={55} alt="" />
        </div>
      </div>
    </div>
  );
};
