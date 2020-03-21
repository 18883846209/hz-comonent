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
        <Head />
        <body className={BODY_CLASSNAME}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
