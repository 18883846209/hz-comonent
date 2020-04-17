import App from "next/app";
import React from "react";
import Router from "next/router";
import Head from "next/head";
import getConfig from "next/config";

import { InjectStoreContext } from "@/contexts/store";

import "@/styles/common/reset.less";
import "@/styles/common/nprogress.less";
import "@/styles/common/next-page-transitions.less";
import Layout from "@/components/Layout";

const { publicRuntimeConfig } = getConfig();

const NEXT_CSS_FILE = "/_next/static/css/styles.chunk.css";

Router.events.on("routeChangeComplete", () => {
  // 下面代码为了解决dev模式下路由跳转时的缓存问题
  if (process.env.NODE_ENV !== "production") {
    const els = document.querySelectorAll(`link[href*="${NEXT_CSS_FILE}"][rel="stylesheet"]`);
    const timestamp = new Date().valueOf();
    if (els[0]) {
      els[0].href = `${NEXT_CSS_FILE}?v=${timestamp}`;
    }
  }
});

export default class extends App {
  componentDidMount() {
    window.hzConfig = publicRuntimeConfig;

    // detect 0.5px supports
    const docEl = document.documentElement;
    const dpr = window.devicePixelRatio || 1;
    if (dpr >= 2) {
      const fakeBody = document.createElement("body");
      const testElement = document.createElement("div");
      testElement.style.border = ".5px solid transparent";
      fakeBody.appendChild(testElement);
      docEl.appendChild(fakeBody);
      if (testElement.offsetHeight === 1) {
        docEl.classList.add("hairlines");
      }
      docEl.removeChild(fakeBody);
    }
  }

  componentWillUnmount() {}

  render() {
    const { Component, router, initialStoreData, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>{`${pageProps.title || publicRuntimeConfig.title}`}</title>
          <meta charSet="utf-8" />
          <meta name="App-Config" content="fullscreen=yes,useHistoryState=yes,transition=yes" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="yes" name="apple-touch-fullscreen" />
          <meta content="telephone=no,email=no" name="format-detection" />
          <meta
            key="viewport"
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
          />
          <link rel="shortcut icon" href={`${publicRuntimeConfig.cdn}/static/favicon.ico`} type="image/x-icon" />
          <link href={`${publicRuntimeConfig.cdn}/static/images/logo.png`} rel="apple-touch-icon-precomposed" />
          <script src={`${publicRuntimeConfig.cdn}/static/lib/rem/adaptive.min.js`} />
          <script src={`${publicRuntimeConfig.cdn}/static/lib/fastclick/1.0.6/fastclick.js`} />
          <script src={`${publicRuntimeConfig.cdn}/static/lib/sockjs/sockjs.min.js`}></script>
          <script src={`${publicRuntimeConfig.cdn}/static/lib/sockjs/stomp.min.js`}></script>

          <script
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{
              __html: `
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
`
            }}
          />
        </Head>
        <InjectStoreContext initialData={initialStoreData}>
          <Layout router={router}>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </InjectStoreContext>
      </>
    );
  }
}
