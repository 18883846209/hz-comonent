import React, { useState, useEffect } from "react";
import router from "next/router";
import styles from "./styles/index.less";
import request from "@/utils/request";
import dynamic from "next/dynamic";
import { EmptyFailedPage, EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage/index";

const List = dynamic(import("@/components/List"), {
  ssr: false
});

// 虚拟数据
const dataItem = {
  device_name: "Meet hotel",
  hierarchy_name: "不是所有的兼职汪都需要风吹日晒",
  status: 2, //在线状态：0：登录中; 1：在线/启用; 2:离线/停用: 9:其他
  device_id: "1"
};
const data = [];
for (let i = 0; i < 15; i++) {
  dataItem.key = i;
  data.push(dataItem);
}

var params = {};

const DeviceList = () => {
  const [datas, setData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    params = router.query;
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const { server = "" } = window.hzConfig;
    const object = {
      body: params,
      method: "POST"
    };
    if (params.device_ids) {
      request(`${server}/disposition/devices`, object).then(res => {
        setLoading(false);
        if (!res.code || res.code.slice(-4) != "0000") {
          setSuccess(false);
        } else {
          setSuccess(true);
          setData(res.data);
        }
      });
    } else {
      setLoading(false);
      setSuccess(true);
      setData([]);
    }
  }

  //获取item进行展示
  const renderRow = (item, i) => {
    let imgPic = "";
    if (item.status == 1) {
      imgPic = "/static/2x/device_on.png";
    } else {
      imgPic = "/static/2x/deivce_off.png";
    }
    return (
      <div className={styles.cardDiv}>
        <div className={styles.topDiv}>
          <div style={{ display: "inline-block" }}>
            <img src={imgPic} width={21} height={13}></img>
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
          <List
            data={datas}
            refresh={false}
            isRefresh={false}
            renderFooter={
              <div style={{ height: 10, textAlign: "center" }} />
            }
            wrapHeight={"calc(100vh - 45px)"}
            renderRow={renderRow}
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
