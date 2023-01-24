import gql from "graphql-tag";

const QCONST = {};
QCONST.business = `
    id
    name
    date_created
    address
    billing_address
    website
    workforce
    legal_form{
        id
        value
    }
    activities{
        id
        value
    }
    phone
    general_email
    principal_email
    TPS_tax
    TVQ_tax
    linked_in_link
    twitter_link
    facebook_link
    administrator
    shareholder
    NEQ
    quickbooks_id
    activity_id
    lat
    lng
    city
    district
    postalCode
`;

QCONST.businessTwin = `
    id
    name
    date_created
    address
    billing_address
    website
    workforce
    legal_form
    activities
    phone
    general_email
    principal_email
    TPS_tax
    TVQ_tax
    linked_in_link
    twitter_link
    facebook_link
    administrator
    shareholder
    NEQ
    business_id
    lat
    lng
    city
    district
    postalCode
`;

QCONST.legalForms = `
    id
    value
    language
`;

QCONST.activities = `
    id
    value
    language
`;

QCONST.getQuery = gql`
    query business(
        $id: Int
    ){
        business(
            id: $id
        ) { ${QCONST.business} }
    }
`;

export default QCONST;
