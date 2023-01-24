import gql from "graphql-tag";
import grapQlService from "../../libs/graphQlService";
import QCONST from "./users.graphql";

import errorHandling from "app/services/error-handling";

export async function update(data) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: { data },
        mutation: gql`
          mutation user($data: UserInput!) {
            user(data: $data)
          }
        `,
      })
      .then(({ data }) => {
        resolve(data.user);
      })
      .catch((error) => {
        reject(error);
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
export async function getUserById(id) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          id: id,
        },
        query: gql`
          query getUserById($id: Int) {
            getUserById(id: $id) {
              id
              email
              firstName
              lastName
              gender
            }
          }
        `,
      })
      .then(({ data }) => {
        resolve(data.users[0]);
      })
      .catch((error) => {
        errorHandling.handleException(error);
        reject(error);
      });
  });
}
export async function getUser(conditions) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          conditions: conditions,
        },
        query: gql`
          query users($conditions: [ConditionsInput]) {
            users(conditions: $conditions) {
              id
            }
          }
        `,
      })
      .then(({ data }) => {
        resolve(data.users[0]);
      })
      .catch((error) => {
        errorHandling.handleException(error);
        reject(error);
      });
  });
}

export async function updatePassword(data) {
  const { client } = grapQlService;
  const formattedData = {
    oldpassword: data.oldpassword,
    newpassword: data.password,
    newpassword2: data.password2,
  };
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: { ...formattedData },
        mutation: gql`
          mutation updateMyPassword(
            $oldpassword: String!
            $newpassword: String!
            $newpassword2: String!
          ) {
            updateMyPassword(
              oldpassword: $oldpassword
              newpassword: $newpassword
              newpassword2: $newpassword2
            )
          }
        `,
      })
      .then(({ data }) => {
        resolve(data.updateMyPassword);
      })
      .catch((error) => {
        if (
          Array.isArray(error.graphQLErrors) &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.code
        ) {
          reject(error.graphQLErrors[0].extensions.code);
        }
        reject("error.server");
      });
  });
}
