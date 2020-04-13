import React, { useState, useEffect } from "react";
import router from "next/router";
import dynamic from "next/dynamic";
import { Toast } from "antd-mobile";
import WarnItem from "@/components/WarnItem";
import { EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
// import { PullDownRefresh } from "@/components/PullToRefresh";
import { memoTransition } from "@/components/MemoTransition";
import { observer } from "mobx-react";
// import List from "@/components/List";
import request from "@/utils/request";
import useStores from "@/hooks/useStores";
import styles from "./styles/index.less";
const Lists = dynamic(import("@/components/List"), {
  ssr: false
});
const Index = observer(() => {
  const [refreshing, setRefreshing] = useState(false);
  const [footLoading, onEndReached] = useState(false);
  const [data, setData] = useState(new Array(5).fill({}));
  const [loading, setLoading] = useState(true);
  const { warnStore } = useStores();
  useEffect(() => {
    // getList().then(data => {
    //   setData(ds.cloneWithRows(data));
    // });
    return () => {
      Toast.hide();
    };
  }, []);
  function goDetail(query) {
    router.push({
      pathname: "/warn-detail",
      query
    });
  }

  async function getList() {
    const { server = "" } = window.hzConfig;
    const res = await request(`${server}/notification/face/list`, {
      headers: {
        User: 123456
      }
    });
    setLoading(false);
    if (res.message !== "success") {
      Toast.info(res.message, 2, null);
    }
    if (!res.data) return [];
    return res.data.face_notification_res || [];
  }
  function refresh() {
    setRefreshing(true);
    // getList().then(data => {
    //   setRefreshing(false);
    //   setData(data);
    //   warnStore.changeFlag(false);
    // });
    setTimeout(() => {
      setRefreshing(false);
      // setData(data);
      warnStore.changeFlag(false);
    }, 1000);
  }
  function endReached() {
    onEndReached(true);
    setTimeout(() => {
      onEndReached(false);
      setData(new Array(15).fill({}));
    }, 1500);
  }
  function renderRow(item) {
    return <WarnItem item={item} onClick={() => goDetail(item)} key={JSON.stringify(item)} />;
  }
  return !loading ? (
    <LoadingPage />
  ) : !data.length ? (
    <EmptyNoDataPage />
  ) : (
    <div className={styles.main}>
      <Lists
        data={data}
        loading={footLoading}
        onEndReached={endReached}
        refresh={refreshing}
        onRefresh={refresh}
        renderRow={renderRow}
      ></Lists>
    </div>
  );
});

export default memoTransition(Index);
