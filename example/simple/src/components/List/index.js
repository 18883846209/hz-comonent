import { List } from "antd-mobile";
import styles from "./styles/index.less";
import classnames from "classnames";

const { Item } = List;

const VirtualizedList = props => {
  const { className, children } = props;
  return <List className={classnames(styles.list, className)}>{children}</List>;
};

VirtualizedList.Item = Item;

export default VirtualizedList;
