import React from "react";
import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import TouchFeedback from "rmc-feedback";
import { Progress, Item, Card } from "@/components/WarnComponents/index";
import { getCalculateTime } from "@/utils/utils";
import styles from "./styles/index.less";

const Warn = ({ onClick, item = {}, style }) => {
  return (
    <TouchFeedback activeClassName="active">
      <div className={styles.warn_item} style={style} onClick={onClick}>
        <div className={styles.top}>
          <Flex justify="between">
            <div className={styles.left}>{item.name}</div>
            <div className={styles.right}>
              <img src="/static/2x/time.png" alt="" />
              <span>{getCalculateTime(Number(item.notification_time))}</span>
            </div>
          </Flex>
        </div>
        <div className={styles.bottom}>
          <Flex>
            <Card url={item.captured_image_url} width={136} height={182} className={styles.img} text="抓拍照" />
            <Card url={item.target_image_url} width={136} height={182} text="布控照" />
            <div className={styles.right}>
              <div className={styles.desc}>
                <Item src="/static/warn/list_name@3x.png" desc={item.face_disposition_name || ""} />
                <Item src="/static/warn/list_position@3x.png" desc={item.device_name || ""} />
              </div>
              <Progress percent={item.alarm_score || 0} />
            </div>
          </Flex>
        </div>
      </div>
    </TouchFeedback>
  );
};

Warn.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.number,
  style: PropTypes.object
};

export default Warn;
