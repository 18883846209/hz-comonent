import App from "next/app";
import React from "react";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import { PageTransition } from "next-page-transitions";
import getConfig from "next/config";

import { InjectStoreContext } from "@/contexts/store";
import Loader from "@/components/Loader";

import "@/styles/common/reset.less";
import "@/styles/common/nprogress.less";
import "@/styles/common/next-page-transitions.less";

const { publicRuntimeConfig } = getConfig();

const TIMEOUT = 400;

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
          {/* 下面代码为了解决dev模式下路由跳转时的缓存问题 */}
          {process.env.NODE_ENV !== "production" && (
            <link rel="stylesheet" type="text/css" href={`/_next/static/css/styles.chunk.css?v=${router.route}`} />
          )}
          <script src={`${publicRuntimeConfig.cdn}/static/lib/rem/adaptive.min.js`} />
          <script src={`${publicRuntimeConfig.cdn}/static/lib/fastclick/1.0.6/fastclick.js`} />
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
          <PageTransition
            timeout={TIMEOUT}
            classNames="next-page-transitions"
            // skipInitialTransition
            loadingDelay={500}
            loadingComponent={<Loader />}
            loadingTimeout={{
              enter: TIMEOUT,
              exit: 0
            }}
            loadingClassNames="next-page-transitions-loading"
          >
            <Component {...pageProps} key={router.route} />
          </PageTransition>
        </InjectStoreContext>
      </>
    );
  }
}
