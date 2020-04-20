import React from "react";

function Loading() {
  return <img style={{ height: 25 }} src={`/static/2x/loading.gif?${new Date().valueOf()}`} alt="" />;
}

export default Loading;
