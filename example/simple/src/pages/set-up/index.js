import React from "react";
import Link from "next/link";

import { memoTransition } from "@/components/MemoTransition";

// 使用 memoTransition，避免重复刷新
const TestPage = memoTransition(() => {
  // eslint-disable-next-line
  console.log("测试刷新次数");
  return (
    <div className="container">
      <main>
        <Link href="/">
          <a>go home</a>
        </Link>
      </main>
    </div>
  );
});
// 延迟展示
TestPage.getInitialProps = async () => {
  // 可以用作服务端请求
  await new Promise(resolve => {
    setTimeout(resolve, 1000 * 3);
  });
  return { title: "set-up" };
};

export default TestPage;
