import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";

const ProfileContext = React.createContext();
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
const ProfileProvider = ({ children }) => {
  const [fields, setFields] = useState([]);
  const [getF, { data: fieldsData, refetch }] = useLazyQuery(GET_FIELDS_QUERY, {
    fetchPolicy: "no-cache",
  });
  const [skills, setSkills] = useState([]);
  const [getS, { data: skillsData, refetch: skillsRefetch }] = useLazyQuery(
    GET_SKILLS_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );
  function getFields(id) {
    return getF({ variables: { id } });
  }

  useEffect(() => {
    setFields(fieldsData?.getAllFieldsByConsultant);
  }, [fieldsData]);
  function getSkills(id) {
    return getS({ variables: { id } });
  }

  useEffect(() => {
    setSkills(skillsData?.getAllSkillsByConsultant);
  }, [skillsData]);
  return (
    <ProfileContext.Provider
      value={{
        fields,
        setFields,
        getFields,
        getSkills,
        fieldsData,
        refetch,
        skillsRefetch,
        skills,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
export { ProfileProvider };
