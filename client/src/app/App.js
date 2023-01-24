import MomentUtils from "@date-io/moment";
import FuseAuthorization from "@fuse/components/FuseAuthorization";
import FuseLayout from "@fuse/components/FuseLayout";
import FuseTheme from "@fuse/components/FuseTheme";
import history from "@history";
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
} from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import rtl from "jss-rtl";
import React from "react";
import Provider from "react-redux/es/components/Provider";
import { Router } from "react-router-dom";
import AppContext from "./AppContext";
import { Auth } from "./auth";
import routes from "./configs/routesConfig";
import store from "./store";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import fr from "javascript-time-ago/locale/fr";
import { ApolloProvider } from "@apollo/react-hooks";
import grapQlService from "app/services/libs/graphQlService";

JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(fr);

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName();

const App = () => {
  if (!grapQlService.client) grapQlService.init();
  const { client } = grapQlService;

  return (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <ApolloProvider client={client}>
        <StylesProvider jss={jss} generateClassName={generateClassName}>
          <Provider store={store}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Auth>
                <Router history={history}>
                  <FuseAuthorization>
                    <FuseTheme>
                      <FuseLayout />
                    </FuseTheme>
                  </FuseAuthorization>
                </Router>
              </Auth>
            </MuiPickersUtilsProvider>
          </Provider>
        </StylesProvider>
      </ApolloProvider>
    </AppContext.Provider>
  );
};

export default App;
