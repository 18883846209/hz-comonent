import React, { useState } from "react";
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/index.css';
// import Styles from "./styles/index.less";

const CarouselPage = (props) => {
  const {visible, defaultIndex} = props;
  const [photoIndex, setPhotoIndex] = useState(defaultIndex);
  return (
    <div>
        <PhotoSlider
        images={props.sources.map(item => ({ src: item.pic }))}
        visible={visible}
        onClose={props.onClose}
        index={photoIndex}
        onIndexChange={setPhotoIndex}
      />
    </div>
  );
}

export default CarouselPage;
