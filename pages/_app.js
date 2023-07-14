import "../styles/globals.css";

import Header from "../components/Layout/Header";
import MainNavigation from "../components/Layout/MainNavigation";
import Footer from "../components/Layout/Footer";
function App({ Component, pageProps }) {
  return (
    <>
      <Header></Header>
      <MainNavigation></MainNavigation>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
