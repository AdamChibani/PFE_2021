import React from "react";

import { connect } from "react-redux";

import { Redirect, Route } from "react-router";
import { createStructuredSelector } from "reselect";
import selectAuth from "../redux/user/userSelector";

const AuthRoute = (props) => {
  const { type } = props;
  console.log(
    type === "private" &&
      !(props?.user?.user?.role?.id == 3 || props?.user?.user?.role?.id == 1),
    type
  );
  if (
    type === "guest" &&
    (props?.user?.user?.role?.id == 3 || props?.user?.user?.role?.id == 1)
  )
    return <Redirect to="/dashboard-main" />;
  else if (
    type === "private" &&
    !(props?.user?.user?.role?.id == 3 || props?.user?.user?.role?.id == 1)
  )
    return <Redirect to="/" />;

  return <Route {...props} />;
};

const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(AuthRoute);
