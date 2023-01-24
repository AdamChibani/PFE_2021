
# Portal frontend

Portal Frontend is a ReactJS frontend for **Portail Nominis Inc** company in Canada.
Created by **Tekru Technologies** (Tunisia) hosted and managed by **Globe Technilogie Inc** (Canada)

## Installation

Make sure you have [Node.js](https://nodejs.org/). 
Use the package manager [Yarn](https://yarnpkg.com/) to install Portal frontend.

```bash
yarn install
```

or 

```bash
npm install
```

Your app should now be running on [localhost:3000](http://localhost:3000).

### GraphQL

This interface interacts with the Portal Apollo package;

### ENV Variables

| Variable name | Description |
|--|--|
| REACT_APP_GRAPHQL_URL | Main GraphQL API URL |
| REACT_APP_DATA_GRAPH_URL | GraphQL URL for the Graph data (Neo4j server) |
| REACT_APP_STRP_PK | Stripe public key |

#### What other .env files can be used?

.env: Default
.env.staging for Staging environment
.env.production for Production environment

*In general the fine name is .env.[$environment]*

## Built With

Based on the [Fuse](http://react-material.fusetheme.com/documentation/getting-started/introduction) template

## Deployment

Import to verify configuration in the .env files before building, for more details please check the documentation on [Create-react-app.dev](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env)

You can create a production build locally by running this command in your terminal:

```bash
yarn build
```

or

```bash
npm run build
```

This will generate a /build or /dist folder. The content of the folder is to be used in a static HTTP server (Apache, NodeJS/ExpressJS, Nginx, etc..).

Note: adding GENERATE_SOURCEMAP to the Env variables is important for production enivrement specially if the NODE_ENV is not *production*.
```env
GENERATE_SOURCEMAP=false
```

## Authors

**Mohamed Kharrat** - kharrat.m [at] tekru.net
**Karim Bouhnek** - karim.b [at] tekru.net
**Dhia Hassen** - dhia.h [at] tekru.net

## License

Private code owned by **Portail Nominis Inc**