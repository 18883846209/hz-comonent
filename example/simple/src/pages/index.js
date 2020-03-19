import React from "react";
import Link from "next/link";

const Home = () => (
  <div className="container">
    <main>
      <div>
        <Link href="/test">
          <a>test</a>
        </Link>
      </div>
      <div>
        <Link href="/set-up">
          <a>set-up</a>
        </Link>
      </div>
    </main>

    <footer>
      Powered by <img src="/static/images/logo.png" alt="Logo" />
    </footer>
  </div>
);

export default Home;
