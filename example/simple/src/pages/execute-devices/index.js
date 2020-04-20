import React, { useState, useEffect } from "react";
import router from "next/router";
import styles from "@/styles/executeDevices/index.less";
import request from "@/utils/request";
import globalConfig from "@/utils/getConfig";
import dynamic from "next/dynamic";
import { EmptyFailedPage, EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage/index";

const List = dynamic(import("@/components/List"), {
  ssr: false
});

let params = {};

const DeviceList = () => {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  async function getData() {
    setLoading(true);
    const { server = "" } = globalConfig;
    const object = {
      body: JSON.parse(params.param),
      method: "POST"
    };
    request(`${server}/disposition/devices`, object).then(res => {
      setLoading(false);
      if (res.isSuccess) {
        setSuccess(true);
        setData(res.res || []);
      } else {
        setSuccess(false);
      }
    });
  }

  useEffect(() => {
    params = router.query;
    getData();
  }, []);

  // 获取item进行展示
  const renderRow = (item) => {
    let imgPic = "";
    if (item.status === 1) {
      imgPic = "/static/images/execute/device_on@3x.png";
    } else {
      imgPic = "/static/images/execute/device_off@3x.png";
    }
    return (
      <div className={styles.cardDiv}>
        <div className={styles.topDiv}>
          <div style={{ display: "inline-block" }}>
            <img src={imgPic} width={21} height={13} alt="" />
          </div>
          <div className={styles.titleDiv}>{item.device_name}</div>
        </div>
        <div className={styles.contentDiv}>{item.hierarchy_name}</div>
      </div>
    );
  };

  const listView = datas.length > 0 ? (
    <List
      data={datas}
      isRefresh={false}
      renderFooter={() => <div style={{ height: 10, textAlign: "center" }} />}
      wrapHeight="calc(100vh - 45px)"
      renderRow={renderRow}
    />
  ) : (
    <EmptyNoDataPage />
  )

  const finalPage = success ? listView : <EmptyFailedPage reloadAction={getData} />

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingPage />
      ) : finalPage}
    </div>
  );
};

export default DeviceList;


