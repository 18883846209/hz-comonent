import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./styles/index.less";

const Menu = ({ text, icon, style, className, onClick, flag }) => (
  <div className={classnames(styles.container, className)} style={style}>
    <div className={styles.wrap} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{text}</div>
      {flag ? <span className={styles.flag}>●</span> : null}
    </div>
  </div>
);
Menu.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  flag: PropTypes.bool
};

export default Menu;
