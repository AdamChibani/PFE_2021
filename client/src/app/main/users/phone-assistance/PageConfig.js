import React from "react";
import { Redirect } from "react-router-dom";
import i18next from "i18next";

import fr_CA from "./i18n/fr_CA";
import en_CA from "./i18n/en_CA";

i18next.addResourceBundle("fr-CA", "app", fr_CA);
i18next.addResourceBundle("en-CA", "app", en_CA);

export const PhoneAssistanceConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  name: "Assistance Telephonique",
  auth: "login",
  routes: [
    {
      path: "/app/phone-assistance",
      component: React.lazy(() => import("./views/List")),
    }
  ],
};
