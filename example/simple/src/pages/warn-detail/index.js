import React from "react";
// import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import { Progress, Item, Card } from "@/components/WarnComponents/index";
import styles from "./styles/index.less";

const Detail = () => (
  <div className={styles.detail}>
    <div className={styles.name}>库尔班·热合曼·买买提</div>
    <div className={styles.similar}>
      <Progress percent={80} />
    </div>
    <Flex justify="center" className={styles.picture}>
      <Flex.Item>
        <Card text="布控照" position="top" />
      </Flex.Item>
      <Flex.Item>
        <Card text="抓拍照" position="top" />
      </Flex.Item>
      <Flex.Item>
        <Card text="全景照" position="top" />
      </Flex.Item>
    </Flex>
    <div className={styles.desc}>
      <Item desc="男" />
      <Item desc="身份证" />
      <Item desc="名单库" />
      <Item desc="时间" />
      <Item desc="地点" />
    </div>
  </div>
);
Detail.getInitialProps = async () => {
  return {};
};

export default Detail;
