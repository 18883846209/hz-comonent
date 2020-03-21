import App from "next/app";
import React from "react";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import { PageTransition } from "next-page-transitions";
import getConfig from "next/config";

import { InjectStoreContext, initializeData } from "@/contexts/store";

import "@/styles/common/reset.less";
import "@/styles/common/nprogress.less";
import "@/styles/common/next-page-transitions.less";
// import Layout from "@components/layout/base-layout";

const { publicRuntimeConfig } = getConfig();

const TIMEOUT = 400;

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const initialStoreData = initializeData();

    // Provide the store to getInitialProps of pages
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, initialStoreData });
    }

    return {
      pageProps,
      initialStoreData
    };
  }

  // constructor(props) {
  //   super(props);

  //   const { initialMobxState } = props;
  //   const isServer = typeof window === "undefined";
  //   this.mobxStores = isServer ? initialMobxState : initializeStore(initialMobxState);
  // }

  componentDidMount() {
    window.hzConfig = publicRuntimeConfig;
  }

  componentWillUnmount() {}

  render() {
    const { Component, pageProps = {}, router, initialStoreData } = this.props;

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
          <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
          <link href="/static/images/logo.png" rel="apple-touch-icon-precomposed" />
          <script src="/static/lib/rem/adaptive.min.js" />
          <script src="/static/lib/fastclick/1.0.6/fastclick.js" />
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
          {/* <Layout router={router}> */}
          <PageTransition timeout={TIMEOUT} classNames="next-page-transitions">
            <Component {...pageProps} key={router.route} />
          </PageTransition>
          {/* </Layout> */}
        </InjectStoreContext>
      </>
    );
  }
}
