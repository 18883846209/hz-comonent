import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

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
    </main>

    <footer>
      Powered by <img src="/static/images/logo.png" alt="Logo" />
    </footer>
  </div>
);
Home.getInitialProps = async () => {
  return { timerNum: Date.now() };
};
Home.propTypes = {
  timerNum: PropTypes.number
};

export default Home;
