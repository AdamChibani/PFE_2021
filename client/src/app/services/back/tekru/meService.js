import { mainService } from 'app/services/tekru';
import gql from 'graphql-tag'
import graphqlApi from '../graphqlApi'

import errorHandling from "app/services/error-handling";

const GQL_CONST = {}
GQL_CONST.access = `
    accesses {
        id
        slug
        name
        can_view
        can_view_own
        can_edit
        can_create
        can_delete
    }
`;

class userService {
    getMyAccesses = () => {
        return new Promise((resolve, reject) => {
            graphqlApi.query({
                query: gql `
                    query me {
                        me {
                            ${GQL_CONST.access}
                        }
                    }
                `,
                context: {
                    headers: {
                        'authorization': 'Bearer ' + mainService.getAccessToken()
                    }
                },
                fetchPolicy: 'no-cache'
            }).then(response => {
                if (response.data.me && response.data.me.accesses) {
                    resolve(response.data.me.accesses);
                }
                resolve(null);
            }).catch(error => {
                errorHandling.handleException(error)
                reject(handleErros(error));
            });
        });
    };
}

const handleErros = (error) => {
    const r = []
    if (error.graphQLErrors)
        for (const e of error.graphQLErrors) {
            r.push({
                code: e.extensions.code,
                message: e.message,
            });
        }
    return(r);
}

const instance = new userService();
export default instance;
