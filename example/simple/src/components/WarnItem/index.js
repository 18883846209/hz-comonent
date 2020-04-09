import React from "react";
import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import { Progress, Item, Card } from "@/components/WarnComponents/index";
import styles from "./styles/index.less";

const Warn = ({ onClick }) => (
  <div className={styles.warn_item} onClick={onClick}>
    <div className={styles.top}>
      <Flex justify="between">
        <div className={styles.left}>姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名</div>
        <div className={styles.right}>20秒</div>
      </Flex>
    </div>
    <div>
      <Flex className={styles.bottom}>
        <Card
          url="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          className={styles.img}
          text="抓拍照"
        />
        <Card
          url="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          text="布控照"
        />
        <div className={styles.right}>
          <div className={styles.desc}>
            <Item desc="asdasdasd测试测试asdasdasd测试测试asdasdasd测试测试" />
            <Item />
          </div>
          <Progress percent={50} />
        </div>
      </Flex>
    </div>
  </div>
);
Warn.getInitialProps = async () => {
  return {};
};

Warn.propTypes = {
  onClick: PropTypes.func
};

export default Warn;
