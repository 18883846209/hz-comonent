import React, { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
import { PullToRefresh, ListView } from "antd-mobile";
import PropTypes from "prop-types";
import { pxToRem } from "@/utils/utils";
import Loading from "@/components/PullLoading";

const navHeight = 45;
const margin = 40;
const height = `calc(100vh - ${navHeight}px - ${pxToRem(margin)})`;

const VirtualizedList = props => {
  const {
    data = [],
    renderRow,
    refreshing = false,
    onRefresh,
    loading = false,
    onEndReached,
    renderFooter,
    wrapHeight,
    size = 15,
    isRefresh = true
  } = props;
  const listRef = useRef(null);
  const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  });
  const [dataSource, setData] = useState(ds.cloneWithRows(data));
  useEffect(() => {
    setData(ds.cloneWithRows(data));
  }, [data]);
  const style = {
    height: wrapHeight || height,
    overflow: "auto"
  };
  return (
    <ListView
      ref={listRef}
      style={style}
      dataSource={dataSource}
      renderRow={renderRow}
      initialListSize={size}
      renderFooter={renderFooter || (() => <div style={{ textAlign: "center" }}>{loading ? "加载中..." : null}</div>)}
      onEndReached={onEndReached}
      onEndReachedThreshold={10}
      useBodyScroll={false}
      pageSize={size}
      scrollRenderAheadDistance={500} // 当一个.行接近屏幕范围多少像素之内的时候，就开始渲染这一行
      scrollEventThrottle={20} // 控制在滚动过程中，scroll事件被调用的频率
      pullToRefresh={
        !isRefresh ? null : (
          <PullToRefresh
            indicator={{ release: <Loading /> }}
            damping={30}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )
      }
    />
  );
};

VirtualizedList.propTypes = {
  data: PropTypes.array,
  wrapHeight: PropTypes.string, // 高度最好自行传入(内容区域高度即可)
  refreshing: PropTypes.bool,
  loading: PropTypes.bool,
  onRefresh: PropTypes.func,
  onEndReached: PropTypes.func, // 滚动到底部触发
  renderRow: PropTypes.func,
  isRefresh: PropTypes.bool, // 是否需要下拉刷新
  size: PropTypes.number, // 初始化渲染的数据量和每次渲染的行数
  renderFooter: PropTypes.func // 滚动到底部的加载节点
};
export default VirtualizedList;
