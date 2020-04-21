import React, { useEffect } from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import { NavBar, Icon } from "antd-mobile";
import { observer } from "mobx-react";
// import request from "@/utils/request";
import useStores from "@/hooks/useStores";
import socket from "@/utils/socket";
import globalConfig from "@/utils/getConfig";
import { getCookie } from "@/utils/cookie";
import routesMap from "@/routes";
import styles from "./styles/index.less";

// const routes = {
//   "/": "掌上作战室",
//   "/warn-list": "告警列表",
//   "/warn-detail": "告警详情",
//   "/execute-devices": "布控区域",
//   "/execute-control": "人像布控列表",
//   "/execute-details": "人像布控详情",
//   "/about": "关于"
// };
const { websocket = "" } = globalConfig;
const routes = {};
Object.keys(routesMap).forEach(item => {
  routes[routesMap[item].path] = routesMap[item].name;
});

const isHome = router => {
  return router.pathname === "/";
};

const goBack = router => {
  const path = router.pathname;
  const listPath = routesMap.warnList.path;
  const detailPath = routesMap.warnDetail.path;
  const homePath = routesMap.home.path;
  if (path === detailPath) {
    return router.push(listPath);
  }
  if (path === listPath) {
    return router.replace(homePath);
  }
  return router.back();
};

// 保存配置
// const saveConfig = async () => {
//   const res = await request(`${server}/settings`, {
//     method: "POST",
//     body: {
//       settings: [
//         { key: "homeTopBg", value: 1, desc: "首页背景图片" },
//         {
//           key: "Portra",
//           value: JSON.stringify({
//             name: "人像布控",
//             enName: "Portra",
//             icon: 1
//           }),
//           desc: "首页人像布控模块"
//         },
//         {
//           key: "Alarm",
//           value: JSON.stringify({
//             name: "告警",
//             enName: "Alarm",
//             icon: 1
//           }),
//           desc: "首页告警模块"
//         }
//       ]
//     }
//   });
//   return res;
// };

// // 获取配置
// const queryConfig = async () => {
//   const res = await request(`${server}/settings`);
//   if (res.isSuccess) {
//     return res.res || [];
//   }
//   return [];
// };
const disconnect = stomp => {
  if (stomp && typeof stomp.disconnect === "function") stomp.disconnect();
};

const Base = observer(({ children }) => {
  const { warnStore } = useStores();
  const { newsFlag } = warnStore;
  const router = useRouter();
  useEffect(() => {
    // queryConfig().then(res => {
    //   configStore.getConfig(JSON.stringify(res.slice(5)));
    //   // console.log("111111", configStore.config);
    // });
    let stomp;
    disconnect(stomp);
    socket(`${websocket}/endpointWisely`).then(sock => {
      stomp = sock;
      stomp.connect({}, () => {
        stomp.subscribe(`/user/${getCookie("userCode")}/alarm_face`, () => {
          warnStore.changeFlag(true);
        });
      });
    });

    return () => {
      disconnect(stomp);
    };
  }, []);
  const LeftContent = !isHome(router) ? <Icon type="left" /> : null;
  const Title = () => (
    <div className={styles.title}>
      {routes[router.pathname] || ""}
      {newsFlag && router.pathname === "/warn-list" ? <span className={styles.flag}>●</span> : null}
    </div>
  );
  return isHome(router) ? (
    <div>{children}</div>
  ) : (
    <div className={styles.nav}>
      <NavBar mode="dark" leftContent={LeftContent} onLeftClick={() => goBack(router)}>
        <Title />
      </NavBar>
      <div className={styles.main}>{children}</div>
    </div>
  );
});

Base.propTypes = {
  children: propTypes.node,
  showBack: propTypes.bool,
  showRight: propTypes.bool
};

export default Base;
