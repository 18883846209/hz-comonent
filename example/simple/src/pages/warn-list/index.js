import React, { useState } from "react";
import router from "next/router";
import Item from "@/components/WarnItem/index";
import { PullToRefresh } from "antd-mobile";
import { observer } from "mobx-react";
import useStores from "@/hooks/useStores";
import styles from "./styles/index.less";

const Index = observer(() => {
  const [refreshing, setRefreshing] = useState(false);
  const { warnStore } = useStores();
  function goDetail(query) {
    // console.log("====", query);
    router.push({
      pathname: "/warn-detail",
      query
    });
  }
  return (
    <div className={styles.main}>
      <PullToRefresh
        damping={60}
        style={{
          // height: "calc(100vh - 55px)",
          height: "100%",
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
      </PullToRefresh>
    </div>
  );
});
Index.getInitialProps = async () => {
  return { test: 1 };
};

export default Index;
