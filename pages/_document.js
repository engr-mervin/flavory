import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Flavory</title>
        <meta charset="UTF-8" />
        <meta name="description" content="Recipe App" />
        <meta name="author" content="John Mervin C. Bocatcat" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Main />
        <div id="modal-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}
