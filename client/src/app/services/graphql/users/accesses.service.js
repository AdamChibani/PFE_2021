import gql from "graphql-tag";
import grapQlService from "../../libs/graphQlService";
import QCONST from "./accesses.graphql";

import errorHandling from "app/services/error-handling";

export async function getAllData() {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        query: gql`
					query {
						roles { ${QCONST.role} }
						accesses {
							id
							name
							slug
						}
					}
				`,
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        errorHandling.handleException(error)
        if (
          Array.isArray(error.graphQLErrors) &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.code
        ) {
          reject(`error.serverSide.${error.graphQLErrors[0].extensions.code}`);
        }
        reject("error.server");
      });
  });
}
