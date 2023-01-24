import gql from "graphql-tag";

const QCONST = {};
QCONST.access = `
	id
	name
	slug
	can_view
	can_view_own
	can_edit
	can_create
	can_delete
`;

QCONST.role = `
	id
	name
	accesses { ${QCONST.access} }
`;

QCONST.updatePrivilage = gql`
  mutation updatePrivilage($role: Int!, $access: Int!) {
    updatePrivilage(role: $role, access: $access)
  }
`;


export default QCONST;
