import React from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import { NavBar } from "antd-mobile";
import { observer } from "mobx-react";
import useStores from "@/hooks/useStores";
import styles from "./styles/index.less";

const routes = {
  "/": "掌上作战室",
  "/warn-list": "告警列表",
  "/warn-detail": "告警详情",
  "/devices": "布控区域",
  // "/deviceList": "布控区域",
  "/execute-control": "人像布控列表",
  "/execute-details": "人像布控详情"
};

const Base = observer(({ children, showRight = false, showBack = true }) => {
  const router = useRouter();
  const { warnStore } = useStores();
  console.log("++++++", warnStore.newsFlag);
  function onBack() {
    if (router.asPath !== "/") {
      router.back();
    } else {
      router.replace("/");
    }
  }
  const LeftContent = showBack && router.asPath !== "/" ? "返回" : null;
  const RightContent = showRight ? "..." : null;
  const Title = () => (
    <div className={styles.title}>
      {routes[router.asPath] || ""}
      {warnStore.newsFlag && router.asPath === "/warn-list" ? <span className={styles.flag}>●</span> : null}
    </div>
  );
  return (
    <>
      <NavBar mode="dark" leftContent={LeftContent} rightContent={RightContent} onLeftClick={onBack}>
        <Title />
      </NavBar>
      <div className={styles.main} style={{ height: "calc(100vh - 45px)" }}>
        {children}
      </div>
    </>
  );
});

Base.propTypes = {
  children: propTypes.node,
  showBack: propTypes.bool,
  showRight: propTypes.bool
};

export default Base;
