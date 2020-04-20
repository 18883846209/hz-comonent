import React, { useState, memo } from "react";
import { List } from "antd-mobile";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getTitle } from "@/utils/common";
import styles from "./styles/index.less";

const { Item } = List;

/** 列表 */
function FilterList({ valList, visible, onClick, selected, currentKey }) {
  return visible ? (
    <div className={styles.list}>
      {valList.map(item => (
        <Item
          extra={selected[currentKey] === item.value ? <Selected /> : ""}
          key={item.key}
          onClick={() => onClick(item.key, item.value)}
        >
          <span className={selected[currentKey] === item.value ? styles.selected : ""}>{item.key}</span>
        </Item>
      ))}
    </div>
  ) : null;
}

/** 头部 */
function FilterTitle({ titles, onClick, visible, currentKey }) {
  const selectedTitle = classnames(styles["title-item"], styles.selected);
  return titles.map(item => (
    <div
      key={item.key}
      className={visible && currentKey === item.key ? selectedTitle : styles["title-item"]}
      onClick={() => onClick(item.key)}
    >
      {item.title}
      <div
        className={classnames(
          visible && currentKey === item.key ? styles["title-icon-selected"] : "",
          styles["title-icon"]
        )}
      />
    </div>
  ));
}

/** 选中标记 */
const Selected = memo(() => <div className={styles.selected}>√</div>, false);

function Filter({ filterDatas = [], style = { width: "100%" }, callback = () => {} }) {
  const [filterList, setFilterList] = useState(filterDatas);
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState("");
  const [valList, setValList] = useState([]);
  const [selected, setSelected] = useState({});

  /** 头部点击方法 */
  const titleOnClick = currentKey => {
    const filterData = filterList.find(data => data.key === currentKey);
    const valueList = filterData ? filterData.valList : [];
    setValList(valueList);
    setKey(currentKey);
    if (key === currentKey || !visible) setVisible(visibled => !visibled);
  };

  /** 列表点击方法 */
  const itemClick = (itemKey, value) => {
    const filterDataObj = filterList.find(data => data.key === key);
    if (!filterDataObj) return;
    if (itemKey === "不限") {
      filterDataObj.title = getTitle(key);
    } else {
      filterDataObj.title = itemKey;
    }
    setSelected(select => {
      return {
        ...select,
        [key]: value
      };
    });
    setValList(valueList => {
      const data = valueList.find(item => item.value === value);
      data.selected = true;
      return valueList;
    });
    setVisible(visibled => !visibled);
    setFilterList(filterList);
    callback({ key, value });
  };

  return (
    <>
      <div className={styles.filter}>
        <div className={styles["filter-title"]} style={{ ...style, lineHeight: "45px", height: "45px" }}>
          <FilterTitle titles={filterList} onClick={titleOnClick} currentKey={key} visible={visible} />
        </div>
        <FilterList visible={visible} valList={valList} currentKey={key} selected={selected} onClick={itemClick} />
      </div>
      {visible ? (
        <div className={styles.mask} onClick={() => setVisible(!visible)} style={{ height: "calc(100vh - 45px)" }} />
      ) : null}
      <div className={styles.height} />
    </>
  );
}

FilterList.propTypes = {
  valList: PropTypes.array,
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.object,
  currentKey: PropTypes.string
};

FilterTitle.propTypes = {
  onClick: PropTypes.func,
  titles: PropTypes.array,
  visible: PropTypes.bool,
  currentKey: PropTypes.string
};

Filter.propTypes = {
  filterDatas: PropTypes.array,
  style: PropTypes.object,
  callback: PropTypes.func
};

export default Filter;
