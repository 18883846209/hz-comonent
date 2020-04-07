import React, {useState} from "react";
import router from "next/router";
import PropTypes from "prop-types";
import Item from "@/components/IndexItem/index";
import styles from "./styles/index.less";

const Home = () => {
  const [] = useState();
  return (
    <div className="container">
      <div className={styles.top}>掌上作战室</div>
      <div className={styles.content}>
        <Item className={styles.item} text="人像布控" />
        <Item className={styles.item} text="告警" onClick={() => router.push("/warn-list")} />
      </div>
    </div>
  );
}

export default Home;
