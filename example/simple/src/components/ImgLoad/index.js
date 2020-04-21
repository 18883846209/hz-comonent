/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// import { LazyLoadImage } from "react-lazy-load-image-component";
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

const load = (src, callback = () => {}, errCallback = () => {}) => {
  const img = new Image();
  img.onload = () => {
    callback();
  };
  img.onerror = () => {
    errCallback();
  };
  img.src = src;
};

const LoadImg = ({ src, width = 160, height = 160, style, className }) => {
  const initUrl = map[`ratio_${getRatio(width, height)}_load`];
  const errorUrl = map[`ratio_${getRatio(width, height)}_error`];
  const [url, setUrl] = useState(initUrl);
  useEffect(() => {
    load(
      src,
      () => {
        setUrl(src);
      },
      () => {
        setUrl(errorUrl);
      }
    );
  }, [src]);
  // return <LazyLoadImage placeholder={<span>aaa</span>} alt={initUrl} height={height} src={`${src}1`} width={width} />;
  return <img className={classNames(styles.load_img, className)} src={url} alt="" style={style} />;
};

LoadImg.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default LoadImg;
