import React from "react";
import Link from "next/link";

import MobxTest from "@/components/MobxTest";

const TestPage = () => (
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
);

export default TestPage;
