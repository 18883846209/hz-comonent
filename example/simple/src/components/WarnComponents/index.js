import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./styles/index.less";

export const Card = ({ url, text = "", className, imgClass }) => (
  <div className={classnames(styles.card, className)}>
    <div className={classnames(styles.img, imgClass)}>
      <img src={url} alt="" />
    </div>
    <div className={styles.text}>{text}</div>
  </div>
);

export const Progress = ({ percent = 0 }) => {
  const num = `${percent}%`;
  return (
    <div className={styles.progress}>
      <div className={styles.percent} style={{ width: num }}></div>
      <div className={styles.num}>{num}</div>
    </div>
  );
};

export const Item = ({ desc = "", onClick, src }) => (
  <div className={styles.item} onClick={onClick}>
    <div className={styles.left}>
      <img className={styles.icon} alt="" src={src} />
    </div>
    <div className={styles.desc}>{desc}</div>
  </div>
);
Card.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  imgClass: PropTypes.string
};
Progress.propTypes = {
  percent: PropTypes.number
};
Item.propTypes = {
  desc: PropTypes.string,
  onClick: PropTypes.func
};
