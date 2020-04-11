import React, { useState } from "react";
import dynamic from "next/dynamic";
import { List, ListView } from "antd-mobile";
import { getCalculateTime } from "../../utils/utils";
import styles from "./styles/index.less";

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
  img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
  title: 'Meet hotel',
  subTitle: '不是所有的兼职汪都需要风吹日晒',
}
const data = []
for (let i = 0; i < 100; i++) {
  dataItem.key = i
  data.push(dataItem)
}

const DeviceList = () => {
  const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  })
  // const list = [{title:'12'}];
  const [dataSource, setData] = useState(ds.cloneWithRows(data));
  const [upLoading, setUpLoading] = useState(false);
  const [pullLoading, setPullLoading] = useState(false);

  //上拉加载
  const onEndReached = (page, lastPage) => {
    //当前页小于总页数继续请求下一页数据，否则停止请求数据
    // if (Number(page) < Number(lastPage)) {
    //   this.setState({ upLoading: true });
    //   //接口请求下一页数据,完成后将upLoading设为false
    // }

    console.log('123')
    setUpLoading(true);
  };
  //下拉刷新
  const onRefresh = () => {
    // setPullLoading(true);
    // this.setState({ pullLoading: true });
    //接口请求第一页数据,完成后将pullLoading设为false


    setTimeout(() => {
      setPullLoading(true);
    }, 600);
  };

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
    )
  };

  return (
    <div className="container">
      <ListView
      style={{
        height: 500,
        overflow: 'auto',
      }}
        dataSource={dataSource}
        renderRow={renderRow}
        initialListSize={10}
        pageSize={10}
        renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
          {upLoading ? '加载中' : '加载完成'}
        </div>)
        }
        // onEndReached={() => this.onEndReached(list.pageNum, list.totalPage)}
        onEndReachedThreshold={10}
        useBodyScroll={true}
        // style={{ width: "100vw" }}
        onEndReached={() => {setUpLoading(true)}} // 上拉加载事件
        pullToRefresh={
          <PullToRefresh // import { PullToRefresh } from 'antd-mobile'
            refreshing={pullLoading}
            onRefresh={onRefresh}
          />
        }
      />
    </div>
  );
};

export default DeviceList;
