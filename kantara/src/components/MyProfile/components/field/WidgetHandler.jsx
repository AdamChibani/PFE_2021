import React, { useEffect } from "react";
import Form from "./Form";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";

const GET_FIELDS_QUERY = gql`
  query get($id: Int!) {
    getAllFieldsByConsultant(consultantId: $id) {
      id
      name
      specialty
    }
  }
`;
const GET_SKILLS_QUERY = gql`
  query getS($id: Int!) {
    getAllSkillsByConsultant(consultantId: $id) {
      id
      name
      developer
    }
  }
`;
function WidgetHandler(props) {
  const [getSk, { data: skillsData, refetch: skillsRefetch }] = useLazyQuery(
    GET_SKILLS_QUERY,
    {
      fetchPolicy: "no-cache",
      variables: { id: props?.pId },
    }
  );
  const [getF, { data: fieldsData, refetch }] = useLazyQuery(GET_FIELDS_QUERY, {
    fetchPolicy: "no-cache",
    variables: { id: props?.pId },
  });
  console.log({ fieldsData, skillsData });
  const { editable, setEditable } = props;
  const [test, setTest] = React.useState(true);

  useEffect(() => {
    getF();
    getSk();
  }, [editable]);

  useEffect(() => {
    getF();
    getSk();
  }, [test]);
  useEffect(() => {
    console.log(fieldsData, skillsData);
  }, [test]);
  if (editable)
    return (
      <Form
        setEditable={setEditable}
        editable={editable}
        field={fieldsData?.getAllFieldsByConsultant}
        skill={skillsData?.getAllSkillsByConsultant}
        refetchF={refetch}
        refetchS={skillsRefetch}
        pId={props.pId}
        setTest={setTest}
        test={test}
      />
    );

  return (
    <>
      <ul className="list-unstyled d-flex flex-row align-items-center flex-wrap ">
        {fieldsData?.getAllFieldsByConsultant?.map((f, key) => {
          return (
            <li key={key}>
              <a className="bg-polar text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                {f?.name}
              </a>
            </li>
          );
        })}
      </ul>
      Soft
      <ul className="list-unstyled d-flex align-items-center flex-wrap">
        {skillsData?.getAllSkillsByConsultant?.map((s, key) => (
          <li key={key}>
            <a className="bg-polar text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
              {s?.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default WidgetHandler;
