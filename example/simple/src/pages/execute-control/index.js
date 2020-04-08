import { List, Flex } from "antd-mobile";
import Link from "next/link";
import styles from "@/styles/executeControl/index.less";
import classnames from "classnames";
import img from "@/assets/images/test.jpg";
import Filter from "@/components/Filter";

const Item = List.Item;
const filterDataList = [
  {
    title: "状态",
    valList: [
      {
        key: "不限",
        value: 0
      },
      {
        key: "布控中",
        value: 1
      },
      {
        key: "撤控中",
        value: 2
      },
      {
        key: "已撤控",
        value: 3
      },
      {
        key: "已过期",
        value: 4
      },
      {
        key: "未开始",
        value: 5
      }
    ]
  },
  {
    title: "目标",
    valList: [
      {
        key: "不限",
        value: 0
      },
      {
        key: "名单库布控",
        value: 1
      },
      {
        key: "单人布控",
        value: 2
      }
    ]
  },
  {
    title: "告警订阅",
    valList: [
      {
        key: "不限",
        value: 0
      },
      {
        key: "已订阅",
        value: 1
      },
      {
        key: "未订阅",
        value: 2
      }
    ]
  }
];

function ExecuteList(props) {
  const getFilterVal = val => val;
  return (
    <>
      <Filter filterDatas={filterDataList} callback={getFilterVal} />
      <List className={styles["execute-list"]}>
        {new Array(10).fill(1).map(item => (
          <Link href="/execute-details">
            <Item multipleLine onClick={() => {}} key={1}>
              <Flex>
                <div className={styles["item-left"]}>
                  <img className={styles["img"]} src={img} />
                </div>
                <div className={styles["item-right"]}>
                  <span className={styles["name"]}>测试布控</span>
                  <span className={styles["state"]}>布控中</span>
                  <div className={styles["date"]}>20-03-27 15:33 ~ 20-03-27 16:33</div>
                  <div className={styles["detail"]}>
                    <span>admin</span>
                    <span>03-22 19:03</span>
                    <span className={styles["operation"]}>XXX</span>
                  </div>
                </div>
              </Flex>
            </Item>
          </Link>
        ))}
        <Item multipleLine onClick={() => {}} key={1}>
          <Flex>
            <div className={classnames(styles["item-left"], styles["item-name-list"])}>
              <div className={styles["name-list"]}>
                <span className={styles["name-list-name"]}>321案件嫌疑人名单库</span>
              </div>
            </div>
            <div className={styles["item-right"]}>
              <span className={styles["name"]}>测试布控</span>
              <span className={styles["state"]}>布控中</span>
              <div className={styles["date"]}>20-03-27 15:33 ~ 20-03-27 16:33</div>
              <div className={styles["detail"]}>
                <span>admin</span>
                <span>03-22 19:03</span>
                <span className={styles["operation"]}>XXX</span>
              </div>
            </div>
          </Flex>
        </Item>
      </List>
    </>
  );
}

export default ExecuteList;
