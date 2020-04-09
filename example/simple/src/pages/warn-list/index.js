import React, { useState } from "react";
import PropTypes from "prop-types";
import router from "next/router";
import Item from "@/components/WarnItem/index";
import { PullToRefresh } from "antd-mobile";
import { observer } from "mobx-react";
import useStores from "@/hooks/useStores";
import styles from "./styles/index.less";

const Index = observer(() => {
  const [refreshing, setRefreshing] = useState(false);
  const { warnStore } = useStores();
  return (
    <div className={styles.main}>
      <PullToRefresh
        damping={60}
        style={{
          height: "calc(100vh - 55px)",
          overflow: "auto"
        }}
        // indicator={{ activate: <div>laoddd</div> }}
        direction={"down"}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
            warnStore.changeFlag(false);
          }, 1000);
        }}
      >
        {new Array(10).fill(1).map((item, index) => (
          <Item onClick={() => router.push("/warn-detail")} key={index} value={item} />
        ))}
      </PullToRefresh>
    </div>
  );
});
Index.getInitialProps = async () => {
  return {};
};
Index.propTypes = {
  timerNum: PropTypes.number
};

export default Index;
