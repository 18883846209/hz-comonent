import React from "react";
import { useRouter } from "next/router";
import propTypes from "prop-types";
import { NavBar } from "antd-mobile";

const Base = ({ children }) => {
  const router = useRouter();
  function onBack() {
    router.back();
  }
  return (
    <>
      <NavBar
        mode="dark"
        leftContent="返回"
        // rightContent={[
        //   <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
        //   <Icon key="1" type="ellipsis" />
        // ]}
        onLeftClick={onBack}
      >
        标题
      </NavBar>
      {children}
    </>
  );
};

Base.propTypes = {
  children: propTypes.node
};

export default Base;
