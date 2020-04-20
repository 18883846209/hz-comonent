/*
 * @Aurhor: dengsha
 * @Date: 2020-04-09 10:27:57
 * @LastEditors: dengsha
 * @Description: 图片浏览器
 * @LastEditTime: 2020-04-20 17:28:19
 */

/**
 * 引用方式：由于服务端渲染，请使用关闭ssrc的方式引入(使用next/dynamic)
 * const ImageViewer = dynamic(import("@/components/ImageViewer/index"), {
    ssr: false
 })
 * 参数：
 * visible(boolen):是否显示图片浏览器
 * defaultIndex(Number):默认显示的第几张图,从0开始即数组下标(defaultIndex < sources.length)
 * sources([]):图片数据源
 * onClose(() => {}):关闭浏览器的回调方法
 */

import React, { useState, useEffect } from "react";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/index.css";
import PropTypes from "prop-types";

const ImageViewer = props => {
  const { visible, defaultIndex, sources, onClose } = props;
  const [photoIndex, setPhotoIndex] = useState(defaultIndex);
  useEffect(() => {
    setPhotoIndex(defaultIndex);
  }, [defaultIndex]);
  return (
    <PhotoSlider
      images={sources.map(item => ({ src: item }))}
      visible={visible}
      onClose={onClose}
      index={photoIndex}
      onIndexChange={setPhotoIndex}
    />
  );
};

ImageViewer.propTypes = {
  sources: PropTypes.array,// 图片数据源
  defaultIndex: PropTypes.number, // 默认打开图片的index
  visible: PropTypes.bool,// 是否打开图片浏览器
  onClose: PropTypes.func, // 关闭的回调方法
};

export default ImageViewer;
