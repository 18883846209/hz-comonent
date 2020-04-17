import { List, Flex } from "antd-mobile";
import styles from "@/styles/executeDetails/index.less";
import moment from "moment";
import router from "next/router";
import { getRedirectStatus, getRedirectType } from "@/utils/common";
import { getCalculateTime } from "@/utils/utils";
import routes from "@/routes";
import { subscribe } from "@/services/executeControl";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useState } from "react";

const TITLE = [
  { key: "时段", value: "timeIcon" },
  { key: "区域", value: "position" },
  { key: "类型", value: "types" },
  { key: "目标", value: "target" },
  { key: "阈值", value: "threshold" },
  { key: "备注", value: "remarks" }
];

/** 布控区域 */
const executeArea = (ids = "") => {
  const list = ids ? ids.split(";") : [];
  return list.length;
};

/** 布控类型 */
const executeType = (type = 1) => {
  let typeStr = "名单库布控";
  switch (type) {
    case 1:
      typeStr = "名单库布控";
      break;
    case 2:
      typeStr = "单人布控";
      break;
    case 3:
      typeStr = "民族布控";
      break;
    default:
      break;
  }
  return typeStr;
};

function getContentList(data) {
  const { device_ids, disposition_target_type, tabs, describe, threshold } = data;
  const oData = {
    ...data,
    position: `${executeArea(device_ids)}个监控点`,
    types: executeType(disposition_target_type),
    target: tabs,
    remarks: describe,
    threshold: `≥${threshold}%`,
    showLink: `${executeArea(device_ids)}` !== "0"
  };

  return TITLE.map(item => {
    return { key: item.key, value: oData[item.value], img: item.value, showLink: oData.showLink };
  });
}

const ExecuteDetails = ({ item }) => {
  const [imgUrl, setImgUrl] = useState(`${item.subscribe_status}` === "0" ? "subscribe" : "cancel_subscribed");

  const subscribeHandler = action => {
    const { server = "" } = window.hzConfig;
    subscribe({
      action,
      disposition_id: item.disposition_id
    }, server).then(result => {
      setImgUrl(action ? "cancel_subscribed" : "subscribe");
    });
  };

  const contentList = getContentList(item);
  return (
    <div className={styles["execute-details"]} style={{ height: "calc(100vh - 45px)" }}>
      <div className={styles.bg}></div>
      <div className={styles.title}>
        <div className={styles.name}>
          <span className={styles["execute-name"]}>{item.title}</span>
          <span className={styles["execute-state"]}>{getRedirectStatus(item.disposition_status)}</span>
        </div>
        <div>
          <img src={`/static/2x/user.png`} alt="" />
          <span className={styles.user}>{item.owner}</span>
          <img src={`/static/2x/time.png`} alt="" />
          {getCalculateTime(item.create_time)}
        </div>
      </div>
      <div className={styles.body}>
        {contentList.map((data, index) => (
          <div className={styles.wrap} key={index}>
            <Flex justify="between">
              <div className={styles.key}>
                <Flex>
                  <img src={`/static/2x/${data.img}.png`} alt="" />
                  <div>{data.key}</div>
                </Flex>
              </div>
              {index !== 3 || `${item.disposition_target_type}` === "1" ? (
                <div
                  onClick={
                    data.key === "区域"
                      ? () =>
                          router.push({
                            pathname: routes.deviceList.path,
                            query: {
                              disposition_id: item.disposition_id,
                              device_ids: item.device_ids.split(';')
                            }
                          })
                      : () => {}
                  }
                  className={
                    data.key === "区域" && data.showLink ? classNames(styles.link, styles.value) : styles.value
                  }
                >
                  {data.value}
                </div>
              ) : (
                <div className={styles["content-img"]}>
                  <div className={styles.idcard}>
                    <div className={styles["idcard-details"]}>
                      <div>
                        <span>{item.name}</span>
                        <span className={styles.gender}>{item.gender}</span>
                      </div>
                      <div>
                        <div className={styles.idtype}>{getRedirectType(item.certificate_type)}</div>
                        <div className={styles.id}>{item.certificate_id}</div>
                      </div>
                    </div>
                    <img className={styles["idcard-img"]} src={item.image} />
                  </div>
                </div>
              )}
            </Flex>
          </div>
        ))}
        <div className={styles.bottom}>
          <div className={styles.foot} onClick={() => subscribeHandler(imgUrl === "subscribe" ? 1 : 0)}>
            <img className={styles.img} src={`/static/2x/${imgUrl}.png`} />
            <div className={styles.icontext}>{imgUrl === "subscribe" ? "添加告警订阅" : "取消告警订阅"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ExecuteDetails.getInitialProps = async ({ query }) => {
  return { item: query };
};

ExecuteDetails.propTypes = {
  item: PropTypes.object
};
export default ExecuteDetails;
