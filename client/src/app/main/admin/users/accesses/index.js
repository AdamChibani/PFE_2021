import React from "react";
import { Redirect } from "react-router-dom";
import i18next from "i18next";

import fr_CA from "./i18n/fr_CA";
import en_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "access", fr_CA);
i18next.addResourceBundle("en-CA", "access", en_CA);

export default {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: "permissions",
  routes: [
    {
      path: "/admin/users/accesses/:id?-?:slug",
      component: React.lazy(() => import("./views/List.jsx")),
    },
    {
      path: "/admin/users/accesses/:id?",
      component: React.lazy(() => import("./views/List.jsx")),
    },
    {
      path: "/admin/users/accesses",
      component: () => <Redirect to="/admin/users/accesses/" />,
    },
  ],
};
