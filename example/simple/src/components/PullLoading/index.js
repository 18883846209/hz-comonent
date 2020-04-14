import { useState, useEffect } from "react";

function Loading() {
  const [src, setSrc] = useState("");
  useEffect(() => {
    setSrc("/static/2x/loading.gif");
    return () => {
      setSrc("");
    };
  });
  return src ? <img style={{ height: 25 }} src={src} /> : null;
}

export default Loading;
