const main = [
  {
    id: "applications",
    title: "Portail Tekru",
    translate: "portal tekru",
    type: "group",
    icon: "apps",
    auth: "login",
    children: [
      {
        id: "dashboard",
        title: "Tableau de bord",
        translate: "dashboard",
        type: "item",
        icon: "dashboard",
        url: "/app/dashboard",
        auth: "login",
      },
    ],
  },
];

const user = [
  {
    id: "account",
    translate: "account",
    type: "group",
    auth: "login",
    children: [
      {
        id: "myprofile",
        translate: "my_profil",
        type: "item",
        auth: "login",
        icon: "account_circle",
        url: "/users/profile",
      },
    ],
  },
];

const help = [
  {
    id: "phone-assistance",
    translate: "phone_assistance",
    type: "item",
    auth: "login",
    icon: "phone",
    url: "/app/phone-assistance",
  },
];

export { main, user, help };
