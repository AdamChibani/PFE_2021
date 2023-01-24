import React from "react";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";

function DashboardContent() {
  return <div className="mt-8 p-16 w-3/4"></div>;
}

export default withReducer("dashboard", reducer)(DashboardContent);
