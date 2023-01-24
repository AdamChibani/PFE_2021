import React from 'react';

export default {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : 'config',
    routes  : [
        {
            path     : '/admin/misc/navigation-menu',
            component: React.lazy(() => import('./NavigationMenuPage'))
        }
    ]
};