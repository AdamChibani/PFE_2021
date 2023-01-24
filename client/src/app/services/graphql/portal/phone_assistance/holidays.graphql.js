import gql from "graphql-tag";

const QCONST = {};
QCONST.holiday = `
    id
    name
    start_date
    end_date
`;

QCONST.getQuery = gql`
    query holidays(
        $id: Int
    ){
        holidays(
            id: $id
        ) { ${QCONST.holiday} }
    }
`;

QCONST.createMutation = gql`
    mutation holidays(
        $item: HolidayInput!
    ){
        holidays(
            item: $item
        )
    }
`;

export default QCONST;