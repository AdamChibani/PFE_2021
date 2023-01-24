import gql from "graphql-tag";
import grapQlService from "../../libs/graphQlService";
import QCONST from "./users.graphql";

import errorHandling from "app/services/error-handling";

// TODO move to user.service
export async function login(email, password) {
  const input = { email, password };
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    const rejectLogin = (e) => {
      reject({ password: e });
    };
    client
      .mutate({
        variables: { input },
        mutation: QCONST.loginMutation,
      })
      .then(({ data }) => {
        const { token, user } = data.login;
        if (token && user) {
          resolve(data.login);
        } else {
          rejectLogin("error.bad_password");
        }
      })
      .catch((error) => {
        if (
          Array.isArray(error.graphQLErrors) &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].extensions &&
          error.graphQLErrors[0].extensions.code
        ) {
          rejectLogin(
            `error.serverSide.${error.graphQLErrors[0].extensions.code}`
          );
        }
        rejectLogin("error.server");
      });
  });
}

// TODO move to user.service
export async function loginWithToken() {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        mutation: QCONST.tokenLoginMutation,
      })
      .then(({ data }) => {
        const { token, user } = data.login;
        if (token && user) {
          resolve(data.login);
        } else {
          reject("error.bad_password");
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") console.log(error);
        reject("error.user_disabled");
      });
  });
}

export async function create(data) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    data = handleUserDataBeforeSent(data);
    client
      .mutate({
        variables: {
          data: data,
        },
        mutation: gql`
          mutation user($data: UserInput!) {
            user(data: $data)
          }
        `,
      })
      .then((response) => {
        resolve(response.data.user);
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

export async function update(data) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    data = handleUserDataBeforeSent(data);
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
        const r = [];
        if (error.graphQLErrors)
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

export async function remove(id) {
  id = parseInt(id);
  return new Promise((resolve, reject) => {
    const { client } = grapQlService;
    client
      .mutate({
        variables: {
          data: { id },
        },
        mutation: gql`
          mutation user($data: UserInput!) {
            user(data: $data, operation: "delete")
          }
        `,
      })
      .then(({ data }) => {
        resolve(data.user);
      })
      .catch((error) => {
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

export async function getAll() {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        query: gql`
          query {
            users {
              id
              firstName
              lastName
              active
              admin
              profileImage
              lastLogin
              email
              language
              role {
                id
                name
              }
            }
          }
        `,
      })
      .then(({ data }) => {
        const users = (data.users || []).map((user) => ({
          ...user,
          role: user.role,
        }));
        resolve({ users });
      })
      .catch((error) => {
        errorHandling.handleException(error);
        throw error;
      });
  });
}

//TODO Merge with the one before
export async function getAllNoDetails() {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        query: gql`
          query {
            users {
              id
              firstName
              lastName
              email
            }
          }
        `,
      })
      .then(({ data }) => {
        const users = (data.users || []).map((user) => ({
          ...user,
          role: user.role,
        }));
        resolve(users);
      })
      .catch((error) => {
        errorHandling.handleException(error);
        throw error;
      });
  });
}

export async function getById(id) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        query: gql`
          query getUserById($id: Int!) {
            getUserById(id: $id) {
              id
              email
              firstName
              lastName
              language
              profileImage
              role {
                id
                name
              }
            }
          }
        `,
        variables: {
          id: id,
        },
      })
      .then(({ data }) => {
        let user = data.getUserById;
        user = {
          ...user,
          role: user.role,
        };
        resolve(user);
      })
      .catch((error) => {
        errorHandling.handleException(error);
        console.log(error);
        throw error;
      });
  });
}

export async function getAllRoles() {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        query: gql`
          query {
            roles {
              id
              name
            }
          }
        `,
      })
      .then(({ data }) => {
        resolve(data.roles);
      })
      .catch((error) => {
        errorHandling.handleException(error);
        throw error;
      });
  });
}

export async function toggleUserActivation(id, active) {
  console.log({ id, active });
  id = parseInt(id);
  return new Promise((resolve, reject) => {
    const { client } = grapQlService;
    client
      .mutate({
        variables: {
          id,
          active,
        },
        mutation: gql`
          mutation toggleUserActivation($id: Int!, $active: Boolean) {
            toggleUserActivation(id: $id, active: $active)
          }
        `,
      })
      .then((response) => {
        resolve(response.data.toggleUserActivation ? active : !active);
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

// Edit and update profile picture of the user
export async function updateProfilePicture(file) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          file,
        },
        mutation: gql`
          mutation updateProfilePicture($file: Upload!) {
            updateProfilePicture(file: $file)
          }
        `,
      })
      .then(({ data }) => {
        resolve(data.updateProfilePicture);
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

function handleUserDataBeforeSent(data) {
  if (data.id === "") {
    delete data.id;
  }
  if (data.role_id) {
    data.role = {
      id: data.role_id,
    };
    delete data.role_id;
  }
  if (data.profileImage) {
    const a = data.profileImage.split("/");
    data.profileImage = a[a.length - 1];
  }
  return data;
}
