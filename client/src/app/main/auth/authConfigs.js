import i18next from "i18next";
import loginConfig from "app/main/auth/login";
import registerConfig from "app/main/auth/register";
import forgotPasswordPageConfig from "app/main/auth/forgot-password";
import resetPasswordPageConfig from "app/main/auth/reset-password";

import fr_CA from "./i18n/fr_CA";
import en_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "auth", fr_CA);
i18next.addResourceBundle("en-CA", "auth", en_CA);

export const AuthConfigs = [
  loginConfig,
  registerConfig,
  forgotPasswordPageConfig,
  resetPasswordPageConfig,
];
