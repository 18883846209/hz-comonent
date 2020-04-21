import React, { useState } from "react";
import { Flex, Toast } from "antd-mobile";
import router from "next/router";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "@/styles/executeDetails/index.less";
import { getRedirectStatus, getRedirectType } from "@/utils/common";
import LoadImg from "@/components/ImgLoad";
import { getCalculateTime, getDpr } from "@/utils/utils";
import routes from "@/routes";
import { subscribe } from "@/services/executeControl";

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

/** 性别 */
const renderGender = (gender = 1) => {
  let genderStr = "";
  switch (gender) {
    case "1":
      genderStr = "男";
      break;
    case "2":
      genderStr = "女";
      break;
    default:
      break;
  }
  return genderStr;
};

function getContentList(data) {
  const { device_ids: deviceIds, disposition_target_type: type, tabs, describe, threshold } = data;
  const oData = {
    ...data,
    position: `${executeArea(deviceIds)}个监控点`,
    types: executeType(type),
    target: tabs,
    remarks: describe,
    threshold: `≥${threshold}%`,
    showLink: `${executeArea(deviceIds)}` !== "0"
  };

  return TITLE.map(item => {
    return { key: item.key, value: oData[item.value], img: item.value, showLink: oData.showLink };
  });
}

const ExecuteDetails = ({ item }) => {
  const [imgUrl, setImgUrl] = useState(`${item.subscribe_status}` === "0" ? "subscribe" : "cancel_subscribed");

  const subscribeHandler = action => {
    subscribe({
      action,
      disposition_id: item.disposition_id
    }).then(result => {
      const { res = {} } = result;
      if (!result.isSuccess) return Toast.info(res.message, 2, null);
      setImgUrl(action ? "cancel_subscribed" : "subscribe");
    });
  };

  const contentList = getContentList(item);
  return (
    <div className={styles["execute-details"]}>
      <div className={styles.bg} />
      <div className={styles.title}>
        <div className={styles.name}>
          <span className={styles["execute-name"]}>{item.title}</span>
          <span className={styles["execute-state"]}>{getRedirectStatus(Number(item.disposition_status))}</span>
        </div>
        <div>
          <img src={getDpr('executeControl/user')} alt="" />
          <span className={styles.user}>{item.owner}</span>
          <img src={getDpr('executeControl/time')} alt="" />
          {getCalculateTime(item.create_time)}
        </div>
      </div>
      <div className={styles.body}>
        {contentList.map((data, index) => (
          <div className={styles.wrap} key={index}>
            <Flex justify="between">
              <div className={styles.key}>
                <Flex>
                  <img src={getDpr(`executeControl/${data.img}`)} alt="" />
                  <div>{data.key}</div>
                </Flex>
              </div>
              {index !== 3 || `${item.disposition_target_type}` === "1" ? (
                <div
                  onClick={
                    data.key === "区域" && item.device_ids && item.device_ids.split(";").length > 0
                      ? () =>
                          router.push({
                            pathname: routes.deviceList.path,
                            query: {param: JSON.stringify({
                              disposition_id: item.disposition_id,
                              device_ids: item.device_ids.split(";")
                            })}
                          })
                      : () => {}
                  }
                  className={classNames(data.key === "区域" && data.showLink ? styles.link : "", styles.value)}
                >
                  {data.value}
                </div>
              ) : (
                <div className={styles["content-img"]}>
                  <div className={styles.idcard}>
                    <div className={styles["idcard-details"]}>
                      <div>
                        <span>{item.name}</span>
                        <span className={styles.gender}>{renderGender(item.gender)}</span>
                      </div>
                      <div>
                        <div className={styles.idtype}>{getRedirectType(item.certificate_type)}</div>
                        <div className={styles.id}>{item.certificate_id}</div>
                      </div>
                    </div>
                    <LoadImg className={styles["idcard-img"]} src={item.image} />
                  </div>
                </div>
              )}
            </Flex>
          </div>
        ))}
        <div className={styles.bottom}>
          <div className={styles.foot} onClick={() => subscribeHandler(imgUrl === "subscribe" ? 1 : 0)}>
            <img className={styles.img} src={getDpr(`executeControl/${imgUrl}`)} alt="" />
            <div className={classNames(styles.icontext, imgUrl === "subscribe" ? styles.add : styles.cancle)}>
              {imgUrl === "subscribe" ? "添加告警订阅" : "取消告警订阅"}
            </div>
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
