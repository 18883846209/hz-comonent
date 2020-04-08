import React, { useState, useEffect } from "react";
import { Button } from "antd-mobile";

import { memoTransition } from "@/components/MemoTransition";
import { register, trigger } from "@/utils/withApp";

const TestPage = memoTransition(() => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    register("tqtTestAppCall", () => {
      setNum(999);
    });
  }, []);

  return (
    <div className="container">
      <main>
        <div>测试APP call H5: num = {num}</div>
        <Button type="primary" onClick={() => setNum(pre => ++pre)}>
          H5 ++
        </Button>
        <br />
        <div>测试H5 call APP</div>
        <Button
          onClick={() => {
            trigger("hideNavigation", {
              is_hide: true,
              status_bar_color: "333333"
            });
          }}
        >
          is_hide: true
        </Button>
        <Button
          onClick={() => {
            trigger("hideNavigation", {
              is_hide: false
            });
          }}
        >
          status_bar_color: false
        </Button>
      </main>
    </div>
  );
});

export default TestPage;
