import React, { useState } from "react";
import { Flex } from "antd-mobile";
import PropTypes from "prop-types";
import classnames from "classnames";
import TouchFeedback from "rmc-feedback";
import moment from "moment";
import router from "next/router";
import { getRedirectStatus } from "@/utils/common";
import LoadImg from "@/components/ImgLoad";
import { getCalculateTime, getDpr } from "@/utils/utils";
import routes from "@/routes";
import styles from "./styles/index.less";

const ListItem = ({ item, imgUrl, changeImgUrl, currentId, subscribeHandler }) => {
  const [touch, setTouch] = useState(false);
  /** 名单库转字符串 */
  const nameListToStr = (nameList = []) => {
    let nameListStr = nameList.map(data => data.tab_name).join(",");
    if (nameListStr.length > 15) {
      nameListStr = `${nameListStr.slice(0, 13)}...`;
    }
    return nameListStr;
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

  const touchHandler = e => {
    if (e.target && e.target.tagName !== "IMG") {
      setTouch(true);
    }
  };

  return (
    <div
      className={styles.item}
      onClick={() => toDetails(item)}
      onTouchStart={touchHandler}
      onTouchMove={() => setTouch(false)}
      onTouchEnd={() => setTouch(false)}
      key={item.disposition_id}
    >
      <Flex className={styles["list-item"]} key={item.disposition_id}>
        <div className={styles.mask} style={{ display: touch ? "block" : "none" }} />
        <div
          className={classnames(
            item.disposition_target_type === 1 ? styles["item-name-list"] : "",
            styles["item-left"]
          )}
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
              <img className={styles["user-icon"]} src="/static/3x/user.png" alt="" />
              <span>{item.owner}</span>
              <img className={styles["time-icon"]} src="/static/3x/time.png" alt="" />
              <span>{getCalculateTime(item.create_time)}</span>
              <TouchFeedback activeClassName="active">
                <span
                  className={styles.operation}
                  onClick={e => subscribeHandler(item.disposition_id, item.subscribe_status ? 0 : 1, e)}
                >
                  <img
                    src={
                      currentId === item.disposition_id
                        ? getDpr(`executeControl/${imgUrl[0]}`, imgUrl[1])
                        : getDpr(
                            `executeControl/${changeImgUrl(Number(item.subscribe_status))[0]}`,
                            changeImgUrl(Number(item.subscribe_status))[1]
                          )
                    }
                    className={styles["operation-icon"]}
                    alt=""
                  />
                </span>
              </TouchFeedback>
            </div>
          </div>
        </div>
      </Flex>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object,
  imgUrl: PropTypes.array,
  changeImgUrl: PropTypes.func,
  currentId: PropTypes.string,
  subscribeHandler: PropTypes.func,
  key: PropTypes.string
};

export default ListItem;
