import React, { useState, useEffect } from "react";
import { setStore, getStore } from "@/utils/localStorage";
import { getDpr } from "@/utils/utils";
import styles from "./styles/index.less";

/** 蒙层 */
const Mask = () => {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    const first = getStore("isFirst");
    if (first === 1) {
      setIsFirst(false);
    } else {
      setIsFirst(true);
      setStore("isFirst", 1);
    }
  }, []);

  return isFirst ? (
    <div className={styles.mask} onClick={() => setIsFirst(false)}>
      <img alt="" className={styles.background} src={getDpr('executeControl/background')} />
      <div className={styles.mask} />
      <img
        className={styles.example}
        src={getDpr('executeControl/example', '.gif')}
        alt=""
      />
    </div>
  ) : null;
};

export default Mask;
