import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Flex } from "antd-mobile";
import { Progress, Card } from "@/components/WarnComponents";
import ImageViewer from "@/components/ImageViewer";
import Empty from "@/components/Empty";
import { getCalculateTime, getDpr } from "@/utils/utils";
import styles from "@/styles/warn/detail.less";

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
  let sex;
  switch (str) {
    case "1":
      sex = "男";
      break;
    case "2":
      sex = "女";
      break;
    case "9":
      sex = "未说明";
      break;
    default:
      sex = "未知";
  }
  return sex;
};

const width = 136;
const height = 182;

const Detail = ({ item = {} }) => {
  const [loading, setLoading] = useState(true);
  const [imageVisible, setImageVisible] = useState(false);
  const [defaultIndex, setdefaultIndex] = useState(0);
  const sources = [item.target_image_url, item.captured_image_url, item.captured_full_image];
  const data = Object.keys(item);
  const cardListData = [
    {
      width,
      height,
      url: item.target_image_url,
      text: "布控照"
    },
    {
      width,
      height,
      url: item.captured_image_url,
      text: "抓拍照"
    },
    {
      width: 43,
      height: 24,
      url: item.captured_full_image,
      text: "全景照"
    }
  ];
  const itemListData = [
    {
      src: "warn/detail_sex",
      name: "性别",
      value: changeSex(item.gender)
    },
    {
      src: "warn/detail_card",
      name: "身份证号",
      value: item.certificate_id || ""
    },
    {
      src: "warn/detail_disposition",
      name: "布控名单",
      value: item.face_library_name || ""
    },
    {
      src: "warn/detail_time",
      name: "时间",
      value: getCalculateTime(item.notification_time, true, false)
    },
    {
      src: "warn/detail_position",
      name: "位置",
      value: item.device_name || ""
    }
  ];
  useEffect(() => {
    setLoading(false);
  }, []);
  function viewImage(index) {
    setImageVisible(true);
    setdefaultIndex(index);
  }
  return loading || !data.length ? (
    <Empty loading={loading} data={data} />
  ) : (
    <div className={styles.detail}>
      <div className={styles.bg} />
      <ImageViewer
        onClose={() => setImageVisible(false)}
        visible={imageVisible}
        defaultIndex={defaultIndex}
        sources={sources}
      />
      <div className={styles.top}>
        <div className={styles.name}>{item.name || ""}</div>
        <div className={styles.similar}>
          <Progress percent={Number(item.alarm_score)} />
        </div>
        <div className={styles.center}>
          {cardListData.map((v, i) => (
            <Card
              key={i}
              onClick={() => viewImage(i)}
              width={v.width}
              height={v.height}
              url={v.url}
              text={v.text}
              className={i !== 2 ? styles.img : styles.full_wrap}
              imgClass={i === 2 ? styles.full_img : ""}
            />
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        {itemListData.map((v, i) => (
          <Item src={getDpr(v.src)} name={v.name} value={v.value} key={i} />
        ))}
      </div>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  src: PropTypes.string,
  item: PropTypes.object
};

Detail.propTypes = {
  item: PropTypes.object
};

Detail.getInitialProps = ({ query }) => {
  return { item: query };
};

export default Detail;
