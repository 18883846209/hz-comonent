import React, { useState, useEffect } from "react";
import router from "next/router";
import { Toast } from "antd-mobile";
import WarnItem from "@/components/WarnItem";
import { EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
import { PullDownRefresh } from "@/components/PullToRefresh";
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
    if (res.code !== "0000") {
      Toast.info(res.message, 2, null);
    }
    if (!res.data) return [];
    return res.data.face_notification_res || [];
  }
  return loading ? (
    <LoadingPage />
  ) : !data.length ? (
    <EmptyNoDataPage />
  ) : (
    <div className={styles.main}>
      <PullDownRefresh
        direction="down"
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
            warnStore.changeFlag(false);
          }, 2000);
        }}
      >
        <List>
          {(data || []).map((item, index) => (
            <Item multipleLine onClick={() => goDetail(item)} key={index}>
              <WarnItem item={item} />
            </Item>
          ))}
        </List>
      </PullDownRefresh>
    </div>
  );
});

export default Index;
