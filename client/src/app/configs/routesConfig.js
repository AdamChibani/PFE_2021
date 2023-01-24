import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";
import { AuthConfigs } from "app/main/auth/authConfigs";
import { UsersConfigs } from "../main/users/usersConfigs";
import { AdminConfigs } from "../main/admin/adminConfigs";
import { PortalConfigs } from "../main/portal/portalConfigs";
import { MiscConfigs } from "../main/misc/miscConfigs";

const routeConfigs = [
  ...AuthConfigs,
  ...UsersConfigs,
  ...AdminConfigs,
  ...PortalConfigs,
  ...MiscConfigs,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/app/dashboard" />,
  },
];

export default routes;
