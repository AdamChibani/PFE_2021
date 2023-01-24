// import App from 'next/app'
import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalContext";
import { ProfileProvider } from "../components/MyProfile/components/context/ProfileContext";

import "../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf";

import "../assets/fonts/icon-font/fonts/avasta.ttf";
import "../assets/fonts/icon-font/css/style.css";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../node_modules/aos/dist/aos.css";

import "../assets/fonts/icon-font/css/style.css";
import "../assets/fonts/fontawesome-5/css/all.css";

import "../scss/bootstrap.scss";
import "../scss/main.scss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import { store, persister } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import DashboardMain from "./dashboard-main";
import Inbox from "./dashboard-inbox";
import DashboardSettings from "./dashboard-settings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "../components/AuthRoute";
const MyApp = ({ Component, pageProps, router }) => {
  const client = new ApolloClient({
    uri: "http://localhost:6969/api",
    // headers: {
    //   authorization: JSON.parse(x.user) || "",
    // },
    cache: new InMemoryCache(),
  });
  if (router.pathname.match(/404/) || router.pathname.match(/image/)) {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <GlobalProvider>
            <Layout pageContext={{ layout: "bare" }}>
              <Component {...pageProps} />
            </Layout>
          </GlobalProvider>
        </ApolloProvider>
      </Provider>
    );
  }
  if (router.pathname.match(/dashboard/)) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <ApolloProvider client={client}>
            <GlobalProvider>
              <Router>
                <Switch>
                  <AuthRoute path="/dashboard-main" type="private">
                    <Layout pageContext={{ layout: "dashboard" }}>
                      {console.log(pageProps)}

                      <Component {...pageProps} />
                    </Layout>
                  </AuthRoute>

                  <AuthRoute path="/dashboard-inbox" type="private">
                    <Layout pageContext={{ layout: "dashboard" }}>
                      <Component {...pageProps} />
                    </Layout>{" "}
                  </AuthRoute>

                  <AuthRoute path="/dashboard-settings" type="private">
                    <Layout pageContext={{ layout: "dashboard" }}>
                      <Component {...pageProps} />
                    </Layout>{" "}
                  </AuthRoute>
                </Switch>
              </Router>
            </GlobalProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    );
  }
  if (router.pathname.match(/my_profile/)) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <ApolloProvider client={client}>
            <GlobalProvider>
              <ProfileProvider>
                <Layout pageContext={{}}>
                  <Component {...pageProps} />
                </Layout>
              </ProfileProvider>
            </GlobalProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <ApolloProvider client={client}>
          <GlobalProvider>
            <Layout pageContext={{}}>
              <Component {...pageProps} />
            </Layout>
          </GlobalProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
