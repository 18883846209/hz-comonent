/* eslint no-undef: "error" */
/* eslint-env browser */

export function ptToRem(pt) {
  return `${pt / 50}rem`;
}

export function getImg(require1, require2) {
  if (typeof window !== "undefined" && window.devicePixelRatio > 2) {
    return require2;
  }
  return require1;
}

function stopTouch(e) {
  e.preventDefault();
}

export function toggleContainerTouchAction(v) {
  const dom = document.body;
  if (!dom) {
    return;
  }

  if (v) {
    dom.addEventListener("touchmove", stopTouch, {
      passive: false,
      capture: true
    });
  } else {
    dom.removeEventListener("touchmove", stopTouch, { capture: true });
  }
  dom.style["touch-action"] = v ? "none" : "auto";
}

export function dataURLtoFile(dataurl, filename = "fileName") {
  try {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const suffix = mime.split("/")[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `${filename}.${suffix}`, { type: mime });
  } finally {
    // empty
  }
}

// 判断微信中ios 、android
export function isBrowser() {
  const userAgent = navigator.userAgent;
  const isAndroid = userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1; // android终端
  const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isAndroid) {
    // console.dir("是在安卓手机的微信浏览器里");
    return "android";
  } else if (isiOS) {
    // console.dir("是在ios手机里的微信浏览器里");
    return "ios";
  }
  return "";
}
