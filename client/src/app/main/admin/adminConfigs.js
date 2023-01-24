import UsersConfig from "./users/UsersConfig";
import { AdminHomeConfig } from "./home/PageConfig";

export const AdminConfigs = [
  // User
  ...UsersConfig,
  // Home !important to be last
  AdminHomeConfig,
];
