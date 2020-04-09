/*
 * @Aurhor: dengsha
 * @Date: 2020-04-09 10:27:57
 * @LastEditors: dengsha
 * @Description: 图片浏览器
 * @LastEditTime: 2020-04-09 10:57:22
 */


/**
 * 引用方式：由于服务端渲染，请使用关闭ssrc的方式引入(使用next/dynamic)
 * const ImageViewer = dynamic(import("@/components/ImageViewer/index"), {
    ssr: false
 })
 * 参数：
 * visible(boolen):是否显示图片浏览器 
 * defaultIndex(Number):默认显示的第几张图
 * sources([]):图片数据源
 * onClose(() => {}):关闭浏览器的回调方法
 */

import React, { useState } from "react";
import { PhotoProvider, PhotoConsumer, PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/index.css';
// import Styles from "./styles/index.less";

const ImageViewer = (props) => {
  const {visible, defaultIndex, sources} = props;
  const [photoIndex, setPhotoIndex] = useState(defaultIndex);
  return (
    <div>
        <PhotoSlider
        images={sources.map(item => ({ src: item }))}
        visible={visible}
        onClose={props.onClose}
        index={photoIndex}
        onIndexChange={setPhotoIndex}
      />
    </div>
  );
}

export default ImageViewer;
