import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// 动态路由实例
const TestPage = () => {
  const router = useRouter();
  return (
    <div className="container">
      <main>
        <Link href="/">
          <a>go home</a>
        </Link>
        <div>id:{router.query.id}</div>
      </main>
    </div>
  );
};

export default TestPage;
