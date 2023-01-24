import gql from "graphql-tag";
import grapQlService from "app/services/libs/graphQlService";
import QCONST from "./holidays.graphql";

import errorHandling from "app/services/error-handling";

export async function get(ids, year=null) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          ids: ids,
          year,
        },
        query: gql`
          query holidays(
        $ids: [Int]
    ){
        holidays(
            ids: $ids
        ) { ${QCONST.holiday} }
    }
      `,
      })
      .then(({ data }) => {
        if (ids && ids.length === 1) {
          resolve(data.holidays[0]);
        } else {
          resolve(data.holidays);
        }
      })
      .catch((error) => {
        errorHandling.handleException(error)
        reject(error);
      });
  });
}

export async function create(item) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          item,
        },
        mutation: gql`
          mutation holidays($item: HolidayInput!) {
            holidays(item: $item)
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

export async function edit(item) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          item,
        },
        mutation: gql`
          mutation holidays($item: HolidayInput!) {
            holidays(item: $item)
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

export async function deleteHolidays(ids) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          ids,
        },
        mutation: gql`
          mutation deleteHolidays($ids: [Int]!) {
            deleteHolidays(ids: $ids)
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
