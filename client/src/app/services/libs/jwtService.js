import jwtDecode from "jwt-decode";
import FuseUtils from "@fuse/FuseUtils";
import graphQlService from "./graphQlService";
import graphQlServiceNeo4j from "./graphQlServiceNeo4j";

class jwtService extends FuseUtils.EventEmitter {
  provider = {};

  init(provider = null) {
    console.log(`init(${provider})`);
    switch (provider) {
      case "graphql":
        this.provider = graphQlService;
        break;
      case "graphqlNeo4j":
        this.provider = graphQlServiceNeo4j;
        break;

      default:
        this.provider = "axiosService";
        break;
    }
    if (this.provider && typeof this.provider.init === "function") {
      this.provider.init();
    }
    this.handleAuthentication();
  }

  handleAuthentication = () => {
    // Get Token
    let access_token = this.getAccessToken();

    // If there is no access token emit()
    if (!access_token) {
      this.emit("onNoAccessToken");
      return;
    }

    // Verify the token
    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "Session expirée, merci de se reconnecter");
    }
  };

  signInWithEmailAndPassword = async (user, password) => {
    return new Promise((resolve, reject) => {
      this.provider
        .signInWithEmailAndPassword(user, password)
        .then((response) => {
          console.log({ response });
          this.setSession(response.token);
          resolve(response.user);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });
  };

  signInWithToken = async () => {
    return new Promise((resolve, reject) => {
      this.provider
        .signInWithToken()
        .then((response) => {
          if (response.token && response.token !== this.getAccessToken()) {
            this.setSession(response.token);
          }
          resolve(response.user);
        })
        .catch((error) => {
          this.logout();
          reject(error);
        });
    });
  };

  logout = () => {
    this.setSession(null);
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
    } else {
      localStorage.removeItem("jwt_access_token");
      if (typeof this.provider.cleanLocalStorage === "function") {
        this.provider.cleanLocalStorage();
      }
    }
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    let result = false;
    try {
      const decoded = jwtDecode(access_token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp >= currentTime) {
        result = true;
      }
    } catch (e) {
      result = true;
    }
    return result;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };

  getAuthHeaders = () => {
    const token = this.getAccessToken();
    if (!token) {
      return {};
    }
    return {
      authorization: `${token}`,
    };
  };
}

const instance = new jwtService();

export default instance;
