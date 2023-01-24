import gql from "graphql-tag";

const QCONST = {};
QCONST.package = `
    id
    name
    start_date
    end_date
    recurrence_type
    recurrence_steps
    recurrence_unit
    billing_moment_type
    billing_moment_value
    price
    credits
    renew_policy
    status
`;

QCONST.getQuery = gql`
  query packages($id: Int) {
    packages(id: $id) {
      ${QCONST.package}
    }
  }
`;

QCONST.createMutation = gql`
  mutation package($item: PackageInput!) {
    package(item: $item) {
      id
    }
  }
`;

export default QCONST;
