import React from "react";
import { Redirect } from "react-router-dom";
import i18next from "i18next";

import fr_CA from "./i18n/fr_CA";
import en_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "UserModule", fr_CA);
i18next.addResourceBundle("en-CA", "UserModule", en_CA);

export const userManagementConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  name: "Gestion des utilisateurs",
  auth: "users",
  routes: [
    {
      path: "/admin/users/management/item/:itemId/:itemSlug?",
      component: React.lazy(() => import("./views/Item")),
    },
    {
      path: "/admin/users/management/list",
      component: React.lazy(() => import("./views/List")),
    },
    {
      path: "/admin/users/management",
      component: () => <Redirect to="/admin/users/management/list" />,
    },
    {
      path: "/admin/users",
      component: () => <Redirect to="/admin/users/management/list" />,
    },
  ],
};
