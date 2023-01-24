import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { from } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import FuseUtils from "@fuse/FuseUtils";
import jwtService from "./jwtService";
import * as userService from "../graphql/users/users.service";

class graphQlService extends FuseUtils.EventEmitter {
  client = null;

  init() {
    const apiBaseUrl = process.env.REACT_APP_GRAPHQL_URL;
    const httpLink = createUploadLink({ uri: apiBaseUrl });
    const middlewares = this.getMiddlewares();

    this.client = new ApolloClient({
      link: from([...middlewares, httpLink]),
      cache: new InMemoryCache({
        addTypename: false,
      }),
      name: "Catu",
      version: 1,
    });
  }

  getMiddlewares = () => {
    const authMiddleware = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          ...jwtService.getAuthHeaders(),
        },
      };
    });

    const errorMiddleware = onError(
      ({ response, graphQLErrors, networkError }) => {
        // If the error comes from the graphQL
        if (Array.isArray(graphQLErrors)) {
          const grantError = graphQLErrors.find((error) => {
            return error.extensions.code.toUpperCase() === "GRANT_ERROR";
          });
          if (grantError) {
            jwtService.emit("onAutoLogout", grantError.message);
            jwtService.setSession(null);
            response.errors = null;
          }
        }
        if (networkError) {
          // Log
        }
      }
    );

    return [authMiddleware, errorMiddleware];
  };

  signInWithEmailAndPassword = userService.login;
  signInWithToken = userService.loginWithToken; //userService.loginWithToken;
  checkToken = () => {}; //userService.login;

  cleanLocalStorage = () => {
    // TODO
  };

  handleErros = (errors) => {
    // TODO
  };
}

const instance = new graphQlService();

export default instance;
