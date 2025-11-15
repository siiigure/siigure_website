import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="antialiased m-0 p-0 overflow-x-hidden bg-main-gradient">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
