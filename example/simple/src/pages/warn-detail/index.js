import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import { EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
import { Progress, Card } from "@/components/WarnComponents";
import ImageViewer from "@/components/ImageViewer";
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
  return str === "1" ? "男" : str === "2" ? "女" : str === "9" ? "未说明" : "未知";
};

const Detail = ({ item = {} }) => {
  const [loading, setLoading] = useState(true);
  const [imageVisible, setImageVisible] = useState(false);
  const [defaultIndex, setdefaultIndex] = useState(0);
  const sources = [item.target_image_url, item.captured_image_url, item.captured_full_image];
  useEffect(() => {
    setLoading(false);
  }, []);
  function viewImage(index) {
    setImageVisible(true);
    setdefaultIndex(index);
  }
  return loading ? (
    <LoadingPage />
  ) : !Object.keys(item).length ? (
    <EmptyNoDataPage />
  ) : (
    <div className={styles.detail}>
      <div className={styles.bg}></div>
      <ImageViewer
        onClose={() => setImageVisible(false)}
        visible={imageVisible}
        defaultIndex={defaultIndex}
        sources={sources}
      />
      <div className={styles.top}>
        <div className={styles.name}>{item.name || ""}</div>
        <div className={styles.similar}>
          <Progress percent={Number(item.alarm_score) || 0} />
        </div>
        <div className={styles.center}>
          <Card onClick={() => viewImage(0)} url={item.target_image_url} text="布控照" className={styles.img} />
          <Card onClick={() => viewImage(1)} url={item.captured_image_url} text="抓拍照" className={styles.img} />
          <Card
            onClick={() => viewImage(2)}
            url={item.captured_full_image}
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
          value={getCalculateTime(item.notification_time, false, false)}
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
