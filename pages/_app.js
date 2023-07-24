import "../styles/globals.css";
import { useRouter } from "next/router";
import Header from "../components/Layout/Header";
import MainNavigation from "../components/Layout/MainNavigation";
import Footer from "../components/Layout/Footer";
import { useEffect, useState } from "react";
import Loading from "../components/Fallback Pages/Loading";
import { AuthContextProvider } from "../store/auth-context";
function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      {loading ? <Loading></Loading> : ""}
      <Header></Header>
      <MainNavigation></MainNavigation>
      <main>
        <Component loading={loading} {...pageProps} />
      </main>
      <Footer></Footer>
    </AuthContextProvider>
  );
}

export default App;
