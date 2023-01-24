import gql from "graphql-tag";

const QCONST = {};
QCONST.user = `
    id
    email
    firstName
    lastName
    profileImage
    language
    direction
    lastIp
    lastLogin
    lastPasswordChange
    gender
    role {
        id
        name
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
        $input: LoginInput!
     
    ){
        login(
        input: $input
        ) { ${QCONST.login} }
    }
`;

QCONST.tokenLoginMutation = gql`
    mutation Login{
        login { ${QCONST.login} }
    }
`;

export default QCONST;
