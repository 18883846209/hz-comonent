import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Item from "@/components/WarnItem/index";
import styles from "./styles/index.less";

const Index = () => (
  <div className={styles.main}>
    <Item />
  </div>
);
Index.getInitialProps = async () => {
  return {};
};
Index.propTypes = {
  timerNum: PropTypes.number
};

export default Index;
