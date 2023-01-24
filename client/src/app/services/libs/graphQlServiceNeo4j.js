import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { from } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import FuseUtils from "@fuse/FuseUtils";
import jwtService from "./jwtService";
import * as userService from "../graphql/users/users.service";

class graphQlServiceNeo4j extends FuseUtils.EventEmitter {
  client = null;

  init() {
    const apiBaseUrl = process.env.REACT_APP_DATA_GRAPH_URL;
    const httpLink = createUploadLink({ uri: apiBaseUrl });
    const middleware = this.getMiddleware();

    this.client = new ApolloClient({
      link: from([...middleware, httpLink]),
      cache: new InMemoryCache({
        addTypename: false,
      }),
      name: "Catu",
      version: 1,
    });
  }

  getMiddleware = () => {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          ...jwtService.getAuthHeaders(),
        },
      };
    });

    const errorLink = onError((error) => {
      //   console.log(error.networkError);
      //   jwtService.emit("onAutoLogout", "Invalid access_token");
      //   jwtService.setSession(null);
    });

    return [authLink, errorLink];
  };

  signInWithEmailAndPassword = userService.login;
  signInWithToken = userService.loginWithToken; //userService.loginWithToken;
  forgetPassword = () => {}; //userService.forgetPassword;
  resetPassword = () => {}; //userService.resetPassword;
  checkToken = () => {}; //userService.login;

  cleanLocalStorage = () => {
    // TODO
  };

  handleErros = (errors) => {
    // TODO
  };
}

const instance = new graphQlServiceNeo4j();

export default instance;
