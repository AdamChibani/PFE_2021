import gql from "graphql-tag";
import grapQlService from "../../libs/graphQlService";
import QCONST from "./packages.graphql";

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
          query packages(
        $ids: [Int]
    ){
        packages(
            ids: $ids
        ) { ${QCONST.package} }
    }
      `,
      })
      .then(({ data }) => {
        if (ids) {
          resolve(data.packages[0]);
        } else {
          resolve(data.packages);
        }
      })
      .catch((error) => {
        errorHandling.handleException(error);
        throw error;
      });
  });
}

export async function create(data) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    // Render the data
    const item = { ...data };
    if (item.price) item.price = parseFloat(item.price);
    if (item.credits) item.credits = parseInt(item.credits);
    if (item.recurrence_steps)
      item.recurrence_steps = parseInt(item.recurrence_steps);
    if (item.renew_policy) item.renew_policy = parseInt(item.renew_policy);
    if (item.billing_moment_value)
      item.billing_moment_value = parseInt(item.billing_moment_value);
    if (item.recurrence_steps)
      item.recurrence_steps = item.recurrence_steps || "";
    client
      .mutate({
        variables: {
          item,
        },
        mutation: gql`
          mutation package($item: PackageInput!) {
            package(item: $item) {
              id
            }
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

export async function edit(data) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    const item = { ...data };
    if (item.price) item.price = parseFloat(item.price);
    if (item.credits) item.credits = parseInt(item.credits);
    if (item.recurrence_steps)
      item.recurrence_steps = parseInt(item.recurrence_steps);
    if (item.renew_policy) item.renew_policy = parseInt(item.renew_policy);
    if (item.billing_moment_value)
      item.billing_moment_value = parseInt(item.billing_moment_value);
    if (item.recurrence_steps)
      item.recurrence_steps = item.recurrence_steps || "";
    if (item.end_date) item.end_date = `${item.end_date}`;
    if (item.start_date) item.start_date = `${item.start_date}`;
    client
      .mutate({
        variables: {
          item,
        },
        mutation: gql`
          mutation package($item: PackageInput!) {
            package(item: $item) {
              id
            }
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
