import React from "react";
import Link from "next/link";

// 延迟展示
const TestPage = () => (
  <div className="container">
    <main>
      <Link href="/">
        <a>go home</a>
      </Link>
    </main>
  </div>
);
TestPage.getInitialProps = async () => {
  // 可以用作服务端请求
  await new Promise(resolve => {
    setTimeout(resolve, 1000 * 3);
  });
  return { title: "set-up" };
};

export default TestPage;
