import React, { useState } from "react";
import dynamic from "next/dynamic";
import { List, WingBlank, WhiteSpace } from "antd-mobile";
// import CarouselPage from "./CarouselPage";
// import CarouselPage from "@/components/CarouselPage/index";
import { getCalculateTime } from "../../utils/utils";

import { PhotoProvider, PhotoConsumer, PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/index.css";

const CarouselPage = dynamic(import("@/components/ImageViewer/index"), {
  ssr: false
});

const Item = List.Item;
const Brief = Item.Brief;

const devices = [
  { title: "监控点1", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点2", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点3", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" }
];

const images = [
    // "/static/images/logo.png", 
"/static/images/catchPic.png",
 "/static/images/logo.png"
];

const DeviceList = () => {
  const [isVisible, setVisible] = useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const cancle = () => {
    setVisible(false);
  };
  console.log(isVisible, "props.visible");
  return (
    <div className="container">
      <main>
        <div>
          <List className="my-list">
            {devices.map(item => (
              <Item multipleLine arrow="empty">
                {item.title}
                <Brief>{item.subTitle}</Brief>
              </Item>
            ))}
            <Item
              arrow="horizontal"
              multipleLine
              onClick={() => {
                setVisible(true);
                console.log(isVisible, "11111");
              }}
            >
              Title
              <Brief>{getCalculateTime("2020-4-5 13:03:00")}</Brief>
            </Item>
            <Item arrow="horizontal" multipleLine onClick={() => {}} platform="android">
              ListItem （Android）
              <Brief>
                There may have water ripple effect of <br /> material if you set the click event.
              </Brief>
            </Item>
            <Item arrow="horizontal" multipleLine onClick={() => {}}>
              Title
              <Brief>subtitle</Brief>
            </Item>
            <Item arrow="horizontal" multipleLine onClick={() => {}} platform="android">
              ListItem （Android）
              <Brief>
                There may have water ripple effect of <br /> material if you set the click event.
              </Brief>
            </Item>
            <Item arrow="horizontal" multipleLine onClick={() => {}}>
              Title
              <Brief>subtitle</Brief>
            </Item>
            <Item arrow="horizontal" multipleLine onClick={() => {}} platform="android">
              ListItem （Android）
              <Brief>
                There may have water ripple effect of <br /> material if you set the click event.
              </Brief>
            </Item>
          </List>
        </div>

        {/* <PhotoSlider
        images={images.map(item => ({ src: item.pic }))}
        visible={isVisible}
        onClose={() => setVisible(false)}
        index={photoIndex}
        onIndexChange={setPhotoIndex}
      /> */}

        <CarouselPage visible={isVisible} onClose={cancle} sources={images} defaultIndex={1} />

        {/* {isVisible ? <CarouselPage visiblie={isVisible} cancle={cancle} sources={images} defaultIndex={1} /> : null} */}
      </main>
    </div>
  );
};

export default DeviceList;
