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

export { filterDataList }