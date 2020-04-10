import React from "react";
import router from "next/router";
import Item from "@/components/IndexItem/index";
import { observer } from "mobx-react";
import { inject } from "@/contexts/store";
import styles from "./styles/index.less";

@inject("warnStore")
@observer
class Home extends React.Component {
  render() {
    const { warnStore } = this.props;
    return (
      <div className="container">
        <div className={styles.top}>
          <img className={styles.about} onClick={() => router.push("/about")} src="/static/2x/about.png" alt="" />
        </div>
        <div className={styles.content}>
          <Item
            icon="static/2x/disposition.png"
            className={styles.item}
            name="人像布控"
            value="Portra"
            onClick={() => router.push("/execute-control")}
          />
          <Item
            icon="static/2x/warn.png"
            className={styles.item}
            flag={warnStore.newsFlag}
            value="Alarm"
            name="告警"
            onClick={() => router.push("/warn-list")}
          />
        </div>
        <div className={styles.bottom}>
          <img className={styles.icon} src="/static/2x/more.png" alt="" />
          <div className={styles.more}>更多内容,敬请期待</div>
        </div>
      </div>
    );
  }
}

export default Home;
