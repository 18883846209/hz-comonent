import { useState, useEffect } from "react";

function Loading() {
  return <img style={{ height: 25 }} src={`/static/2x/loading.gif?${new Date().valueOf()}`} />;
}

export default Loading;
