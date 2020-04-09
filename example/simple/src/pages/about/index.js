/*
 * @Aurhor: dengsha
 * @Date: 2020-04-08 16:24:11
 * @LastEditors: dengsha
 * @Description: 关于页面
 * @LastEditTime: 2020-04-09 10:36:01
 */
import React, { useState } from "react";
import styles from "./styles/index.less";

const AboutPage = () => {
  return (
    <div>
      <div className={styles.about_imgDiv}>
        <img src="/static/images/logo.png" width={114} height={114} />
        <div className={styles.about_name}>掌上作战室</div>
        <div className={styles.about_version}>Version 1.1.0</div>
      </div>

      <div className={styles.about_bottom}>
        <div className={styles.about_compony}>紫光华智版权所有</div>
        <div className={styles.about_componyEng}>Copyright © 2020-2029 Unisinsight. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default AboutPage;
