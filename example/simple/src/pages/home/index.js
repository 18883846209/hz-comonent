import React from "react";
import router from "next/router";
import Item from "@/components/IndexItem/index";
import styles from "./styles/index.less";

const Home = () => {
  return (
    <div className="container">
      <div className={styles.top}>掌上作战室</div>
      <div className={styles.content}>
        <Item className={styles.item} text="人像布控" />
        <Item className={styles.item} text="告警" onClick={() => router.push("/warn-list")} />
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  return {};
};

export default Home;
