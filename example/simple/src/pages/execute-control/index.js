import { useState, useEffect } from "react";
import { PullToRefresh, Toast } from "antd-mobile";
import styles from "@/styles/executeControl/index.less";
import Filter from "@/components/Filter";
import { filterDataList } from "@/utils/data";
import { getExecuteList, subscribe } from "@/services/executeControl";
import Lists from "@/components/List";
import { EmptyFailedPage, EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
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
  const [refreshing, setRefreshing] = useState(false);
  const [footLoading, onEndReached] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState("addSubscribe.png");
  const [showImg, setShowImg] = useState(false);
  const [executeList, setExecuteList] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [params, setParams] = useState({
    disposition_status: null, // 布控状态： 0 布控中，1 已撤控，2 已到期，9 未开始，不限传空
    disposition_target_type: null, // 布控目标类型：1 名单库布控，2 单人布控，3 民族布控，不限传空
    subscribe_status: null // 订阅状态： 0 未订阅，1 已订阅，不限传空
  });

  useEffect(() => {
    queryExecuteList(params);
  }, []);

  /** 获取过滤参数 */
  const getFilterVal = (obj = { key: "", value: "" }) => {
    setParams(params => {
      params[obj.key] = obj.value;
      queryExecuteList(params);
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
      action,
      disposition_id: id
    }).then(result => {
      // const { isSuccess, msg, res } = result;
      // if (!isSuccess) return Toast(msg, 2, null);
      setShowImg(true);
      setCurrentId("");
      setImgUrl("addSubscribe.png");
      setTimeout(() => setShowImg(false), 1000);
      queryExecuteList(params);
    });
  };

  /** 获取布控列表 */
  const queryExecuteList = () => {
    setLoading(true);
    getExecuteList(params).then(result => {
      setLoading(false);
      // const { isSuccess, msg, res } = result;
      // if (!isSuccess) return Toast(msg, 2, null);
      const { data: dataObj } = result;
      const { data = [], paging } = dataObj;
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

  function renderRow(item) {
    return (
      <Item
        item={item}
        imgUrl={imgUrl}
        changeImgUrl={changeImgUrl}
        subscribeHandler={subscribeHandler}
        currentId={currentId}
      />
    );
  }

  function refresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  function endReached() {
    onEndReached(true);
    setTimeout(() => {
      onEndReached(false);
      setExecuteList(new Array(15).fill({}));
    }, 1500);
  }

  return (
    <>
      <Mask />
      <Filter filterDatas={filterDataList} callback={getFilterVal} />
      <PullToRefresh>
        {loading ? (
          <LoadingPage />
        ) : executeList.length ? (
          <div className={styles.lists}>
            <Lists
              data={executeList}
              loading={footLoading}
              onEndReached={endReached}
              refresh={refreshing}
              onRefresh={refresh}
              renderRow={renderRow}
            ></Lists>
          </div>
        ) : (
          <div style={{ height: "calc(100vh - 90px)" }}>
            <EmptyNoDataPage />
          </div>
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
