import { useState } from "react";
import { List } from "antd-mobile";
import PropTypes from "prop-types";
import styles from "./styles/index.less";

const { Item } = List;

/** 列表 */
function FilterList({ valList, visible, onClick, selected, title }) {
  return visible ? (
    <div className={styles.list}>
      {valList.map(item => (
        <Item
          extra={selected[title] === item.value ? <Selected /> : ""}
          key={item.key}
          onClick={() => onClick(item.value)}
        >
          <span className={selected[title] === item.value ? styles.selected : ''}>{item.key}</span>
        </Item>
      ))}
    </div>
  ) : null;
}

/** 头部 */
function FilterTitle({ title, onClick }) {
  return title.map(item => (
    <div key={item.title} className={styles["title-item"]} onClick={() => onClick(item.title)}>
      {item.title}
    </div>
  ));
}

/** 选中标记 */
function Selected() {
  return <div className={styles.selected}>√</div>;
}

function Filter({ filterDatas = [], style = { width: "100%" }, callback = () => {} }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [valList, setValList] = useState([]);
  const [selected, setSelected] = useState({});

  /** 头部点击方法 */
  const titleOnClick = title => {
    const filterData = filterDatas.find(data => data.title === title);
    const valueList = filterData ? filterData.valList : [];
    setValList(valueList);
    setTitle(title);
    setVisible(visible => !visible);
  };

  /** 列表点击方法 */
  const itemClick = value => {
    setSelected(selected => {
      return {
        ...selected,
        [title]: value
      };
    });
    setValList(valueList => {
      const data = valueList.find(data => data.value === value);
      data.selected = true;
      return valueList;
    });
    setVisible(visible => !visible);
    callback(value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles["filter-title"]} style={style}>
        <FilterTitle title={filterDatas} onClick={titleOnClick} />
      </div>
      <FilterList visible={visible} valList={valList} title={title} selected={selected} onClick={itemClick} />
    </div>
  );
}

FilterList.prototype = {
  valList: PropTypes.array,
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.object,
  title: PropTypes.string
};

FilterTitle.prototype = {
  onClick: PropTypes.func,
  title: PropTypes.string
};

Filter.prototype = {
  filterDatas: PropTypes.array,
  style: PropTypes.object,
  callback: PropTypes.func
};

export default Filter;
