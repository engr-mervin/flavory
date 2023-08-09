import "../styles/globals.css";
import { useRouter } from "next/router";
import Header from "../components/Layout/Header";
import MainNavigation from "../components/Layout/MainNavigation";
import Footer from "../components/Layout/Footer";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Fallback Pages/Loading";
import { AuthContextProvider } from "../store/auth-context";
import UserDataProvider from "../components/Wrapper/UserDataProvider";
import { UserDataContextProvider } from "../store/user-data-context";
import { ModalContextProvider } from "../store/modal-context";
import Modal from "../components/UI/Modal";
import { createPortal } from "react-dom";
import Head from "next/head";
function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [documentObj, setDocumentObj] = useState(null);
  useEffect(() => {
    setDocumentObj(document);
  }, []);
  useEffect(() => {
    const startLoading = function () {
      setLoading(true);
    };

    const stopLoading = function () {
      setLoading(false);
    };

    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeError", stopLoading);
    router.events.on("routeChangeComplete", stopLoading);

    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeError", stopLoading);
      router.events.off("routeChangeComplete", stopLoading);
    };
  });
  return (
    <AuthContextProvider>
      <UserDataContextProvider>
        <ModalContextProvider>
          <UserDataProvider>
            <Head>
              <title>Flavory</title>
              <link rel="shortcut icon" href="/images/favicon.ico" />
              <link
                rel="icon"
                type="image/png"
                sizes="96x96"
                href="/image/favicon96.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/image/favicon32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/image/favicon16.png"
              />
              <meta charset="UTF-8" />
              <meta name="description" content="Recipe App" />
              <meta name="author" content="John Mervin C. Bocatcat" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            {loading ? <Loading></Loading> : ""}
            <Header></Header>
            <MainNavigation></MainNavigation>
            <main>
              <Component loading={loading} {...pageProps} />
            </main>
            <Footer></Footer>
            {documentObj
              ? createPortal(
                  <Modal></Modal>,
                  document.getElementById("modal-root")
                )
              : ""}
          </UserDataProvider>
        </ModalContextProvider>
      </UserDataContextProvider>
    </AuthContextProvider>
  );
}

export default App;
