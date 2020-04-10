import { List, Flex } from "antd-mobile";
import styles from "@/styles/executeDetails/index.less";
import router from "next/router";
import classNames from "classnames";
import img from "@/assets/images/test.jpg";

const testData = {
  time: "20-03-26 15:26 ~ 20-03-26 15:26",
  area: "63个监控点",
  type: "人员布控",
  target: "******黑名单1，********黑名单2，******黑名单3",
  similar: "≥75%",
  remarks: "啦啦啦啦啦，哈哈哈哈哈哈。"
};

const TITLE = [
  { key: "时段", value: "time" },
  { key: "区域", value: "area" },
  { key: "类型", value: "type" },
  { key: "目标", value: "target" },
  { key: "阈值", value: "similar" },
  { key: "备注", value: "remarks" }
];

function getContentList(data) {
  return TITLE.map(item => {
    return { key: item.key, value: data[item.value] };
  });
}

function ExecuteDetails({ id = "" }) {
  const contentList = getContentList(testData);
  return (
    <div className={styles["execute-details"]} style={{ height: "calc(100vh - 45px)" }}>
      <div className={styles.title}>
        <span className={styles["execute-name"]}>测试布控</span>
        <span className={styles["execute-state"]}>布控中</span>
      </div>
      <div className={styles.body}>
        <div className={styles.brief}>admin 19-12-09 18:08:36</div>
        {contentList.map(data => (
          <div className={styles["execute-content"]} key={data.key}>
            <div className={styles["content-title"]}>{data.key}</div>
            <div className={styles["content-value"]}>
              {data.key === "区域" ? (
                <u className={styles.link} onClick={() => router.push("/devices")}>
                  {data.value}
                </u>
              ) : (
                data.value
              )}
            </div>
          </div>
        ))}
        <div className={styles["execute-content"]} key={1}>
          <div className={styles["content-title"]}>目标</div>
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
              <img className={styles["idcard-img"]} src={img} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.bottom}>
        <img className={styles.img} src={img} />
      </div> */}
    </div>
  );
}

ExecuteDetails.getInitialProps = async () => {
  return {};
};

export default ExecuteDetails;
