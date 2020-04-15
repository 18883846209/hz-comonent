import { useState, useEffect } from "react";

function Loading({ refreshing }) {
  const [src, setSrc] = useState("");
  const [refresh, setRefresh] = useState(refreshing);
  useEffect(() => {
    setSrc("/static/2x/loading.gif");
    setRefresh(refreshing);
  }, [refreshing]);
  return refresh ? <img style={{ height: 25 }} src={src} /> : null;
}

export default Loading;
