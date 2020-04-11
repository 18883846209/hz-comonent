import React, { useState } from "react";
import router from "next/router";
import Item from "@/components/WarnItem";
import { EmptyNoDataPage } from "@/components/EmptyPage";
import { PullToRefresh } from "antd-mobile";
import { observer } from "mobx-react";
// import List from "@/components/VirtualList";
// import { List } from "react-virtualized";
// import request from "@/utils/request";
import useStores from "@/hooks/useStores";
import styles from "./styles/index.less";

const Index = observer(({ data }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { warnStore } = useStores();
  function goDetail(query) {
    router.push({
      pathname: "/warn-detail",
      query
    });
  }

  return data.length ? (
    <EmptyNoDataPage />
  ) : (
    <div className={styles.main}>
      <PullToRefresh
        damping={60}
        style={{
          height: "calc(100vh - 55px)",
          overflow: "auto"
        }}
        // indicator={{
        //   release: <img width={325} src="/static/images/pulldown.gif" />
        // }}
        direction={"down"}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
            warnStore.changeFlag(false);
          }, 2000);
        }}
      >
        {new Array(10).fill(1).map((item, index) => (
          <Item onClick={() => goDetail(item)} key={index} value={item} />
        ))}
        {/* <List list={new Array(100).fill({})} Item={() => <Item onClick={() => goDetail({})} />} /> */}
      </PullToRefresh>
    </div>
  );
});
Index.getInitialProps = async () => {
  // const res = await request("http://192.168.100.127:8080/notification/face/list", {
  //   method: "POST",
  //   headers: {
  //     User: 1
  //   },
  //   body: {}
  // });
  // // const data = await res.data;
  // console.log(res.data);
  return { data: [] };
};

export default Index;
