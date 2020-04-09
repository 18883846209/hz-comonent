import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd-mobile";
import Link from "next/link";

import { memoTransition } from "@/components/MemoTransition";
import { register, registerOff, trigger } from "@/utils/withApp";

const TestPage = memoTransition(() => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    register("tqtTestAppCall", () => {
      setNum(999);
    });
    register("tqtTestObjAppCall", (obj, cb) => {
      Modal.operation([{ text: "obj" }, { text: `${obj}---${cb}` }]);
      if (cb) {
        cb({
          code: "0000"
        });
      }
    });
    return () => {
      registerOff("tqtTestAppCall");
      registerOff("tqtTestObjAppCall");
    };
  }, []);

  return (
    <div className="container">
      <main>
        <Link href="/">
          <a>go home</a>
        </Link>
        <br />
        <br />
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
            trigger(
              "hideNavigation",
              {
                is_hide: false
              },
              data => {
                Modal.operation([{ text: "hideNavigation_cb" }, { text: `${data}---${data.tqt}` }]);
              }
            );
          }}
        >
          is_hide: false
        </Button>
      </main>
    </div>
  );
});

export default TestPage;
