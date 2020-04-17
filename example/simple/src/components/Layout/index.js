import React, { useEffect } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import { NavBar, Icon } from "antd-mobile";
import { observer } from "mobx-react";
import useStores from "@/hooks/useStores";
import socket from "@/utils/socket";
import globalConfig from "@/utils/getConfig";
import { getCookie } from "@/utils/cookie";
import styles from "./styles/index.less";

const routes = {
  "/": "掌上作战室",
  "/warn-list": "告警列表",
  "/warn-detail": "告警详情",
  "/execute-devices": "布控区域",
  "/execute-control": "人像布控列表",
  "/execute-details": "人像布控详情",
  "/about": "关于"
};

const Base = observer(({ children, showBack = true }) => {
  const router = useRouter();
  const { warnStore } = useStores();
  const { newsFlag } = warnStore;
  const home = router.pathname === "/";
  useEffect(() => {
    const { websocket = "" } = globalConfig;
    let stomp;
    socket(`${websocket}/endpointWisely`).then(stomp => {
      stomp = stomp;
      stomp.connect({}, () => {
        stomp.subscribe(`/user/${getCookie("userCode")}/alarm_face`, () => {
          warnStore.changeFlag(true);
        });
      });
    });

    return () => {
      stomp && stomp.over();
    };
  }, []);
  function onBack() {
    if (!home) {
      router.back();
    } else {
      router.replace("/");
    }
  }
  const LeftContent = showBack && !home ? <Icon type="left" /> : null;
  const Title = () => (
    <div className={styles.title}>
      {routes[router.pathname] || ""}
      {newsFlag && router.pathname === "/warn-list" ? <span className={styles.flag}>●</span> : null}
    </div>
  );
  return home ? (
    <div className={styles.main}>{children}</div>
  ) : (
    <div className={styles.nav}>
      <NavBar mode="dark" leftContent={LeftContent} onLeftClick={onBack}>
        <Title />
      </NavBar>
      <div className={styles.main} style={{ height: "calc(100vh - 45px)" }}>
        {children}
      </div>
    </div>
  );
});

Base.propTypes = {
  children: propTypes.node,
  showBack: propTypes.bool,
  showRight: propTypes.bool
};

export default Base;
