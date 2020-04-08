import React from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import { NavBar } from "antd-mobile";
import styles from "./styles/index.less";

const routes = {
  "/": "掌上作战室",
  "/warn-list": "告警列表",
  "/warn-detail": "告警详情",
  "/devices": "布控区域"
};

const Base = ({ children, showRight = false, showBack = true }) => {
  const router = useRouter();
  function onBack() {
    if (router.asPath !== "/") {
      router.back();
    } else {
      router.replace("/");
    }
  }
  const LeftContent = showBack && router.asPath !== "/" ? "返回" : null;
  const RightContent = showRight ? "..." : null;
  return (
    <>
      <NavBar mode="dark" leftContent={LeftContent} rightContent={RightContent} onLeftClick={onBack}>
        {routes[router.asPath] || ""}
      </NavBar>
      <div className={styles.main} style={{ height: "calc(100vh - 45px)" }}>
        {children}
      </div>
    </>
  );
};

Base.propTypes = {
  children: propTypes.node,
  showBack: propTypes.bool,
  showRight: propTypes.bool
};

export default Base;
