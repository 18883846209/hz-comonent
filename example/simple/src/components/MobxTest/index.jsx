import React from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd-mobile";

import useStores from "@/hooks/useStores";
import Styles from "./styles/index.less";

export default observer(() => {
  const { commonStore } = useStores();
  const { themeStore } = useStores();

  return (
    <>
      <div className={Styles.h1}>commonStore.count = {commonStore.count}</div>
      <Button type="primary" onClick={() => commonStore.increment()}>
        ++
      </Button>
      <Button onClick={() => commonStore.decrement()}>--</Button>
      <br />
      <div className={Styles["h1-1"]}>themeStore.theme = {themeStore.theme}</div>
      <Button type="primary" inline size="small" onClick={() => themeStore.setTheme("light")}>
        set theme: light
      </Button>
      <Button inline size="small" onClick={() => themeStore.setTheme("dark")}>
        set theme: dark
      </Button>
      <Button onClick={() => Modal.operation([{ text: "标为未读" }, { text: "置顶聊天" }])}>operation</Button>
    </>
  );
});
