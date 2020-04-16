import React, { useState, useEffect } from "react";
import router from "next/router";
import styles from "./styles/index.less";
import request from "@/utils/request";
import dynamic from "next/dynamic";
import { EmptyFailedPage, EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage/index";

const List = dynamic(import("@/components/List"), {
  ssr: false
});

var params = {};

const DeviceList = () => {
  const [datas, setData] = useState([]);
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
    request(`${server}/disposition/devices`, object).then(res => {
      setLoading(false);
      if (!res.code || res.code != "0000") {
        setSuccess(false);
      } else {
        setSuccess(true);
        setData(res.data);
      }
    }); 
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
