import { FuseUtils } from "@fuse";

function adminMenuHelper() {
  const data = [];
  const row_data = [
    {
      id: "portal-modules",
      title: "Configuration du portail",
      translate: "portal_settings",
      elements: [
        {
          title: "Tableau de bord",
          translate: "dashboard",
          auth: "platform-admin",
          id: "dashboard",
          icon: "dashboard",
          url: "",
        },
        {
          title: "Configuration des modules",
          translate: "modules_settings",
          id: "modules_settings",
          auth: "platform-admin",
          icon: "dashboard",
          url: "",
        },
      ],
    },

    {
      id: "users-access",
      title: "Utilisateurs et accès",
      elements: [
        {
          id: "admin-users-access-users-manager",
          title: "Gestion des utilisateurs",
          auth: "users",
          icon: "supervised_user_circle",
          url: "/admin/users/management/list",
        },
        {
          id: "admin-users-access-accesses",
          title: "Gestion des droits utilisateurs",
          auth: "permissions",
          icon: "group",
          url: "/admin/users/accesses",
        },
      ],
    },
  ];

  // Verify for the Permission
  for (let category of row_data) {
    if (category.elements && category.elements.length > 0) {
      let tmp = [];
      for (let item of category.elements) {
        if (FuseUtils.hasPermission(item.auth)) {
          tmp.push(item);
        }
      }
      if (tmp.length > 0) {
        category.elements = tmp;
        data.push(category);
      }
    }
  }

  return data;
}

export default adminMenuHelper;
