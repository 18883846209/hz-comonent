import React from "react";
import Link from "next/link";

import { memoTransition } from "@/components/MemoTransition";
import MobxTest from "@/components/MobxTest";

const TestPage = memoTransition(() => (
  <div className="container">
    <main>
      <Link href="/">
        <a>go home</a>
      </Link>
      <br />
      <br />
      <MobxTest />
    </main>
  </div>
));

export default TestPage;
