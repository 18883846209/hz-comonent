import { useState } from "react";
import { List } from "antd-mobile";
import PropTypes from "prop-types";
import classnames from "classnames";
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
      onClick={() => onClick(item.key, item.title)}
    >
      {item.title}
      <div
        className={
          visible && currentKey === item.key
            ? classnames(styles["title-icon-selected"], styles["title-icon"])
            : styles["title-icon"]
        }
      />
    </div>
  ));
}

/** 选中标记 */
function Selected() {
  return <div className={styles.selected}>√</div>;
}

function Filter({ filterDatas = [], style = { width: "100%" }, callback = () => {} }) {
  const [filterList, setFilterList] = useState(filterDatas);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [valList, setValList] = useState([]);
  const [selected, setSelected] = useState({});

  /** 头部点击方法 */
  const titleOnClick = (key, titleClick) => {
    const filterData = filterList.find(data => data.key === key);
    const valueList = filterData ? filterData.valList : [];
    setValList(valueList);
    setTitle(titleClick);
    setKey(key);
    if (title === titleClick || !visible) setVisible(visible => !visible);
  };

  /** 列表点击方法 */
  const itemClick = (itemKey, value) => {
    let filterData = filterList.find(data => data.key === key);
    filterData.title = itemKey;
    setSelected(selected => {
      return {
        ...selected,
        [key]: value
      };
    });
    setValList(valueList => {
      const data = valueList.find(data => data.value === value);
      data.selected = true;
      return valueList;
    });
    setVisible(visible => !visible);
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

FilterList.prototype = {
  valList: PropTypes.array,
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.object,
  currentKey: PropTypes.number
};

FilterTitle.prototype = {
  onClick: PropTypes.func,
  titles: PropTypes.array,
  visible: PropTypes.bool,
  currentKey: PropTypes.string
};

Filter.prototype = {
  filterDatas: PropTypes.array,
  style: PropTypes.object,
  callback: PropTypes.func
};

export default Filter;
