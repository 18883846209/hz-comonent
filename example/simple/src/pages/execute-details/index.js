import { List, Flex } from "antd-mobile";
import styles from "@/styles/executeDetails/index.less";
import router from "next/router";
import classNames from "classnames";

const testData = {
  timeIcon: "20-03-26 15:26 ~ 20-03-26 15:26",
  position: "63个监控点",
  types: "人员布控",
  target: "******黑名单1，********黑名单2，******黑名单3",
  threshold: "≥75%",
  remarks: "啦啦啦啦啦，哈哈哈哈哈哈。"
};

const TITLE = [
  { key: "时段", value: "timeIcon" },
  { key: "区域", value: "position" },
  { key: "类型", value: "types" },
  { key: "目标", value: "target" },
  { key: "阈值", value: "threshold" },
  { key: "备注", value: "remarks" }
];

function getContentList(data) {
  return TITLE.map(item => {
    return { key: item.key, value: data[item.value], img: item.value };
  });
}

const ExecuteDetails = () => {
  const contentList = getContentList(testData);
  return (
    <div className={styles["execute-details"]} style={{ height: "calc(100vh - 45px)" }}>
      <div className={styles.bg}></div>
      <div className={styles.title}>
        <div className={styles.name}>
          <span className={styles["execute-name"]}>测试布控</span>
          <span className={styles["execute-state"]}>布控中</span>
        </div>
        <div>
          <img src={`/static/2x/user.png`} alt="" />
          <span className={styles.user}>admin</span>
          <img src={`/static/2x/time.png`} alt="" />
          19-12-09 18:08:36
        </div>
      </div>
      <div className={styles.body}>
        {contentList.map((data, index) => (
          <div className={styles.wrap}>
            <Flex justify="between">
              <div className={styles.key}>
                <Flex>
                  <img src={`/static/2x/${data.img}.png`} alt="" />
                  <div>{data.key}</div>
                </Flex>
              </div>
              {index !== 3 ? (
                <div
                  onClick={data.key === "区域" ? () => router.push("/deviceList") : () => {}}
                  className={data.key === "区域" ? classNames(styles.link, styles.value) : styles.value}
                >
                  {data.value}
                </div>
              ) : (
                <div className={styles["content-img"]}>
                  <div className={styles.idcard}>
                    <div className={styles["idcard-details"]}>
                      <div>
                        <span>张三</span>
                        <span className={styles.gender}>男</span>
                      </div>
                      <div>
                        <div className={styles.idtype}>居民身份证</div>
                        <div className={styles.id}>50011219851212091X</div>
                      </div>
                    </div>
                    {/* <img className={styles["idcard-img"]}  /> */}
                  </div>
                </div>
              )}
            </Flex>
          </div>
        ))}
        <div className={styles.bottom}>
          <div className={styles.foot}>
            <img className={styles.img} src="/static/2x/subscribe.png" />
            <div className={styles.icontext}>添加告警订阅</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ExecuteDetails.getInitialProps = async () => {
  return {};
};

export default ExecuteDetails;
