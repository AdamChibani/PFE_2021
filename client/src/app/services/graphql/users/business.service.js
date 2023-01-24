import gql from "graphql-tag";
import grapQlService from "../../libs/graphQlService";
import QCONST from "./business.graphql";
import USER_QCONST from "./users.graphql";
import INVOICE_CONST from "./../crm-sales/invoice/invoice.graphql.js";
import ORDER_CONST from "./../crm-sales/order/order.graphql.js";

import errorHandling from "app/services/error-handling";

export async function get(ids, own) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          ids: ids,
          own: own,
        },
        query: gql`
          query business(
        $ids: [Int]
        $own: Boolean
    ){
        business(
            ids: $ids
            own: $own
        ) { ${QCONST.business} }
    }
      `,
      })
      .then(({ data }) => {
        if ((ids && Array.isArray(ids) && ids.length <= 1) || own) {
          resolve(data.business[0]);
        } else {
          resolve(data.business);
        }
      })
      .catch((error) => {
        errorHandling.handleException(error);
        reject(error);
      });
  });
}

export async function quickbooksCustomers() {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        query: gql`
          query quickbooksCustomers{
        quickbooksCustomers { ${QCONST.business} }
       }
      `,
      })
      .then(({ data }) => {
        //console.log("we are Here !");
        resolve(data.quickbooksCustomers);
      })
      .catch((error) => {
        errorHandling.handleException(error);
        reject(error);
      });
  });
}

export async function getTwin(ids, business_id) {
  /*console.log({
    ids: !!ids,
    business_id: !!business_id,
    test: !!ids && Array.isArray(ids) && ids.length <= 1,
  });*/
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          ids: ids,
          business_id: business_id,
        },
        query: gql`
          query businessTwin(
        $ids: [Int]
        $business_id: Int
    ){
        businessTwin(
            ids: $ids
            business_id: $business_id
        ) { ${QCONST.businessTwin} }
    }
      `,
      })
      .then(({ data }) => {
        if (!!ids && Array.isArray(ids) && ids.length <= 1) {
          resolve(data.businessTwin[0]);
        } else {
          resolve(data.businessTwin);
        }
      })
      .catch((error) => {
        errorHandling.handleException(error);
        throw error;
      });
  });
}

export async function getLegalForms(ids) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          ids: ids,
        },
        query: gql`
            query legalForms(
          $ids: [Int]
      ){
        legalForms(
              ids: $ids
          ) { ${QCONST.legalForms} }
      }
        `,
      })
      .then(({ data }) => {
        if (ids) {
          resolve(data.legalForms[0]);
        } else {
          resolve(data.legalForms);
        }
      })
      .catch((error) => {
        errorHandling.handleException(error);
        reject(error);
      });
  });
}

export async function getActivities(ids) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          ids: ids,
        },
        query: gql`
            query activities(
          $ids: [Int]
      ){
        activities(
              ids: $ids
          ) { ${QCONST.activities} }
      }
        `,
      })
      .then(({ data }) => {
        if (ids) {
          resolve(data.activities[0]);
        } else {
          resolve(data.activities);
        }
      })
      .catch((error) => {
        errorHandling.handleException(error);
        reject(error);
      });
  });
}

export async function getBusinessInvoices(businessId) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          id: businessId,
        },
        query: gql`
            query businessInvoices($id: ID!){
            businessInvoices(id:$id)
            { ${INVOICE_CONST.invoice} }
            }
          `,
      })
      .then(({ data }) => {
        resolve(data.businessInvoices);
      })
      .catch((error) => {
        errorHandling.handleException(error);
        reject(error);
      });
  });
}

export async function getBusinessUsers(businessId) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          id: businessId,
        },
        query: gql`
              query businessUsers($id: ID!){
            businessUsers(id:$id)
            { ${USER_QCONST.user} }
            }
          `,
      })
      .then(({ data }) => {
        resolve(data.businessUsers);
      })
      .catch((error) => {
        errorHandling.handleException(error);
        reject(error);
      });
  });
}

export async function getBusinessOrders(businessId) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .query({
        variables: {
          id: businessId,
        },
        query: gql`
            query businessOrders($id: ID!){
            businessOrders(id:$id)
            { ${ORDER_CONST.order}}
            }
          `,
      })
      .then(({ data }) => {
        resolve(data.businessOrders);
      })
      .catch((error) => {
        errorHandling.handleException(error);
        reject(error);
      });
  });
}

export async function removeUser(id, userId) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          id,
          userId,
        },
        mutation: gql`
          mutation removeUserFromBusiness($id: ID!, $userId: ID!) {
            removeUserFromBusiness(id: $id, userId: $userId)
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

export async function addUser(id, userId) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          id,
          userId,
        },
        mutation: gql`
          mutation addUserToBusiness($id: ID!, $userId: ID!) {
            addUserToBusiness(id: $id, userId: $userId)
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

export async function create(item) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          item,
        },
        mutation: gql`
          mutation business($item: BusinessInput!) {
            business(item: $item)
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

export async function createTwin(item) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          item,
        },
        mutation: gql`
          mutation businessTwin($item: BusinessInput!) {
            businessTwin(item: $item)
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
  if (item.date_created) item.date_created = `${item.date_created}`;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          item,
        },
        mutation: gql`
          mutation business($item: BusinessInput!) {
            business(item: $item)
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

export async function deleteBusiness(ids) {
  const { client } = grapQlService;
  return new Promise((resolve, reject) => {
    client
      .mutate({
        variables: {
          ids,
        },
        mutation: gql`
          mutation deleteBusiness($ids: [Int]!) {
            deleteBusiness(ids: $ids)
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
