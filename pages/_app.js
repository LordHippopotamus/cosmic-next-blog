import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import Navigation from "../components/Navigation";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
