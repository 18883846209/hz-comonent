import React from "react";
import router from "next/router";
import { observer } from "mobx-react";
import useStores from "@/hooks/useStores";
import Item from "@/components/IndexItem";
import routes from "@/routes";
import styles from "./styles/index.less";
function routeChange(route) {
  router.push(route.path);
}

const Home = observer(() => {
  const { warnStore } = useStores();
  const { newsFlag } = warnStore;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img className={styles.about} onClick={() => routeChange(routes.about)} src="/static/2x/about.png" alt="" />
      </div>
      <div className={styles.content}>
        <Item
          icon="static/2x/disposition.png"
          className={styles.item}
          name="人像布控"
          value="Portra"
          onClick={() => routeChange(routes.executeControl)}
        />
        <Item
          icon="static/2x/warn.png"
          className={styles.item}
          flag={newsFlag}
          value="Alarm"
          name="告警"
          onClick={() => routeChange(routes.warnList)}
        />
      </div>
      <div className={styles.bottom}>
        <img className={styles.icon} src="/static/2x/more.png" alt="" />
        <div className={styles.more}>更多内容,敬请期待</div>
      </div>
    </div>
  );
});

export default Home;
