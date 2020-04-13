import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { List, ListView } from "antd-mobile";
import request from "@/utils/request";
// import { getCalculateTime } from "../../utils/utils";
import styles from "./styles/index.less";
// import { PullDownRefresh, PullUpRefresh } from "@/components/PullToRefresh";
import { EmptyFailedPage, EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage/index";

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
  device_name: "Meet hotel",
  hierarchy_name: "不是所有的兼职汪都需要风吹日晒",
  status: 2,//在线状态：0：登录中; 1：在线/启用; 2:离线/停用: 9:其他
  device_id:'1'
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
  const [datas, setData] = useState(data);
  const [dataSource, setDataSource] = useState(ds.cloneWithRows(datas));
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    request("http://192.168.111.231:8080//disposition/devices", { method: "POST" }).then(res => {
      console.log(res);
      setLoading(false);
      if (res.isSuccess) {
        setSuccess(true);
      } else {
        setSuccess(true);
      }
    });
  };

  // const reloadAction = () => {
    
  // };

  //获取item进行展示
  const renderRow = (item, i) => {
    let imgPic = '';
    console.log(item, 'item');
    if (item.status == 1) {
      imgPic = "/static/2x/device_on.png";
    } else {
      imgPic = "/static/2x/deivce_off.png";
    }
    return (
      <div className={styles.cardDiv}>
        <div className={styles.topDiv}>
          <div style={{ display: "inline-block" }}>
            <img src= {imgPic} width={21} height={13}></img>
          </div>
          <div className={styles.titleDiv}>{item.device_name}</div>
        </div>

        <div className={styles.contentDiv}>{item.hierarchy_name}</div>
      </div>
    );
  };

  return (
    // {console.log('1111')}
    <div className={styles.container}>
      {loading ? (
        <LoadingPage />
      ) : success ? (
        data.length > 0 ? (
          <ListView
            style={{
              height: "100%",
              overflow: "auto"
            }}
            dataSource={dataSource}
            renderRow={renderRow}
            initialListSize={10}
            pageSize={10}
            renderFooter={() => (
              <div style={{ height: 10, textAlign: "center" }}>{/* {upLoading ? '加载中' : '加载完成'} */}</div>
            )}
            // onEndReached={() => this.onEndReached(list.pageNum, list.totalPage)}
            // onEndReachedThreshold={10}
            useBodyScroll={true}
            // pageSize={4} // 每次渲染的行数
            scrollRenderAheadDistance={500} // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
            scrollEventThrottle={20} // 控制在滚动过程中，scroll事件被调用的频率
            // onEndReached={() => { upLoading}} // 上拉加载事件
          />
        ) : (
          <EmptyNoDataPage />
        )
      ) : (
        <EmptyFailedPage reloadAction={getData} />
      )}
    </div>
  );
};

export default DeviceList;

{
  /* <ListView
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
        /> */
}
