import React, { useState, useEffect } from "react";
import { PullToRefresh, ListView } from "antd-mobile";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Loading from '@/components/PullLoading';
import styles from "./styles/index.less";

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
  const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  });
  const [dataSource, setData] = useState(ds.cloneWithRows(data));
  const [height, setHeight] = useState(602);
  useEffect(() => {
    setData(ds.cloneWithRows(data));
    setTimeout(() => {
      const h = document.documentElement.clientHeight;
      setHeight(h);
    }, 0);
  }, [data]);
  const style = {
    height: wrapHeight ? wrapHeight : height - 45 - 20,
    overflow: "auto"
  };
  return (
    <ListView
      style={style}
      dataSource={dataSource}
      renderRow={renderRow}
      initialListSize={size}
      renderFooter={() =>
        renderFooter ? renderFooter : <div style={{ textAlign: "center" }}>{loading ? "加载中..." : null}</div>
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={10}
      useBodyScroll={false}
      pageSize={size}
      scrollRenderAheadDistance={500} // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
      scrollEventThrottle={20} // 控制在滚动过程中，scroll事件被调用的频率
      pullToRefresh={!isRefresh ? null : <PullToRefresh indicator={{ release: <Loading /> }} damping={30} refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
  return <List className={classnames(styles.list, className)}>{children}</List>;
};

VirtualizedList.propTypes = {
  data: PropTypes.array,
  wrapHeight: PropTypes.number, // 高度最好自行传入(内容区域高度即可)
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
