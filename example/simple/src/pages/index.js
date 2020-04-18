/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import router from "next/router";
import { observer } from "mobx-react";
import useStores from "@/hooks/useStores";
import Item from "@/components/IndexItem";
import routes from "@/routes";
import { getDpr } from "@/utils/utils";
// import LoadImg from "@/components/ImgLoad";
import styles from "@/styles/home/index.less";

function routeChange(route) {
  router.push(route.path);
}

const moduleListData = [
  {
    icon: "home/disposition",
    class: styles.item,
    name: "人像布控",
    value: "Portra",
    event: () => routeChange(routes.executeControl)
  },
  {
    icon: "home/warn",
    class: styles.item,
    name: "告警",
    value: "Alarm",
    event: () => routeChange(routes.warnList)
  }
];

const Home = observer(() => {
  const { warnStore } = useStores();
  const { newsFlag } = warnStore;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img onClick={() => routeChange(routes.about)} className={styles.about} src={getDpr("home/about")} alt="" />
        {/* <LoadImg src="static/images/home/test.jpg" width={16} height={9} /> */}
        {/* <div className={styles.text}>掌上作战室</div> */}
      </div>
      <div className={styles.content}>
        {moduleListData.map((v, i) => (
          <Item
            key={i}
            icon={getDpr(v.icon)}
            className={v.class}
            flag={v.value === "Alarm" ? newsFlag : false}
            value={v.value}
            name={v.name}
            onClick={v.event}
          />
        ))}
      </div>
      <div className={styles.bottom}>
        <img className={styles.icon} src={getDpr("home/more")} alt="" />
        <div className={styles.more}>更多内容,敬请期待</div>
      </div>
    </div>
  );
});

export default Home;
