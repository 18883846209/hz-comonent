import React from "react";
import { observer } from "mobx-react";
// import { Button, Modal, Carousel } from "antd-mobile";

// import Styles from "./styles/index.less";

// const images = ["1", "2", "3"];

export default observer((props) => {

  return (
    <div
      style={{
        top: 0,
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.4)",
        // width: window.innerWidth,
        // height: window.innerHeight
      }}
      onClick={props.cancle}
    >
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
