import React from 'react';
import i18next from "i18next";

import fr_CA from "./i18n/fr_CA";
import en_CA from "./i18n/fr_CA";

i18next.addResourceBundle("fr-CA", "dashboardApp", fr_CA);
i18next.addResourceBundle("en-CA", "dashboardApp", en_CA);


export const DashboardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    name    : 'Tableau de bord',
    auth    : 'login',
    routes  : [
        {
            path: '/app/dashboard',
            component: React.lazy(() => import('./Dashboard'))
        }
    ]
};
