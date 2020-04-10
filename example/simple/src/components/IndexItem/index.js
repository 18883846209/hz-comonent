import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./styles/index.less";

// const Menu = ({ text, icon, style, className, onClick, flag }) => (
const Menu = ({ name, value, onClick, flag, icon, className }) => (
  // <div className={classnames(styles.container, className)} style={style}>
  //   <div className={styles.wrap} onClick={onClick}>
  //     <div className={styles.icon}>{icon}</div>
  //     <div className={styles.text}>
  //       <div>{text}</div>
  //       <div></div>
  //     </div>
  //     {flag ? <span className={styles.flag}>●</span> : null}
  //   </div>
  // </div>
  <div className={classnames(styles.wrap, className)} onClick={onClick}>
    <div className={styles.left}>
      <img src={icon} alt="" />
    </div>
    <div className={styles.right}>
      <div className={styles.name}>{name}</div>
      <div className={styles.en}>{value}</div>
    </div>
    {flag ? <span className={styles.flag}>●</span> : null}
  </div>
);
Menu.propTypes = {
  // text: PropTypes.string,
  className: PropTypes.string,
  // style: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  flag: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string
};

export default Menu;
