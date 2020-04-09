import React from "react";
import PropTypes from "prop-types";

export default class Test extends React.PureComponent {
  static pageTransitionDelayEnter = true;

  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    const { pageTransitionReadyToEnter } = this.props;
    this.timeoutId = setTimeout(() => {
      pageTransitionReadyToEnter();
      this.setState({ loaded: true });
    }, 3 * 1000); // 先进入页面，再延时呈现
  }

  componentWillUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) return null;
    return <div>Hello, world!</div>;
  }
}

Test.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func
};
