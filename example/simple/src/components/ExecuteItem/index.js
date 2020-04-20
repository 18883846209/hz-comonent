import { useState } from "react";
import { Flex } from "antd-mobile";
import PropTypes from "prop-types";
import classnames from "classnames";
import TouchFeedback from "rmc-feedback";
import moment from "moment";
import router from "next/router";
import { getRedirectStatus } from "@/utils/common";
import List from "@/components/List";
import LoadImg from "@/components/ImgLoad";
import { getCalculateTime } from "@/utils/utils";
import routes from "@/routes"
import styles from "./styles/index.less";

const { Item } = List;

const ListItem = ({ item, imgUrl, changeImgUrl, currentId, subscribeHandler }) => {
  /** 名单库转字符串 */
  const nameListToStr = (nameList = []) => {
    return nameList.map(data => data.tab_name).join(",");
  };

  /** 时间处理 */
  const getTime = (start, end) => {
    return `${moment(start).format("YY-MM-DD HH:mm:ss")} ~ ${moment(end).format("YY-MM-DD HH:mm:ss")}`;
  };

  /** 跳转 */
  const toDetails = query => {
    router.push({
      pathname: routes.executeDetails.path,
      query: {
        ...query,
        tabs: query.tabs.map(tab => tab.tab_name).join(","),
        timeIcon: getTime(item.start_time, item.end_time)
      }
    });
  };

  return (
    <TouchFeedback activeClassName="active">
      <div className={styles.item} onClick={() => toDetails(item)} key={item.disposition_id}>
        <Flex className={styles["list-item"]} key={item.disposition_id}>
          <div
            className={
              item.disposition_target_type === 1
                ? classnames(styles["item-name-list"], styles["item-left"])
                : styles["item-left"]
            }
          >
            {item.disposition_target_type === 1 ? (
              <div className={styles["name-list"]}>
                <span className={styles["name-list-name"]}>{nameListToStr(item.tabs)}</span>
              </div>
            ) : (
              <LoadImg className={styles.img} src={item.image} />
            )}
          </div>
          <div className={styles["item-right"]}>
            <div>
              <span className={styles.name}>{item.title}</span>
              <span className={styles.state}>{getRedirectStatus(item.disposition_status)}</span>
            </div>
            <div className={styles.card}>
              <div className={styles.date}>{getTime(item.start_time, item.end_time)}</div>
              <div className={styles.detail}>
                <img
                  style={{ height: 14, width: 14, marginRight: "2%", verticalAlign: "bottom" }}
                  src="/static/3x/user.png"
                />
                <span>{item.owner}</span>
                <img
                  style={{ height: 14, width: 14, margin: "0 2%", verticalAlign: "bottom" }}
                  src="/static/3x/time.png"
                />
                <span>{getCalculateTime(item.create_time)}</span>
                <TouchFeedback activeClassName="active">
                  <span
                    className={styles.operation}
                    onClick={e => subscribeHandler(item.disposition_id, item.subscribe_status ? 0 : 1, e)}
                  >
                    <img
                      src={
                        currentId === item.disposition_id
                          ? `/static/2x/${imgUrl}`
                          : `/static/2x/${changeImgUrl(Number(item.subscribe_status))}`
                      }
                      style={{ height: 18, width: 16 }}
                    />
                  </span>
                </TouchFeedback>
              </div>
            </div>
          </div>
        </Flex>
      </div>
    </TouchFeedback>
  );
};

ListItem.prototype = {
  item: PropTypes.object,
  imgUrl: PropTypes.string,
  changeImgUrl: PropTypes.string,
  currentId: PropTypes.string,
  subscribeHandler: PropTypes.func,
  key: PropTypes.string
};

export default ListItem;
