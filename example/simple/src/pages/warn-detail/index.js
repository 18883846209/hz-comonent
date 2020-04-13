import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import { EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
import { Progress, Card } from "@/components/WarnComponents/index";
import { getCalculateTime } from "@/utils/utils";
import styles from "./styles/index.less";

const Item = ({ name, value, src }) => (
  <div className={styles.wrap}>
    <Flex justify="between">
      <div className={styles.key}>
        <Flex>
          <img src={src} alt="" />
          <div>{name}</div>
        </Flex>
      </div>
      <div className={styles.value}>{value}</div>
    </Flex>
  </div>
);

const changeSex = str => {
  return str === "0" ? "男" : "女";
};

const Detail = ({ item = {} }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <LoadingPage />
  ) : !Object.keys(item).length ? (
    <EmptyNoDataPage />
  ) : (
    <div className={styles.detail}>
      <div className={styles.bg}></div>
      <div className={styles.top}>
        <div className={styles.name}>{item.name || ""}</div>
        <div className={styles.similar}>
          <Progress percent={Number(item.alarm_score) || 0} />
        </div>
        <div className={styles.center}>
          <Card url={item.target_image_url} text="布控照" className={styles.img} />
          <Card url={item.captured_image_url} text="抓拍照" className={styles.img} />
          <Card
            url={
              item.captured_full_image ||
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
            }
            text="全景照"
            className={styles.full_wrap}
            imgClass={styles.full_img}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Item src="/static/3x/detail_sex.png" name="性别" value={changeSex(item.gender)} />
        <Item src="/static/3x/detail_card.png" name="身份证号" value={item.certificate_id || ""} />
        <Item src="/static/3x/detail_disposition.png" name="布控名单" value={item.face_library_name || ""} />
        <Item
          src="/static/3x/detail_time.png"
          name="时间"
          value={getCalculateTime(Number(item.notification_time), false, false)}
        />
        <Item src="/static/3x/detail_position.png" name="位置" value={item.device_name || ""} />
      </div>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  src: PropTypes.string
};

Detail.getInitialProps = async ({ query }) => {
  return { item: query };
};

export default Detail;
