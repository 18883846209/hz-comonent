import React from "react";
import Link from "next/link";

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
  await new Promise(resolve => {
    setTimeout(resolve, 50000);
  });
  return {};
};

export default TestPage;
