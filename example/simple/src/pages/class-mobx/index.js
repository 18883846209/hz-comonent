import React from "react";
import { observer } from "mobx-react";
import { Button } from "antd-mobile";
import PropTypes from "prop-types";
import Link from "next/link";

import { inject } from "@/contexts/store";

@inject("themeStore")
@observer
class Main extends React.Component {
  renderTest = () => {
    const { themeStore } = this.props;
    console.log(this.props);
    return (
      <>
        <div>themeStore.theme = {themeStore.theme}</div>
        <Button type="primary" inline size="small" onClick={() => themeStore.setTheme("light")}>
          set theme: light
        </Button>
        <Button inline size="small" onClick={() => themeStore.setTheme("dark")}>
          set theme: dark
        </Button>
      </>
    );
  };

  render() {
    return (
      <div>
        <div>
          <Link href="/test">
            <a>test</a>
          </Link>
        </div>
        {this.renderTest()}
      </div>
    );
  }
}
Main.propTypes = {
  themeStore: PropTypes.object.isRequired
};
export default Main;
