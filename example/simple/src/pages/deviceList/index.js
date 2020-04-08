import React, { useState } from "react";
import { List } from "antd-mobile";
import CarouselPage from "./CarouselPage";

const Item = List.Item;
const Brief = Item.Brief;

const devices = [
  { title: "监控点1", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点2", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点3", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" }
];

// 延迟展示
const DeviceList = () => {
    const [isVisible, setVisible] = useState(false)
    const cancle = ()=>{
        console.log(11111);
        setVisible(false)
    };
  return (
    <div className="container">
      <main>
        {/* <Link href="/">
        <a>go home</a>
      </Link> */}
        <List className="my-list">
          {devices.map(item => (
            <Item multipleLine arrow="empty">
              {item.title}
              <Brief>{item.subTitle}</Brief>
            </Item>
          ))}
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
        <CarouselPage visible={isVisible} cancle={cancle} />
      </main>
    </div>
  );
};
// const DeviceList = () => (
//   <div className="container">
//     <main>
//       {/* <Link href="/">
//         <a>go home</a>
//       </Link> */}
//       <List className="my-list">
//        {devices.map(item => (
//            <Item arrow="horizontal" multipleLine arrow="empty">
//            {item.title}
//            <Brief>{item.subTitle}</Brief>
//          </Item>
//        ))}
//         <Item arrow="horizontal" multipleLine onClick={() => {}}>
//           Title
//           <Brief>subtitle</Brief>
//         </Item>
//         <Item arrow="horizontal" multipleLine onClick={() => {}} platform="android">
//           ListItem （Android）
//           <Brief>
//             There may have water ripple effect of <br /> material if you set the click event.
//           </Brief>
//         </Item>
//       </List>
//       <CarouselPage visible={true}></CarouselPage>
//     </main>
//   </div>
// );

export default DeviceList;
