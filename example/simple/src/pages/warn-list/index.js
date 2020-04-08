import React from "react";
import PropTypes from "prop-types";
import router from "next/router";
import Item from "@/components/WarnItem/index";
import styles from "./styles/index.less";

const Index = () => (
  <div className={styles.main}>
    {new Array(10).fill(1).map((item, index) => (
      <Item onClick={() => router.push("/warn-detail")} key={index} value={item} />
    ))}
  </div>
);
Index.getInitialProps = async () => {
  return {};
};
Index.propTypes = {
  timerNum: PropTypes.number
};

export default Index;
