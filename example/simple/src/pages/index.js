import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Home = ({ timerNum }) => (
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
      <div>
        <Link href={`/test/${timerNum}`}>
          <a>test/[id]</a>
        </Link>
      </div>
      <div>
        <Link href="/class-mobx">
          <a>class-mobx</a>
        </Link>
      </div>
    </main>

    <footer>
      Powered by <img src={`${publicRuntimeConfig.cdn}/static/images/logo.png`} alt="Logo" />
    </footer>
  </div>
);
Home.getInitialProps = async () => {
  return { timerNum: Date.now(), title: "title-test" };
};
Home.propTypes = {
  timerNum: PropTypes.number
};

export default Home;
