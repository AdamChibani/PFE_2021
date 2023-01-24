import styles from "../../MyProfile/my_profile.module.css";
import { TextFieldFormsy } from "../../../formsy";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";
import Formsy from "formsy-react";

const UPDATE_SKILL_MUTATION = gql`
  mutation updateSkill($input: [updateSkillsInput!]!, $pId: Int!) {
    updateSkills(input: $input, pId: $pId)
  }
`;
function Skills(props) {
  const [updateSkill] = useMutation(UPDATE_SKILL_MUTATION);
  const [validation, setValidation] = useState(false);
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  const [skill, setSkill] = useState([{}]);

  const handleDelete = (i) => {
    let arr = [...skill];
    arr.splice(i, 1);
    setSkill(arr);
  };
  const handleAdd = () => {
    setSkill([...skill, {}]);
  };
  const handleSubmit = (model) => {
    const { skill, developer } = model;
    let arrr = [];

    skill.forEach((f, i) => {
      arrr.push({
        name: skill[i],
        developer: developer[i],
      });
    });
    updateSkill({
      variables: {
        input: arrr,

        pId: props.profile,
      },
    })
      .then(() => {
        props.increment({ variables: { id: props.profile, val: 3 } });

        props.setTab("3");
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
        name="consultantInfo"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-skill"
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
      >
        {skill.map((f, i) => (
          <>
            <br />
            <div className="mr-10">
              <TextFieldFormsy
                label="Skill name"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`skill[${i}]`}
                id="name-edit"
                variant="outlined"
                required
              />
              <TextFieldFormsy
                label="Skill developer"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`developer[${i}]`}
                id="developer-edit"
                variant="outlined"
                required
              />
              {/* {deleteLoading ? (
<CircularProgress
style={{
width: "25px",
height: "25px",
}}
/>
) : ( */}
              <IconButton
                aria-label="delete"
                hidden={i == 0}
                onClick={() => handleDelete(i)}
              >
                <DeleteIcon fontSize="small" color="secondary" />
              </IconButton>
              {/* )} */}
            </div>
          </>
        ))}
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          color="primary"
          className="w-224 mx-auto mt-16"
          aria-label="ADD"
          id="user-skills-add"
          disabled={!validation}
          value="legacy"
        >
          Add
        </Button>
      </Formsy>
    </>
  );
}

export default Skills;
