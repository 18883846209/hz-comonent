/*
 * @Aurhor: dengsha
 * @Date: 2020-04-08 16:48:29
 * @LastEditors: dengsha
 * @Description: 设备页面
 * @LastEditTime: 2020-04-13 15:53:57
 */
import React, { useState, useEffect } from "react";
import request from "@/utils/request"
import styles from "./styles/index.less";
import { Card, WhiteSpace, WingBlank, Result } from "antd-mobile";
import { EmptyFailedPage, EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage/index";
import {PullDownRefresh, PullUpRefresh} from "@/components/PullToRefresh";

const devices = [
  {
    title: "监控点1",
    subTitle: "ADN<洪湖东路<渝北区<ADN<洪湖东路<渝北区<ADN<洪湖东路<渝北区<ADN<洪湖东路<渝北区<重庆市<本域"
  },
  { title: "监控点2", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点3", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域<ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点1", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点2", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点3", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域<ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点1", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点2", subTitle: "ADN<洪湖东路<渝北区<重庆市<本域" },
  { title: "监控点3", subTitle: "ADN<洪湖东路<渝北区ADN<洪湖东路<渝北区<重庆市<本域<ADN<洪湖东路<渝北区<重庆市<本域" }
];

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

const Devices = () => {
  const reloadAction = () => {
    console.log("1234567");
  };

  const [refreshing, setRefreshing] = useState(false);
  const [data, seetData] = useState([]);

  useEffect(() => {
    const { server = "" } = window.hzConfig;
    request(`${server}/disposition/devices`, {method: "POST"}).then(res => {
      console.log(res);
    })
  });

  // const getDevicesData = () => {
  //   request("http://192.168.111.231:8080//disposition/devices", {method: "POST"}).then(res => {
  //     console.log(res);
  //   })
  // }


  return (
    <div>
      <PullDownRefresh
        direction="down"
        refreshing={refreshing}
        onRefresh={() => {
          console.log('refresh');
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
          }, 2000);
        }}
      >
      <EmptyNoDataPage />
        {/* {devices.map(item => (
          <div className={styles.cardDiv}>
            <div className={styles.topDiv}>
              <div style={{ display: "inline-block" }}>
                <img src="/static/2x/device_on.png" width={21} height={13}></img>
              </div>
              <div className={styles.titleDiv}>{item.title}</div>
            </div>

            <div className={styles.contentDiv}>{item.subTitle}</div>
          </div>
        ))}
        <WhiteSpace size="sm" /> */}
      </PullDownRefresh>

      {/* {devices.map(item => (
          <WingBlank size="sm">
          <WhiteSpace size="sm" />
        <Card>
          <Card.Body>
            <div>{item.title}</div>
            <div>{item.subTitle}</div>
          </Card.Body>
        </Card>
        </WingBlank>
      ))} */}
    </div>
  );
};

Devices.getInitialProps = async function() {
  // const res = await fetch('http://api.tvmaze.com/search/shows?q=batman')
  // const data = await res.json()

  // console.log(`Show data fetched. Count: ${data.length}`)

  const res = await request("http://192.168.111.231:8080//disposition/devices", {method: "POST"}).then(res => {
      console.log(res);
    })
console.log(11111)
  return {
    shows: []
  }
}

export default Devices;
