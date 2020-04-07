import React from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import { NavBar } from "antd-mobile";

const Base = ({ children, showRight = false, showBack = true }) => {
  const router = useRouter();
  function onBack() {
    router.back();
  }
  const LeftContent = showBack ? "返回" : null;
  const RightContent = showRight ? "..." : null;
  return (
    <>
      <NavBar mode="dark" leftContent={LeftContent} rightContent={RightContent} onLeftClick={onBack}>
        标题
      </NavBar>
      {children}
    </>
  );
};

Base.propTypes = {
  children: propTypes.node,
  showBack: propTypes.bool,
  showRight: propTypes.bool
};

export default Base;
