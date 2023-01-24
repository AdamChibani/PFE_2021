import { mainService } from 'app/services/tekru';
import gql from 'graphql-tag'
import graphqlApi from '../graphqlApi'

import errorHandling from "app/services/error-handling";

class miscAdminService {
    getLevels = () => {
        return new Promise((resolve, reject) => {
            graphqlApi.query({
                query: gql `
                    query Levels {
                        levels {
                            niveau
                            description
                        }
                    }
                `,
                context: {
                    headers: mainService.getAuthHeaders()
                }
            }).then(response => {
                resolve(response.data.levels);
            }).catch(error => {
                errorHandling.handleException(error)
                reject(mainService.handleErros(error));
            });
        });
    };
}

const instance = new miscAdminService();

export default instance;
