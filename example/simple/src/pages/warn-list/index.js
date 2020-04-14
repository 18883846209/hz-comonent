import React, { useState, useEffect } from "react";
import router from "next/router";
import dynamic from "next/dynamic";
import { Toast, PullToRefresh } from "antd-mobile";
import WarnItem from "@/components/WarnItem";
import { EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
import { memoTransition } from "@/components/MemoTransition";
import { observer } from "mobx-react";
import request from "@/utils/request";
import useStores from "@/hooks/useStores";
import styles from "./styles/index.less";
const List = dynamic(import("@/components/List"), {
  ssr: false
});
const pageSize = 15;
const parseData = res => {
  if (!res || !res.data) return [];
  return res.data;
};
const Index = observer(() => {
  const [refreshing, setRefreshing] = useState(false);
  const [footLoading, onEndReached] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  const { warnStore } = useStores();
  useEffect(() => {
    getList().then(res => {
      setData(parseData(res));
    });
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

  async function getList(page_num = 1, page_size = pageSize) {
    const { server = "" } = window.hzConfig;
    try {
      const res = await request(`${server}/notification/face/list`, {
        method: "POST",
        body: {
          page_num,
          page_size
        }
      });
      setLoading(false);
      if (!res || res.message !== "success") {
        Toast.info(res.message || "未获取到数据", 2, null);
      }
      if (!res || !res.data) return {};
      return res.data;
    } catch (e) {
      setData([]);
      setLoading(false);
      setRefreshing(false);
      onEndReached(false);
    }
  }
  function refresh() {
    setRefreshing(true);
    getList().then(res => {
      setPage(1);
      setData(parseData(res));
      setRefreshing(false);
      warnStore.changeFlag(false);
    });
  }
  function endReached() {
    onEndReached(true);
    getList(page + 1).then(res => {
      setData(data.concat(parseData(res)));
      onEndReached(false);
      if (res.has_next) {
        setPage(page + 1);
      }
    });
  }
  function renderRow(item) {
    return <WarnItem item={item} onClick={() => goDetail(item)} key={item.record_id} />;
  }
  return loading ? (
    <LoadingPage />
  ) : !data.length ? (
    <PullToRefresh damping={30} refreshing={refreshing} onRefresh={refresh}>
      <EmptyNoDataPage />
    </PullToRefresh>
  ) : (
    <div className={styles.main}>
      <List
        data={data}
        loading={footLoading}
        onEndReached={endReached}
        refresh={refreshing}
        onRefresh={refresh}
        renderRow={renderRow}
      ></List>
    </div>
  );
});

export default memoTransition(Index);
