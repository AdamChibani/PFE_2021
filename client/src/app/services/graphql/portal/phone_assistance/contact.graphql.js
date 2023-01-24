import gql from "graphql-tag";

const QCONST = {};
QCONST.contact = `
    id
    type
    value
    poste
`;

QCONST.getQuery = gql`
    query contacts(
        $id: Int
    ){
        holidays(
            id: $id
        ) { ${QCONST.contact} }
    }
`;

QCONST.createMutation = gql`
    mutation contacts(
        $item: ContactInput!
    ){
        contacts(
            item: $item
        )
    }
`;

export default QCONST;