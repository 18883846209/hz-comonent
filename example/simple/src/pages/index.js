/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from "react";
import router from "next/router";
import { Toast } from "antd-mobile";
import { observer } from "mobx-react";
import useStores from "@/hooks/useStores";
import { Menu, More } from "@/components/IndexItem";
import routes from "@/routes";
import request from "@/utils/request";
import globalConfig from "@/utils/getConfig";
import { getDpr, pxToRem } from "@/utils/utils";
// import LoadImg from "@/components/ImgLoad";
import styles from "@/styles/home/index.less";

function routeChange(route) {
  router.push(route.path);
}

const queryUnreadMsg = async () => {
  const { server = "" } = globalConfig;
  try {
    const res = await request(`${server}/notification/face/unread`, {
      method: "GET"
    });
    if (!res.isSuccess || res.res.message) {
      Toast.info(res.res.message || "未获取到告警数据", 2, null);
      return 0;
    }
    return res.res.unread_count;
  } catch (err) {
    throw err;
  }
};

const moduleListData = [
  {
    icon: "home/disposition",
    name: "人像布控",
    value: "Portra",
    event: () => routeChange(routes.executeControl)
  },
  {
    icon: "home/warn",
    name: "告警",
    value: "Alarm",
    event: () => routeChange(routes.warnList)
  }
];

const Home = observer(() => {
  const { warnStore } = useStores();
  const { newsFlag } = warnStore;
  // const { config } = configStore;
  const isOdd = moduleListData.length % 2 === 0;
  const [bottomHeight, setBottom] = useState(200);
  // const [configs, setConfig] = useState(config);
  // useEffect(() => {
  //   setConfig(config);
  // }, [config]);
  useEffect(() => {
    const top = document.getElementById("bottom").getBoundingClientRect().y;
    setBottom(`calc(100vh - ${top}px - ${pxToRem(15)} )`);
    queryUnreadMsg().then(msg => {
      if (msg > 0) {
        warnStore.changeFlag(true);
      }
    });

    return () => {
      Toast.hide();
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img onClick={() => routeChange(routes.about)} className={styles.about} src={getDpr("home/about")} alt="" />
        {/* <LoadImg src="static/images/home/test.jpg" width={16} height={9} /> */}
        {/* <div className={styles.text}>掌上作战室</div> */}
      </div>
      <div className={styles.content}>
        {moduleListData.map((v, i) => (
          <Menu
            key={i}
            icon={getDpr(v.icon)}
            flag={v.value === "Alarm" ? newsFlag : false}
            value={v.value}
            name={v.name}
            onClick={v.event}
          />
        ))}
        {!isOdd ? <More icon={getDpr("home/more")} /> : null}
      </div>
      {isOdd ? (
        <div className={styles.bottom} id="bottom" style={{ height: bottomHeight }}>
          <img className={styles.icon} src={getDpr("home/more")} alt="" />
          <div className={styles.more}>更多内容,敬请期待</div>
        </div>
      ) : null}
    </div>
  );
});

export default Home;
