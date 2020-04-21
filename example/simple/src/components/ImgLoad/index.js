/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles/index.less";

const map = {
  ratio_1to1_load: "/static/images/common/160x160loading.png",
  ratio_1to1_error: "/static/images/common/160x160error.png",
  ratio_4to3_load: "/static/images/common/120x160loading.png",
  ratio_4to3_error: "/static/images/common/120x160error.png",
  ratio_16to9_load: "/static/images/common/285x160loading.png",
  ratio_16to9_error: "/static/images/common/285x160error.png"
};

const getRatio = (w, h) => {
  const ratio = w / h;
  if (ratio === 1) return "1to1";
  if (ratio > 1.7) return "16to9";
  if (ratio >= 0.74 && ratio < 1.7) return "4to3";
  return "1to1";
};

const LoadImg = ({ src, width = 160, height = 160, style, className }) => {
  const initUrl = map[`ratio_${getRatio(width, height)}_load`];
  const errorUrl = map[`ratio_${getRatio(width, height)}_error`];
  const [url, setUrl] = useState(src);
  const onerror = () => {
    setUrl(errorUrl);
  };
  return (
    <img
      className={classNames(styles.load_img, className)}
      onError={onerror}
      src={url}
      alt=""
      style={{ backgroundImage: `url(${initUrl})`, ...style }}
    />
  );
};

LoadImg.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default LoadImg;
