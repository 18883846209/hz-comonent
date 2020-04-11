import React from "react";
import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import { Progress, Item, Card } from "@/components/WarnComponents/index";
import { getCalculateTime } from "@/utils/utils";
import styles from "./styles/index.less";

const Warn = ({ onClick, item = {}, style }) => (
  <div className={styles.warn_item} style={style} onClick={onClick}>
    <div className={styles.top}>
      <Flex justify="between">
        <div className={styles.left}>{item.name}</div>
        <div className={styles.right}>
          <img src="/static/2x/time.png" alt="" />
          <span>{getCalculateTime(Date.now() - 190000000000)}</span>
        </div>
      </Flex>
    </div>
    <div className={styles.bottom}>
      <Flex>
        <Card
          url={
            item.captured_image_url ||
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          }
          className={styles.img}
          text="抓拍照"
        />
        <Card
          url={
            item.target_image_url ||
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          }
          text="布控照"
        />
        <div className={styles.right}>
          <div className={styles.desc}>
            <Item src="/static/3x/list_name.png" desc={item.face_library_name || "王警官测试黑名单布控"} />
            <Item
              src="/static/3x/list_position.png"
              desc={item.notification_place || "重庆市南岸区走马楼街道明网点网小区监控点"}
            />
          </div>
          <Progress percent={item.alarm_score || 70} />
        </div>
      </Flex>
    </div>
  </div>
);
Warn.getInitialProps = async () => {
  return {};
};

Warn.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.number,
  style: PropTypes.object
};

export default Warn;
