/*
 * @Aurhor: dengsha
 * @Date: 2020-04-08 16:24:11
 * @LastEditors: dengsha
 * @Description: 关于页面
 * @LastEditTime: 2020-04-21 09:32:49
 */
import React from "react";
import { getCookie } from "@/utils/cookie";
import styles from "@/styles/about/index.less";
import {getDpr} from "@/utils/utils";

const AboutPage = () => {
  return (
    <div className={styles.about_main}>
      <div className={styles.about_imgDiv}>
        <img src={getDpr("home/about_logo")} width={104} height={104} alt="" />
        <div className={styles.about_name}>掌上作战室</div>
        <div className={styles.about_version}>{`Version ${getCookie("versionName")}`}</div>
      </div>

      <div className={styles.about_bottom}>
        <div className={styles.about_compony}>紫光华智版权所有</div>
        <div className={styles.about_componyEng}>Copyright © 2020-2029 Unisinsight. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default AboutPage;
