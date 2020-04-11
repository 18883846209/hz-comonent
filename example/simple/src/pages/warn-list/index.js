import React, { useState } from "react";
import router from "next/router";
import WarnItem from "@/components/WarnItem";
import { EmptyNoDataPage } from "@/components/EmptyPage";
import { PullToRefresh } from "antd-mobile";
import { observer } from "mobx-react";
import List from "@/components/List";
// import request from "@/utils/request";
import useStores from "@/hooks/useStores";
import styles from "./styles/index.less";
const { Item } = List;
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
      {/* <PullToRefresh
        damping={60}
        style={{
          height: "calc(100vh - 55px)",
          overflow: "auto"
        }}
        direction={"down"}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
            warnStore.changeFlag(false);
          }, 2000);
        }}
      > */}
      {/* {new Array(1).fill({ name: "11" }).map((item, index) => (
          <WarnItem onClick={() => goDetail(item)} key={index} item={item} />
        ))} */}
      <List>
        {new Array(10).fill({ name: "nametest" }).map((item, index) => (
          <Item multipleLine onClick={() => goDetail(item)} key={index}>
            <WarnItem item={item} />
          </Item>
        ))}
      </List>
      {/* </PullToRefresh> */}
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
