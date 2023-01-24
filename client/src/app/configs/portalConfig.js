const portalConfig = {
  companyName: "Tekru",
  longName: "Portail Tekru",
  loginDescription:
    "Avec une expertise d’équipe cumulée qui dépasse les 25 ans, Tekru est une société de développement de solution informatique spécialisée dans le web.Tekru se spécialise dans le domaine du web d’un simple site web d’entreprise à des solutions web complexe de gestion d’entreprise et de couche métier",
  allowLBUN: false, // Allow login by Username
  showCompanyNameInSidebar: false, // if to show company name next to the logo
  colors: {
    main: "#FFA400",
    gradiant: "#00826E",
  },
  multilang: true,
  defaultLanguage: "fr-CA",
  languages: [
    {
      id: "fr-CA",
      title: "Français (CA)",
      shortName: "FR",
      flag: "ca",
    },
    {
      id: "en-CA",
      title: "English (CA)",
      shortName: "EN",
      flag: "ca",
    },
    {
      id: "en-us",
      title: "English (US)",
      shortName: "EN",
      flag: "us",
    },
  ],
};

export default portalConfig;
