import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { List, ListView } from "antd-mobile";
import { getCalculateTime } from "../../utils/utils";
import styles from "./styles/index.less";
import { PullDownRefresh, PullUpRefresh } from "@/components/PullToRefresh";

const CarouselPage = dynamic(import("@/components/ImageViewer/index"), {
  ssr: false
});

const PullToRefresh = dynamic(import("antd-mobile"), {
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

// 虚拟数据
const dataItem = {
  img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
  title: "Meet hotel",
  subTitle: "不是所有的兼职汪都需要风吹日晒"
};
const data = [];
for (let i = 0; i < 15; i++) {
  dataItem.key = i;
  data.push(dataItem);
}

const DeviceList = () => {
  const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  });
  // const list = [{title:'12'}];
  const [dataSource, setData] = useState(ds.cloneWithRows(data));
  const [upLoading, setUpLoading] = useState(false);
  const [pullLoading, setPullLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hei, setHei] = useState("calc(100vh - 45px)");
  const dateRef = useRef()

  // //上拉加载
  // const onEndReached = (page, lastPage) => {
  //   setUpLoading(true);
  //   setTimeout(() => {
  //     setUpLoading(false);
  //   }, 600);
    
  // };
  // //下拉刷新
  // const onRefresh = () => {
  //   setTimeout(() => {
  //     setPullLoading(true);
  //   }, 600);
  // };

  //获取item进行展示
  const renderRow = (item, i) => {
    return (
      <div className={styles.cardDiv}>
        <div className={styles.topDiv}>
          <div style={{ display: "inline-block" }}>
            <img src="/static/2x/device_on.png" width={21} height={13}></img>
          </div>
          <div className={styles.titleDiv}>{item.title}</div>
        </div>

        <div className={styles.contentDiv}>{item.subTitle}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* <PullDownRefresh
        direction="down"
        refreshing={refreshing}
        onRefresh={() => {
          console.log("refresh");
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
          }, 2000);
        }}
      > */}
        <ListView
      style={{
        height: '100%',
        overflow: 'auto',
      }}
        dataSource={dataSource}
        renderRow={renderRow}
        initialListSize={10}
        pageSize={10}
        renderFooter={() => (<div style={{height:10, textAlign: 'center'}}>
          {/* {upLoading ? '加载中' : '加载完成'} */}
        </div>)
        }
        // onEndReached={() => this.onEndReached(list.pageNum, list.totalPage)}
        // onEndReachedThreshold={10}
        useBodyScroll={true}


        // pageSize={4} // 每次渲染的行数
        scrollRenderAheadDistance={500} // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
        scrollEventThrottle={20} // 控制在滚动过程中，scroll事件被调用的频率
        // onEndReached={() => { upLoading}} // 上拉加载事件
      />

        {/* <ListView
          ref={dateRef}
          dataSource={dataSource}
          // renderHeader={() => <span>header</span>}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: "center" }}>{upLoading ? "Loading..." : "Loaded"}</div>
          )}
          // renderSectionHeader={sectionData => <div>{`Task ${sectionData.split(" ")[1]}`}</div>}
          // renderBodyComponent={() => <MyBody />}
          renderRow={renderRow}
          // renderSeparator={separator}
          style={{
            height: 500,
            overflow: "auto"
          }}
          pageSize={4}
          onScroll={(value) => {
            console.log("scroll", value);
          }}
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
          useBodyScroll={true}
        /> */}
      {/* </PullDownRefresh> */}
    </div>
  );
};

export default DeviceList;
