import React, { useState, useEffect } from "react";
import { PullToRefresh, ListView } from "antd-mobile";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./styles/index.less";

const VirtualizedList = props => {
  const { data = [], renderRow, refreshing = false, onRefresh, loading = false, onEndReached, renderFooter } = props;
  const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  });
  const [dataSource, setData] = useState(ds.cloneWithRows(data));
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  useEffect(() => {
    setData(ds.cloneWithRows(data));
    // setTimeout(() => {
    //   setHeight(height - ReactDOM.findDOMNode(listRef.current).offsetTop);
    // }, 50);
  }, [data]);
  return (
    <ListView
      style={{
        height: height - 45 - 40,
        overflow: "auto"
      }}
      dataSource={dataSource}
      renderRow={renderRow}
      initialListSize={10} // 初始化渲染的数据量
      renderFooter={() =>
        renderFooter ? (
          renderFooter
        ) : (
          <div style={{ height: 10, textAlign: "center" }}>{loading ? "加载中..." : null}</div>
        )
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={10}
      useBodyScroll={false}
      pageSize={15} // 每次渲染的行数
      scrollRenderAheadDistance={500} // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
      scrollEventThrottle={20} // 控制在滚动过程中，scroll事件被调用的频率
      pullToRefresh={<PullToRefresh damping={30} refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
  return <List className={classnames(styles.list, className)}>{children}</List>;
};

VirtualizedList.propTypes = {
  data: PropTypes.array,
  refreshing: PropTypes.bool,
  loading: PropTypes.bool,
  onRefresh: PropTypes.func,
  onEndReached: PropTypes.func, // 滚动到底部触发
  renderRow: PropTypes.func,
  renderFooter: PropTypes.func // 滚动到底部的加载节点
};
export default VirtualizedList;
