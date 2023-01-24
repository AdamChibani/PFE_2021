import gql from "graphql-tag";

const QCONST = {};
QCONST.user = `
    id
    email
    firstname
    lastname
    profile_image
    language
    direction
    last_ip
    last_login
    last_password_change
    role {
        id
        name
    }
    accesses {
        id
        slug
        name
        can_view
        can_view_own
        can_edit
        can_create
        can_delete
    }
`;

QCONST.login = `
    token
    user {
        ${QCONST.user}
    }
`;

QCONST.loginMutation = gql`
    mutation Login(
        $email: String!
        $password: String!
    ){
        login(
            email: $email
            password: $password
        ) { ${QCONST.login} }
    }
`;

export default QCONST;