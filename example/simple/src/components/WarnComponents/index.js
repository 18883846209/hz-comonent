import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/index.less";

export const Card = ({ url, text = "", style, width = 80, height = 100, position = "bottom" }) => (
  <div className={styles.card} style={style}>
    {position === "bottom" ? (
      <>
        <img src={url} width={width} height={height} alt="" />
        <div className={styles.text}>{text}</div>
      </>
    ) : (
      <>
        <div className={styles.text}>{text}</div>
        <img src={url} width={width} height={height} alt="" />
      </>
    )}
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

export const Item = ({ desc = "", onClick }) => (
  <div className={styles.item} onClick={onClick}>
    <div className={styles.left}>icon</div>
    <div className={styles.desc}>{desc}</div>
  </div>
);
Card.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};
Progress.propTypes = {
  percent: PropTypes.number
};
Item.propTypes = {
  desc: PropTypes.string,
  onClick: PropTypes.func
};
