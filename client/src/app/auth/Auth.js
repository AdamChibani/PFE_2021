import React, { Component } from "react";
import { FuseSplashScreen } from "@fuse";
import { connect } from "react-redux";
import * as userActions from "app/auth/store/actions";
import { bindActionCreators } from "redux";
import * as Actions from "app/store/actions";
import jwtService from "app/services/libs/jwtService";
import { Trans } from "react-i18next";

class Auth extends Component {
  state = {
    waitAuthCheck: true,
  };

  componentDidMount() {
    //return Promise.all([this.jwtCheck(), this.props.setNavigation()]).then(
    return this.jwtCheck().then((p) => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = () =>
    new Promise((resolve, reject) => {
      jwtService.on("onAutoLogin", () => {
        this.props.showMessage({ message: "loading" });
        jwtService
          .signInWithToken()
          .then((user) => {
            this.props.setUserData(user);
            resolve();
            this.props.showMessage({
              message: <Trans>welcome_to_portal</Trans>,
            });
          })
          .catch((error) => {
            this.props.showMessage({ message: error });
            this.props.logout();
            reject();
          });
      });

      jwtService.on("onAutoLogout", (message) => {
        if (message) {
          this.props.showMessage({ message });
        }
        this.props.logout();
        resolve();
      });

      jwtService.on("onNoAccessToken", () => {
        resolve();
      });

      jwtService.init("graphql");
      return Promise.resolve();
    });

  render() {
    return this.state.waitAuthCheck ? (
      <FuseSplashScreen />
    ) : (
      <React.Fragment children={this.props.children} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
