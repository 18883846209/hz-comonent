const filterDataList = [
  {
    title: "状态",
    key: "disposition_status",
    valList: [
      {
        key: "不限",
        value: null
      },
      {
        key: "布控中",
        value: 0
      },
      {
        key: "已撤控",
        value: 1
      },
      {
        key: "已过期",
        value: 2
      },
      {
        key: "未开始",
        value: 9
      }
    ]
  },
  {
    title: "目标",
    key: "disposition_target_type",
    valList: [
      {
        key: "不限",
        value: null
      },
      {
        key: "名单库布控",
        value: 1
      },
      {
        key: "单人布控",
        value: 2
      },
      {
        key: "民族布控",
        value: 3
      }
    ]
  },
  {
    title: "告警订阅",
    key: "subscribe_status",
    valList: [
      {
        key: "不限",
        value: null
      },
      {
        key: "已订阅",
        value: 1
      },
      {
        key: "未订阅",
        value: 0
      }
    ]
  }
];

export { filterDataList };
