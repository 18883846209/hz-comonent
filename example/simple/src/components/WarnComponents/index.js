import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import LoadImg from "@/components/ImgLoad";
import styles from "./styles/index.less";

const parseNumber = num => {
  const result = Number(num);
  if (Number.isNaN(result)) return 0;
  if (Number.isInteger(result)) return result;
  return result.toFixed(1);
};

export const Card = ({ url, text = "", width, height, className, imgClass, onClick }) => (
  <div className={classnames(styles.card, className)} onClick={onClick}>
    <div className={classnames(styles.img, imgClass)}>
      <LoadImg src={url} width={width} height={height} />
    </div>
    <div className={styles.text}>{text}</div>
  </div>
);

export const Progress = ({ percent = 0 }) => {
  const num = `${parseNumber(percent)}%`;
  return (
    <div className={styles.progress}>
      <div className={styles.percent} style={{ width: num }} />
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
  imgClass: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number
};
Progress.propTypes = {
  percent: PropTypes.number
};
Item.propTypes = {
  desc: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string
};
