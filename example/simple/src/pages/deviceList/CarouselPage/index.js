import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Carousel } from "antd-mobile";

// import Styles from "./styles/index.less";

const images = ["1", "2", "3"];

export default observer(props => {
  const [maskHeight, setHeight] = useState(0);
//   const [width, setWidth] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
    // setWidth(document.documentElement.clientWidth);
  });
  return (
    <div
      style={{
        top: 0,
        left: 0,
        // bottom: 0,
        position: "fixed",
        backgroundColor: "rgba(0,0,0,0.4)",
        width: "100%",
        zIndex: 99999,
        height: "100%"
        // overflowX: "hidden",
      }}
      onClick={props.cancle}
    >
      <div style={{ backgroundColor: "white", width: "100%", height: 200, marginTop:"50%" }}
      onClick={(event) => { event.preventDefault() }}
      >
        <Carousel selectedIndex={props.defaultIndex}>
          {props.sources.map((val, index) => (
            <img
              src={val.pic}
              alt=""
              style={{ width: "100%", verticalAlign: "top", height: "200px" }}
              key={index}
              onClick={(event) => { event.preventDefault() }}
            />
          ))}
        </Carousel>
      </div>

      {/* <Modal visible={props.visible} onClose={() => {
          console.log(123)
      }}>
      <div style={{backgroundColor:'white', marginTop:'50%'}}>
        <Carousel>
            {images.map((val, index) => (
              <img
                src="/static/images/logo.png"
                alt=""
                style={{ width: "100%", verticalAlign: "top", height: "200px" }}
                key={index}
              ></img>
            ))}
        </Carousel>
        </div>
      </Modal> */}
    </div>
  );
});
