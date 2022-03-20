import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static getInitialProps(props: any) {
    // Returns an object like: { html, head, errorHtml, chunks, styles }
    return props.renderPage();
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
