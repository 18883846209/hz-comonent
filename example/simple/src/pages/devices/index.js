/*
 * @Aurhor: dengsha
 * @Date: 2020-04-08 16:48:29
 * @LastEditors: dengsha
 * @Description: 设备页面
 * @LastEditTime: 2020-04-09 14:58:43
 */
import React, { useState } from "react";
import styles from "./styles/index.less"
import { Card, WhiteSpace, WingBlank } from "antd-mobile";

const devices = [
  { title: "监控点1", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点2", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点3", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域<ADN<洪湖东路<渝北区<重庆市<本域" }
];

const Devices = () => {
  return (
    <div>
      {devices.map(item => (
        <div className={styles.cardDiv}>
          <div className={styles.titleDiv}>{item.title}</div>
          <div className={styles.contentDiv}>{item.subTitle}</div>
        </div>
      ))}
      {/* {devices.map(item => (
          <WingBlank size="sm">
          <WhiteSpace size="sm" />
        <Card>
          <Card.Body>
            <div>{item.title}</div>
            <div>{item.subTitle}</div>
          </Card.Body>
        </Card>
        </WingBlank>
      ))} */}
    </div>
  );
};

export default Devices;
