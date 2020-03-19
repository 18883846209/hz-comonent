// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

const BODY_CLASSNAME = "tqt-koa-next";

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="zh">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
          {/* 全局引入rem.js */}
          <script src="/static/lib/rem/antm-viewport.min.js" />
          {/* antd-m 依赖 fastclick */}
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
        <body className={BODY_CLASSNAME}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
