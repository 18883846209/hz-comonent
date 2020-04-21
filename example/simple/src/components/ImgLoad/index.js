/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles/index.less";

const path = "/static/images/common/";
const ext = ".png";

const map = {
  ratio_1to1_load: `${path}/160x160loading${ext}`,
  ratio_1to1_error: `${path}160x160error${ext}`,
  ratio_4to3_load: `${path}120x160loading${ext}`,
  ratio_4to3_error: `${path}120x160error${ext}`,
  ratio_16to9_load: `${path}285x160loading${ext}`,
  ratio_16to9_error: `${path}285x160error${ext}`
};

const getRatio = (w, h) => {
  const ratio = w / h;
  if (ratio === 1) return "1to1";
  if (ratio > 1.7) return "16to9";
  if (ratio >= 0.74 && ratio < 1.7) return "4to3";
  return "1to1";
};

const getStatusImg = (w, h, status = "_load") => {
  return map[`ratio_${getRatio(w, h)}${status}`];
};

const LoadImg = ({ src, width = 160, height = 160, style, className }) => {
  const initUrl = getStatusImg(width, height);
  const errorUrl = getStatusImg(width, height, "_error");
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
