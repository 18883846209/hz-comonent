import React, { useState, useEffect } from "react";
import router from "next/router";
import { Toast } from "antd-mobile";
import WarnItem from "@/components/WarnItem";
import { EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
import { PullDownRefresh } from "@/components/PullToRefresh";
import { memoTransition } from "@/components/MemoTransition";
import { observer } from "mobx-react";
import List from "@/components/List";
import request from "@/utils/request";
import useStores from "@/hooks/useStores";
import styles from "./styles/index.less";
const { Item } = List;
const Index = observer(() => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { warnStore } = useStores();
  useEffect(() => {
    getList().then(data => {
      setData(data);
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
    getList().then(data => {
      setRefreshing(false);
      setData(data);
      warnStore.changeFlag(false);
    });
  }
  return loading ? (
    <LoadingPage />
  ) : (
    <PullDownRefresh direction="down" refreshing={refreshing} onRefresh={refresh}>
      {!data.length ? (
        <EmptyNoDataPage />
      ) : (
        <div className={styles.main}>
          <List>
            {(data || []).map((item, index) => (
              <Item multipleLine onClick={() => goDetail(item)} key={index}>
                <WarnItem item={item} />
              </Item>
            ))}
          </List>
        </div>
      )}
    </PullDownRefresh>
  );
});

export default memoTransition(Index);
