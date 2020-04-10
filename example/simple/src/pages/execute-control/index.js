import { useState } from "react";
import { List, Flex } from "antd-mobile";
import router from "next/router";
import styles from "@/styles/executeControl/index.less";
import classnames from "classnames";
import { observer } from "mobx-react";
import useStores from "@/hooks/useStores";
import img from "@/assets/images/test.jpg";
import Filter from "@/components/Filter";
import { filterDataList } from "./data";

const Item = List.Item;

/** 蒙层 */
const Mask = observer(() => {
  const { executeStore } = useStores();
  return executeStore.isFirst ? (
    <div className={styles.mask} onClick={() => executeStore.click()}>
      <div className={styles["mask-content"]}>
        <span className={styles["mask-icon"]}>+</span>
        <span className={styles["mask-text"]}>点击可对布控进行订阅，订阅后可收到该布控产生的告警信息。</span>
      </div>
    </div>
  ) : null;
});

function ExecuteList(props) {
  const getFilterVal = val => val;
  return (
    <>
      <Mask />
      <Filter filterDatas={filterDataList} callback={getFilterVal} />
      <List className={styles["execute-list"]}>
        {new Array(3).fill(1).map(item => (
          <Item multipleLine onClick={() => router.push("/execute-details")} key={1}>
            <Flex>
              <div className={styles["item-left"]}>
                <img className={styles.img} src={img} />
              </div>
              <div className={styles["item-right"]}>
                <span className={styles.name}>测试布控</span>
                <span className={styles.state}>布控中</span>
                <div className={styles.date}>20-03-27 15:33 ~ 20-03-27 16:33</div>
                <div className={styles.detail}>
                  <img style={{ height: 14, width: 14, margin: '0 2% 1% 0' }} src="/static/2x/user.png" />
                  <span>admin</span>
                  <img style={{ height: 14, width: 14, margin: '0 2% 1% 2%' }} src="/static/2x/time.png" />
                  <span>03-22 19:03</span>
                  <span className={styles.operation}>
                    <img src="/static/2x/addSubscribe.png" style={{ height: 14, width: 14 }} />
                  </span>
                </div>
              </div>
            </Flex>
          </Item>
        ))}
        <Item multipleLine onClick={() => {}} key={1}>
          <Flex>
            <div className={classnames(styles["item-left"], styles["item-name-list"])}>
              <div className={styles["name-list"]}>
                <span className={styles["name-list-name"]}>321案件嫌疑人名单库</span>
              </div>
            </div>
            <div className={styles["item-right"]}>
              <span className={styles.name}>测试布控</span>
              <span className={styles.state}>布控中</span>
              <div className={styles.date}>20-03-27 15:33 ~ 20-03-27 16:33</div>
              <div className={styles.detail}>
                  <img style={{ height: 14, width: 14, margin: '0 2% 1% 0' }} src="/static/2x/user.png" />
                  <span>admin</span>
                  <img style={{ height: 14, width: 14, margin: '0 2% 1% 2%' }} src="/static/2x/time.png" />
                  <span>03-22 19:03</span>
                  <span className={styles.operation}>
                    <img src="/static/2x/addSubscribe.png" style={{ height: 14, width: 14 }} />
                  </span>
                </div>
            </div>
          </Flex>
        </Item>
      </List>
    </>
  );
}

export default ExecuteList;
