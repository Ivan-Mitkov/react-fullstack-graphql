/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import Page from "../components/Page";
import Router from "next/router";
import NProgress from "nprogress";
import "../components/styles/nprogress.css";

//https://ricostacruz.com/nprogress/
//https://nextjs.org/docs/api-reference/next/router#routerevents
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};
