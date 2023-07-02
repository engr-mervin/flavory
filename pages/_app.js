import "../styles/globals.css";

import Header from "../components/Layout/Header";
import MainNavigation from "../components/Layout/MainNavigation";
import Footer from "../components/Home/Footer";

function App({ Component, pageProps }) {
  return (
    <>
      <Header></Header>
      <MainNavigation></MainNavigation>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  );
}

export default App;
