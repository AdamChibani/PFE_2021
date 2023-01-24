import { mainService } from 'app/services/tekru';
import gql from 'graphql-tag'
import graphqlApi from '../graphqlApi'

import errorHandling from "app/services/error-handling";

class contentService {
    getAll = () => {
        return new Promise((resolve, reject) => {
            graphqlApi.query({
                query: gql `
                    query {
                        contents {
                            id
                            title
                            author {
                                prenom
                                nomFamille
                                courriel
                            }
                            featured_image
                            slug
                            status
                            excerpt
                            publishedAt
                            createdAt
                            updatedAt
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
                resolve(response.data.contents  );
            }).catch(error => {
                errorHandling.handleException(error)
                const r = []
                for (const e of error.graphQLErrors) {
                    r.push({
                        code: e.extensions.code,
                        message: e.message,
                    });
                }
                reject(r);
            });
        });
    };

    getContentText = (id) => {
        return new Promise((resolve, reject) => {
            graphqlApi.query({
                variables: {
                    ids: [id],
                },
                query: gql `
                    query ($ids: [Int]) {
                        contents (ids: $ids) {
                            content
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
                if (!response.data.contents[0]) {
                    resolve(null);
                }
                resolve(response.data.contents[0].content);
            }).catch(error => {
                errorHandling.handleException(error)
                const r = []
                for (const e of error.graphQLErrors) {
                    r.push({
                        code: e.extensions.code,
                        message: e.message,
                    });
                }
                reject(r);
            });
        });
    };

    up = (data) => {
        return new Promise((resolve, reject) => {
            graphqlApi.mutate({
                variables: {
                    data: data
                },
                mutation: gql `
                    mutation (
                        $data: ContentInput!
                    ){
                        content(
                            content: $data
                        )
                    }
                `,
                context: {
                    headers: {
                        'authorization': 'Bearer ' + mainService.getAccessToken(),
                    }
                }
            }).then(response => {
                resolve(parseInt(response.data.content));
            }).catch(error => {
                const r = []
                for (const e of error.graphQLErrors) {
                    r.push({
                        code: e.extensions.code,
                        message: e.message,
                    });
                }
                reject(r);
            });
        });
    };

    delete = (id) => {
        return new Promise((resolve, reject) => {
            graphqlApi.mutate({
                variables: {
                    ids: [id]
                },
                mutation: gql `
                    mutation (
                        $ids: [Int]!
                    ){
                        deleteContent(
                            ids: $ids
                        )
                    }
                `,
                context: {
                    headers: {
                        'authorization': 'Bearer ' + mainService.getAccessToken(),
                    }
                }
            }).then(response => {
                resolve(response.data.deleteContent);
            }).catch(error => {
                const r = []
                for (const e of error.graphQLErrors) {
                    r.push({
                        code: e.extensions.code,
                        message: e.message,
                    });
                }
                reject(r);
            });
        });
    };

    uploadImage = (file, id=0, type='') => {
        return new Promise((resolve, reject) => {
            graphqlApi.mutate({
                variables: {
                    file,
                    id,
                    type
                },
                mutation: gql `
                    mutation (
                        $file: Upload!
                        $id: Int
                        $type: String
                    ){
                        uploadImageForContent(
                            file: $file
                            id: $id
                            type: $type
                        )
                    }
                `,
                context: {
                    headers: {
                        'authorization': 'Bearer ' + mainService.getAccessToken(),
                    }
                }
            }).then(response => {
                resolve(response.data.uploadImageForContent);
            }).catch(error => {
                const r = []
                for (const e of error.graphQLErrors) {
                    r.push({
                        code: e.extensions.code,
                        message: e.message,
                    });
                }
                reject(r);
            });
        });
    };

}

const instance = new contentService();

export default instance;
