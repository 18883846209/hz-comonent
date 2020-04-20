import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import TouchFeedback from "rmc-feedback";
import styles from "./styles/index.less";

export const Menu = ({ name, value, onClick, flag, icon, className }) => {
  return (
    <TouchFeedback activeClassName="active">
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
    </TouchFeedback>
  );
};
export const More = ({ icon }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <img src={icon} alt="" />
      </div>
      <div className={styles.right}>
        <div className={styles.en}>更多内容</div>
        <div className={styles.en}>敬请期待</div>
      </div>
    </div>
  );
};

More.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Menu.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  flag: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string
};
