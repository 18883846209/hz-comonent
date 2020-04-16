import { useState, useEffect } from "react";
import { PullToRefresh, Toast } from "antd-mobile";
import styles from "@/styles/executeControl/index.less";
import Filter from "@/components/Filter";
import { memoTransition } from "@/components/MemoTransition";
import { filterDataList } from "@/utils/data";
import { setStore, getStore } from "@/utils/localStorage"
import { getExecuteList, subscribe } from "@/services/executeControl";
import Lists from "@/components/List";
import Loading from '@/components/PullLoading';
import { EmptyFailedPage, EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
import Item from "@/components/ExecuteItem";

/** 蒙层 */
const Mask = () => {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    const first = getStore("isFirst")
    if (first === 1) {
      setIsFirst(false);
    } else {
      setIsFirst(true);
      setStore("isFirst", 1);
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
  const [imgUrl, setImgUrl] = useState("add_subscribe.png");
  const [showImg, setShowImg] = useState(false);
  const [executeList, setExecuteList] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [params, setParams] = useState({
    disposition_status: null, // 布控状态： 0 布控中，1 已撤控，2 已到期，9 未开始，不限传空
    disposition_target_type: null, // 布控目标类型：1 名单库布控，2 单人布控，3 民族布控，不限传空
    subscribe_status: null, // 订阅状态： 0 未订阅，1 已订阅，不限传空
    page_num: 1,
    page_size: 15
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
    const { server = "" } = window.hzConfig;
    if (e && e.stopPropagation) e.stopPropagation();
    else window.event.cancelBubble = true;
    setCurrentId(id);
    setImgUrl(changeImgUrl(action ? 2 : 3));
    subscribe({
      action,
      disposition_id: id
    }, server).then(result => {
      action && setShowImg(true);
      action && setTimeout(() => setShowImg(false), 1000);
      const j = executeList.length;
      let i = 0;
      for (let i = 0; i < j; i++) {
        if (executeList[i].disposition_id === id) {
          executeList[i].subscribe_status = action ? 1 : 0;
          break;
        }
      }
      setExecuteList(executeList);
      setCurrentId("");
    });
  };

  /** 获取布控列表 */
  const queryExecuteList = (params, isDown) => {
    // !isDown && setLoading(true);
    const { server = "" } = window.hzConfig;
    getExecuteList(params, server).then(result => {
      setLoading(false);
      const { data: dataObj, code, message } = result;
      if (code !== "0000") return Toast.info(message, 2, null);
      const { data = [], paging } = dataObj;
      setExecuteList(dataList => {
        return isDown ? dataList.concat(data) : data;
      });
      setRefreshing(false);
      isDown && onEndReached(false);
    });
  };

  /** 点击图处理 status(0: 已订阅 1：未订阅 2：订阅动画 3：取消动画 4: 订阅失败) */
  const changeImgUrl = status => {
    let imgUrl = "add_subscribe.png";
    switch (status) {
      case 0:
        imgUrl = "add_subscribe.png";
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
    setParams(params => {
      params.page_num = 1;
      queryExecuteList(params);
      return params;
    });
  }

  function endReached() {
    onEndReached(true);
    setParams(params => {
      params.page_num += 1;
      queryExecuteList(params, true);
      return params;
    });
  }

  return (
    <>
      <Mask />
      <Filter filterDatas={filterDataList} callback={getFilterVal} />
      {loading ? (
        <LoadingPage />
      ) : executeList.length ? (
        <div className={styles.lists} style={{ height: "calc(100vh - 90px)" }}>
          <Lists
            data={executeList}
            loading={footLoading}
            onEndReached={endReached}
            refresh={refreshing}
            onRefresh={refresh}
            renderRow={renderRow}
            wrapHeight={document.documentElement.clientHeight - 90}
          ></Lists>
        </div>
      ) : (
        <div style={{ height: "calc(100vh - 90px)", overflow: "hidden" }}>
          <PullToRefresh onRefresh={refresh} damping={30}>
            <EmptyNoDataPage />
          </PullToRefresh>
        </div>
      )}
      <div className={styles.result}>
        <img src={showImg ? "/static/2x/sub_success_big.gif" : ""} />
      </div>
    </>
  );
}

ExecuteList.getInitialProps = async () => {
  return {};
};

export default memoTransition(ExecuteList);
