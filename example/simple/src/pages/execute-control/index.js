import { useState, useEffect } from "react";
import { PullToRefresh } from "antd-mobile";
import styles from "@/styles/executeControl/index.less";
import Filter from "@/components/Filter";
import { filterDataList } from "@/utils/data";
import { getExecuteList, subscribe } from "@/services/executeControl";
import List from "@/components/List";
import { EmptyNoDataPage } from "@/components/EmptyPage";
import Item from "@/components/ExecuteItem";

/** 蒙层 */
const Mask = () => {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    const first = window.localStorage.getItem("isFirst");
    if (first === "1") {
      setIsFirst(false);
    } else {
      setIsFirst(true);
      window.localStorage.setItem("isFirst", "1");
    }
  }, []);

  return isFirst ? (
    <div className={styles.mask} onClick={() => setIsFirst(false)}>
      <img style={{ width: "100%", height: "100%", position: "absolute" }} src="/static/2x/background.png" />
      <div className={styles.mask} />
      <img
        style={{ width: "100%", height: "100%", zIndex: 1000000, position: "absolute" }}
        src="/static/2x/example.gif"
      />
    </div>
  ) : null;
};

function ExecuteList(props) {
  const [imgUrl, setImgUrl] = useState("addSubscribe.png");
  const [showImg, setShowImg] = useState(false);
  const [executeList, setExecuteList] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [params, setParams] = useState({
    req: {
      disposition_status: null, // 布控状态： 0 布控中，1 已撤控，2 已到期，9 未开始，不限传空
      disposition_target_type: null, // 布控目标类型：1 名单库布控，2 单人布控，3 民族布控，不限传空
      subscribe_status: null // 订阅状态： 0 未订阅，1 已订阅，不限传空
    }
  });

  useEffect(() => {
    queryExecuteList();
  }, [params]);

  /** 获取过滤参数 */
  const getFilterVal = (obj = { key: "", value: "" }) => {
    setParams(params => {
      params.req[obj.key] = obj.value;
      return params;
    });
  };

  /** 添加取消订阅 action(0：取消订阅，1：订阅) */
  const subscribeHandler = (id, action, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    else window.event.cancelBubble = true;
    setCurrentId(id);
    setImgUrl(changeImgUrl(action ? 2 : 3));
    subscribe({
      req: {
        action,
        disposition_id: id
      }
    }).then(() => {
      setShowImg(true);
      setCurrentId("");
      setImgUrl("addSubscribe.png");
      setTimeout(() => setShowImg(false), 1000);
    });
  };

  /** 获取布控列表 */
  const queryExecuteList = () => {
    getExecuteList(params).then(result => {
      const { isSuccess, msg, res } = result;
      if (!isSuccess) return msg
      const { data: dataObj } = res
      const { data, paging } = dataObj;
      setExecuteList(data);
    });
  };

  /** 点击图处理 status(0: 已订阅 1：未订阅 2：订阅动画 3：取消动画 4: 订阅失败) */
  const changeImgUrl = status => {
    let imgUrl = "addSubscribe.png";
    switch (status) {
      case 0:
        imgUrl = "addSubscribe.png";
        break;
      case 1:
        imgUrl = "subscribed_small.png";
        break;
      case 2:
        imgUrl = "sub_success.gif";
        break;
      case 3:
        imgUrl = "sub_cancel.gif";
        break;
      case 4:
        imgUrl = "sub_fail.gif";
        break;
      default:
        break;
    }
    return imgUrl;
  };

  return (
    <>
      <Mask />
      <Filter filterDatas={filterDataList} callback={getFilterVal} />
      <PullToRefresh>
        {executeList.length ? (
          <List className={styles["execute-list"]}>
            {executeList.map(item => (
              <Item
                item={item}
                imgUrl={imgUrl}
                changeImgUrl={changeImgUrl}
                subscribeHandler={subscribeHandler}
                currentId={currentId}
              />
            ))}
          </List>
        ) : (
          <EmptyNoDataPage />
        )}
      </PullToRefresh>
      <div className={styles.result}>
        <img src={showImg ? "/static/2x/sub_success_big.gif" : ""} />
      </div>
    </>
  );
}

ExecuteList.getInitialProps = async () => {
  return {};
};

export default ExecuteList;
