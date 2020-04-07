import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./styles/index.less";

const Card = ({ url, text = "", style }) => (
  <div className={styles.card} style={style}>
    <img src={url} width={80} height={100} />
    <div className={styles.text}>{text}</div>
  </div>
);

const Progress = ({ percent = 0 }) => (
  <div className={styles.progress}>
    <div className={styles.percent} style={{ width: "80%" }}>{`${percent}%`}</div>
  </div>
);

const Item = ({ desc = "奥德赛testsdasd爱神的箭卡里克" }) => (
  <div className={styles.Item}>
    <div className={styles.desc}>{desc}</div>
  </div>
);

const Warn = () => (
  <div className={styles.main}>
    <div className={styles.top}>
      <div className={styles.left}>姓名姓名姓名姓名姓名</div>
      <div className={styles.right}>20秒</div>
    </div>
    <div className={styles.bottom}>
      <Card style={{ marginRight: 10 }} text="抓拍照" />
      <Card text="布控照" />
      <div className={styles.right}>
        <Item />
        <Progress />
      </div>
    </div>
  </div>
);
Warn.getInitialProps = async () => {
  return {};
};
Warn.propTypes = {};

export default Warn;
