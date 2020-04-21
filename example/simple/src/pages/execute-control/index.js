import React, { useState, useEffect } from "react";
import { PullToRefresh, Toast } from "antd-mobile";
import dynamic from "next/dynamic";
import { getExecuteList, subscribe } from "@/services/executeControl";
import { EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
import Loading from "@/components/PullLoading";
import Filter from "@/components/Filter";
import Item from "@/components/ExecuteItem";
import Mask from "@/components/Mask";
import { filterDataList } from "@/utils/data";
import { changeImgUrl } from "@/utils/common";
import { getDpr } from "@/utils/utils";
import styles from "@/styles/executeControl/index.less";

const List = dynamic(import("@/components/List"), {
  ssr: false
});

const height = "calc(100vh - 90px)";

function ExecuteList() {
  const [refreshing, setRefreshing] = useState(false);
  const [footLoading, onEndReached] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState(["add_subscribe", "png"]);
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

  /** 获取布控列表 */
  const queryExecuteList = (param, isDown) => {
    getExecuteList(param).then(result => {
      setLoading(false);
      const { res } = result;
      if (result.isSuccess) {
        const { data = [] } = res;
        setExecuteList(dataList => {
          return isDown ? dataList.concat(data) : data;
        });
        setRefreshing(false);
        if (isDown) onEndReached(false);
      } else {
        return Toast.info(res.message, 2, null);
      }
    });
  };

  useEffect(() => {
    queryExecuteList(params);
  }, []);

  /** 获取过滤参数 */
  const getFilterVal = (obj = { key: "", value: "" }) => {
    setParams(param => {
      param[obj.key] = obj.value;
      param.page_num = 1;
      queryExecuteList(param);
      return param;
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
      const { res } = result;
      if (!result.isSuccess) return Toast.info(res.message, 2, null);
      if (action) {
        setShowImg(true);
        setTimeout(() => setShowImg(false), 1000);
      }
      const j = executeList.length;
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
    setParams(param => {
      param.page_num = 1;
      queryExecuteList(param);
      return param;
    });
  }

  function endReached() {
    onEndReached(true);
    setParams(param => {
      param.page_num += 1;
      queryExecuteList(param, true);
      return param;
    });
  }

  function renderContext() {
    let node;
    if (loading) {
      node = <LoadingPage />;
    } else if (executeList.length) {
      node = (
        <div className={styles.lists}>
          <List
            data={executeList}
            loading={footLoading}
            onEndReached={endReached}
            refresh={refreshing}
            onRefresh={refresh}
            renderRow={renderRow}
            wrapHeight={height}
          />
        </div>
      );
    } else {
      node = (
        <div className={styles["no-data"]}>
          <PullToRefresh onRefresh={refresh} damping={30} indicator={{ release: <Loading /> }}>
            <EmptyNoDataPage />
          </PullToRefresh>
        </div>
      );
    }
    return node;
  }

  return (
    <div>
      <Mask />
      <Filter filterDatas={filterDataList} callback={getFilterVal} />
      {renderContext()}
      <div className={styles.result}>
        <img src={showImg ? getDpr("executeControl/sub_success_big", ".gif") : ""} alt="" />
      </div>
    </div>
  );
}

export default ExecuteList;
