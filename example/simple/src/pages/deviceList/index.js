import React, { useState, useEffect } from "react";
import router from "next/router";
import { ListView } from "antd-mobile";
import styles from "./styles/index.less";
import { getDevices } from "@/services/executeControl";
import { EmptyFailedPage, EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage/index";

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

var params = {}

const DeviceList = (props) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  });
  const [datas, setData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  // const [params, setParams] = useState({});
  
  useEffect(() => {
    params = router.query
    getData();
  }, []);

  const getData = () => {
    const { server } = window.hzConfig;
    setLoading(true);
    console.log(params, 'params')
    getDevices(params).then(res => {
      setLoading(false);
      if (!res.code || res.code.slice(-4) != '0000') {
        setSuccess(false);
      } else {
        setSuccess(true);
        setData(res.data);
      }
    })
  };

  //获取item进行展示
  const renderRow = (item, i) => {
    let imgPic = '';
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
    <div className={styles.container}>
      {loading ? (
        <LoadingPage />
      ) : success ? (
        datas.length > 0 ? (
          <ListView
            style={{
              height: "100%",
              overflow: "auto"
            }}
            dataSource={ds.cloneWithRows(datas)}
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

