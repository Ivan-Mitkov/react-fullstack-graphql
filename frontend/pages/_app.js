/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import Page from "../components/Page";
import Router from "next/router";
import NProgress from "nprogress";
import "../components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";

//https://ricostacruz.com/nprogress/
//https://nextjs.org/docs/api-reference/next/router#routerevents
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

//if any page has getInitialProps fetch it It's better to add Apollo in every page instead if you have pages that don't need Apollo. https://www.npmjs.com/package/next-with-apollo
// To access Apollo Client in each page's getInitialProps, add getInitialProps to App like so:
MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return pageProps;
};
//https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component
//apollo prop comes from withData function wich wrap the app
function MyApp({ Component, pageProps, apollo }) {
  console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};
export default withData(MyApp);
