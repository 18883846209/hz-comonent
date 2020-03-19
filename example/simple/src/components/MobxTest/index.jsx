import React from "react";
import { observer } from "mobx-react";
import { Button } from "antd-mobile";

import useStores from "@/hooks/useStores";

export default observer(() => {
  const { commonStore } = useStores();
  const { themeStore } = useStores();

  return (
    <>
      <div>commonStore.count = {commonStore.count}</div>
      <Button onClick={() => commonStore.increment()}>++</Button>
      <Button onClick={() => commonStore.decrement()}>--</Button>
      <br />
      <div>themeStore.theme = {themeStore.theme}</div>
      <Button onClick={() => themeStore.setTheme("light")}>set theme: light</Button>
      <Button onClick={() => themeStore.setTheme("dark")}>set theme: dark</Button>
    </>
  );
});
