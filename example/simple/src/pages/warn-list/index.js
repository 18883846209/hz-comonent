import React, { useState, useEffect, useCallback } from "react";
import router from "next/router";
import dynamic from "next/dynamic";
import { Toast } from "antd-mobile";
import { observer } from "mobx-react";
import request from "@/utils/request";
import useStores from "@/hooks/useStores";
import WarnItem from "@/components/WarnItem";
import globalConfig from "@/utils/getConfig";
import Empty from "@/components/Empty";
import routes from "@/routes";
import styles from "@/styles/warn/list.less";

const List = dynamic(import("@/components/List"), {
  ssr: false
});
const pageSize = 15;
const parseData = res => {
  if (!res || !res.data) return [];
  return res.data;
};
const goDetail = (query, _router) => {
  _router.push({
    pathname: routes.warnDetail.path,
    query
  });
};
const Index = observer(() => {
  const [refreshing, setRefreshing] = useState(false);
  const [footLoading, onEndReached] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { warnStore } = useStores();
  const getList = useCallback(
    async (page_num = 1, page_size = pageSize) => {
      const { server = "" } = globalConfig;
      try {
        const res = await request(`${server}/notification/face/list`, {
          method: "POST",
          body: {
            page_num,
            page_size
          }
        });
        setLoading(false);
        if (!res.isSuccess || res.res.message) {
          Toast.info(res.res.message || "未获取到数据", 2, null);
          return {};
        }
        return res.res;
      } catch (e) {
        setData([]);
        setLoading(false);
        setRefreshing(false);
        onEndReached(false);
      }
    },
    [page, pageSize]
  );
  useEffect(() => {
    getList().then(res => {
      setData(parseData(res));
      warnStore.changeFlag(false);
    });
    return () => {
      Toast.hide();
    };
  }, []);

  function refresh() {
    if (refreshing) return;
    setRefreshing(true);
    getList().then(res => {
      setPage(1);
      setData(data.concat(parseData(res)));
      setRefreshing(false);
      warnStore.changeFlag(false);
    });
  }
  function endReached() {
    if (footLoading) return;
    onEndReached(true);
    getList(page + 1).then(res => {
      setData(data.concat(parseData(res)));
      onEndReached(false);
      if (res.paging.total > data.length) {
        setPage(page + 1);
      }
    });
  }
  function renderRow(item) {
    return <WarnItem item={item} onClick={() => goDetail(item, router)} key={item.record_id} />;
  }

  return loading || !data.length ? (
    <Empty loading={loading} data={data} refresh={refreshing} onRefresh={refresh} />
  ) : (
    <div className={styles.main}>
      <List
        data={data}
        loading={footLoading}
        onEndReached={endReached}
        refresh={refreshing}
        onRefresh={refresh}
        renderRow={renderRow}
      />
    </div>
  );
});

export default Index;
