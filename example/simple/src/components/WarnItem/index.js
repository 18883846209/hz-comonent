import React from "react";
import PropTypes from "prop-types";
import { Progress, Item, Card } from "@/components/WarnComponents/index";
import styles from "./styles/index.less";

const Warn = ({ onClick }) => (
  <div className={styles.warn_item} onClick={onClick}>
    <div className={styles.top}>
      <div className={styles.left}>姓名姓名姓名姓名姓名</div>
      <div className={styles.right}>20秒</div>
    </div>
    <div className={styles.bottom}>
      <Card style={{ marginRight: 10 }} text="抓拍照" />
      <Card text="布控照" />
      <div className={styles.right}>
        <div style={{ height: 100 }}>
          <Item desc="asdasdasd测试测试asdasdasd测试测试asdasdasd测试测试" />
          <Item />
        </div>
        <Progress />
      </div>
    </div>
  </div>
);
Warn.getInitialProps = async () => {
  return {};
};

Warn.propTypes = {
  onClick: PropTypes.func
};

export default Warn;
