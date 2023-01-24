import gql from "graphql-tag";
import grapQlService from "../../libs/graphQlService";

export async function create(data) {
  return new Promise((resolve, reject) => {
    const { client } = grapQlService;
    client
      .mutate({
        variables: {
          data: data,
        },
        mutation: gql`
          mutation ticket($data: TicketInput!) {
            ticket(data: $data) {
              id
            }
          }
        `,
      })
      .then((response) => {
        resolve(response.data.ticket);
      })
      .catch((error) => {
        console.log(error);
        const r = [];
        for (const e of error.graphQLErrors) {
          r.push({
            code: e.extensions.code,
            message: e.message,
          });
        }
        reject(r);
      });
  });
}