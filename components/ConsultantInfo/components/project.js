import styles from "../../MyProfile/my_profile.module.css";
import { DatePickerFormsy, TextFieldFormsy } from "../../../formsy";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";
import Formsy from "formsy-react";

const CREATE_PROJECTS_MUTATION = gql`
  mutation updateProj($input: [UpdateProjectsInput!]!, $pId: Int!) {
    updateProjects(input: $input, pId: $pId)
  }
`;
function Projects(props) {
  const [createProj] = useMutation(CREATE_PROJECTS_MUTATION);
  const [validationProj, setValidationProj] = useState(false);
  const [projects, setProjects] = useState([{}]);
  const enableButton = () => {
    setValidationProj(true);
  };
  const disableButton = () => {
    setValidationProj(false);
  };
  const handleDelete = (i) => {
    let arr = [...projects];
    arr.splice(i, 1);
    setProjects(arr);
  };
  const handleAdd = () => {
    setProjects([...projects, {}]);
  };
  const handleSubmit = (model) => {
    const {
      projectTitle,
      jobTitle,
      company,
      scope,
      startDate,
      endDate,
      poFname,
      poLname,
      employer,
      poEmail,
      poPhoneNumber,
      poPosition,
    } = model;
    let arrr = [];

    projectTitle.forEach((f, i) => {
      arrr.push({
        projectTitle: projectTitle[i],
        jobTitle: jobTitle[i],

        company: company[i],
        scope: scope[i],
        startDate: startDate[i],
        endDate: endDate[i],
        poFirstName: poFname[i],
        poLastName: poLname[i],
        employer: employer[i],
        poEmail: poEmail[i],
        poPhoneNumber: parseInt(poPhoneNumber[i]),
        poPosition: poPosition[i],
      });
    });
    createProj({
      variables: {
        input: arrr,

        pId: props.profile,
      },
    })
      .then(() => {
        props.increment({ variables: { id: props.profile, val: 7 } });

        props.setTab("7");
      })
      .catch((e) => {});
  };
  return (
    <>
      <Fab
        size="medium"
        className={styles["add"]}
        aria-label="add"
        onClick={() => {
          handleAdd();
        }}
      >
        <AddIcon className={styles["ad"]} />
      </Fab>
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
      >
        {projects.map((e, i) => (
          <>
            <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
              <TextFieldFormsy
                label="Project Title"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`projectTitle[${i}]`}
                id="wxp-edit"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                label="Job Title"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`jobTitle[${i}]`}
                id="wxp-edit"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                label="Company Name"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`company[${i}]`}
                id="cmpn-edit"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                label="Project Scope"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`scope[${i}]`}
                id="desc-edit"
                variant="outlined"
                required
              />
              <DatePickerFormsy
                fullWidth
                name={`startDate[${i}]`}
                id="start-date-edit"
                // disabled={loading}
                variant="outlined"
                required
              />
              <DatePickerFormsy
                fullWidth
                name={`endDate[${i}]`}
                id="end-date-edit"
                // disabled={loading}
                variant="outlined"
                required
              />
              <TextFieldFormsy
                label="Employer Name"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`employer[${i}]`}
                id="employer-edit"
                variant="outlined"
                required
              />

              <TextFieldFormsy
                label="Person of contact first name"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`poFname[${i}]`}
                id="poFname-edit"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                label="Person of contact last name"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`poLname[${i}]`}
                id="poLname-edit"
                variant="outlined"
                required
              />

              <TextFieldFormsy
                fullWidth
                label="Person of contact E-Mail"
                type="text"
                name={`poEmail[${i}]`}
                id="poEmail-edit"
                required
                validations={{
                  isEmail: true,
                }}
                validationErrors={{
                  isEmail: "Not a valid E-Mail",
                }}
                variant="outlined"
                required
              />
              <TextFieldFormsy
                label="Person of contact phone number"
                validations={{
                  minLength: 3,
                  maxLength: 15,
                  matchRegexp: /^[0-9]*$/,
                }}
                validationErrors={{
                  minLength: "Minimum length is 3",
                  maxLength: "Maximum length is 15",
                  matchRegexp: "Only nubmers are allowed",
                }}
                type="text"
                name={`poPhoneNumber[${i}]`}
                id="poPhoneNumber-edit"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                label="Person of contact position"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`poPosition[${i}]`}
                id="poPosition-edit"
                variant="outlined"
                required
              />
              <IconButton
                aria-label="delete"
                hidden={i == 0}
                onClick={() => handleDelete(i)}
              >
                <DeleteIcon fontSize="small" color="secondary" />
              </IconButton>
            </div>
          </>
        ))}
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          color="primary"
          className="w-224 mx-auto mt-16 "
          aria-label="EDIT"
          id="user-skills-edit"
          disabled={!validationProj}
          value="legacy"
        >
          Edit
        </Button>
      </Formsy>{" "}
    </>
  );
}

export default Projects;
