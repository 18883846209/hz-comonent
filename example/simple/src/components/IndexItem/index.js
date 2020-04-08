import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./styles/index.less";

const Module = ({ text, icon, style, className, onClick }) => (
  <div className={classnames(styles.container, className)} style={style}>
    <div className={styles.wrap} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{text}</div>
    </div>
  </div>
);
Module.getInitialProps = async () => {
  return {};
};
Module.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default Module;
