import React from "react";
import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import { Progress, Card } from "@/components/WarnComponents/index";
import styles from "./styles/index.less";

const Item = ({ name, value, src }) => (
  <div className={styles.wrap}>
    <Flex justify="between">
      <div className={styles.key}>
        <Flex>
          <img src={src} alt="" />
          <div>{name}</div>
        </Flex>
      </div>
      <div className={styles.value}>{value}</div>
    </Flex>
  </div>
);

const Detail = () => (
  <div className={styles.detail}>
    <div className={styles.bg}></div>
    <div className={styles.top}>
      <div className={styles.name}>库尔班·热合曼·买买提</div>
      <div className={styles.similar}>
        <Progress percent={80} />
      </div>
      <div className={styles.center}>
        <Card
          url="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          text="布控照"
          className={styles.img}
        />
        <Card
          url="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          text="抓拍照"
          className={styles.img}
        />
        <Card
          url="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          text="全景照"
          className={styles.full_wrap}
          imgClass={styles.full_img}
        />
      </div>
    </div>
    <div className={styles.bottom}>
      <Item src="/static/3x/detail_sex.png" name="性别" value="男" />
      <Item src="/static/3x/detail_card.png" name="身份证号" value="5002328994820491934" />
      <Item src="/static/3x/detail_disposition.png" name="布控名单" value="王警官测试黑名单布控" />
      <Item src="/static/3x/detail_time.png" name="时间" value="2020-04-12 19:09:32" />
      <Item
        src="/static/3x/detail_position.png"
        name="位置"
        value="重庆市南岸区走马楼街道明网点网重庆市南岸区走马楼街道明网点网
小区监控点"
      />
    </div>
  </div>
);

Item.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  src: PropTypes.string
};

export default Detail;
