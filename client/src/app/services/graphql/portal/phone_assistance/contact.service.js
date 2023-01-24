import gql from "graphql-tag";
import grapQlService from "app/services/libs/graphQlService";
import QCONST from "./contact.graphql";

import errorHandling from "app/services/error-handling";

export async function get(ids) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          ids: ids,
        },
        query: gql`
          query contacts(
        $ids: [Int]
    ){
        contacts(
            ids: $ids
        ) { ${QCONST.contact} }
    }
      `,
      })
      .then(({ data }) => {
        if (ids && ids.length === 1) {
          resolve(data.contacts[0]);
        } else {
          resolve(data.contacts);
        }
      })
      .catch((error) => {
        errorHandling.handleException(error)
        reject(error);
      });
  });
}

export async function create(items) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          items,
        },
        mutation: gql`
          mutation contacts($items: [ContactInput]!) {
            contacts(items: $items)
          }
        `,
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function deleteContacts(ids) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          ids,
        },
        mutation: gql`
          mutation deleteContacts($ids: [Int]!) {
            deleteContacts(ids: $ids)
          }
        `,
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
