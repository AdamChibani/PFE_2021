import React, { useContext, useEffect, useState } from "react";
import Formsy from "formsy-react";
import { Button, Fab, IconButton } from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import AddIcon from "@material-ui/icons/Add";
import { TextFieldFormsy } from "../../../../formsy";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../../my_profile.module.css";

const UPDATE_SKILL_MUTATION = gql`
  mutation updateSkill($input: [updateSkillsInput!]!, $pId: Int!) {
    updateSkills(input: $input, pId: $pId)
  }
`;
const DELETE_FIELD_MUTATION = gql`
  mutation deleteField($id: Int!) {
    deleteField(id: $id)
  }
`;
const DELETE_SKILL_MUTATION = gql`
  mutation deleteSkill($id: Int!) {
    deleteSkill(id: $id)
  }
`;
const UPDATE_FIELD_MUTATION = gql`
  mutation updateField($input: [updateFieldsInput!]!, $pId: Int!) {
    updateFields(input: $input, pId: $pId)
  }
`;

function Form(props) {
  const [field, setField] = useState(props.field);

  const [skill, setSkill] = useState(props.skill);

  const [updateSkill, { loading: updateSkillLoading }] = useMutation(
    UPDATE_SKILL_MUTATION
  );
  const [deleteSkill, { loading: deleteSLoading }] = useMutation(
    DELETE_SKILL_MUTATION
  );
  const [deleteField, { loading: deleteLoading }] = useMutation(
    DELETE_FIELD_MUTATION
  );
  const [updateField, { loading: updateFielLoading }] = useMutation(
    UPDATE_FIELD_MUTATION
  );
  const [validation, setValidation] = useState(false);
  const handleSubmit = (model) => {
    const { fieldId, skillId, field, specialty, skill, developer } = model;
    let arrr = [];
    field.forEach((f, i) => {
      if (fieldId[i]) {
        arrr.push({
          id: parseInt(fieldId[i]),
          name: field[i],
          specialty: specialty[i],
        });
      } else {
        arrr.push({
          name: field[i],
          specialty: specialty[i],
        });
      }
    });
    const arr = [];
    skill.forEach((f, i) => {
      if (skillId[i]) {
        arr.push({
          id: parseInt(skillId[i]),
          name: skill[i],
          developer: developer[i],
        });
      } else {
        arr.push({
          name: skill[i],
          developer: developer[i],
        });
      }
    });
    Promise.all([
      updateField({
        variables: {
          input: arrr,
          pId: props?.pId,
        },
      }),
      updateSkill({
        variables: {
          input: arr,
          pId: props?.pId,
        },
      }),
    ])
      .then((res) => {})
      .catch((e) => {})
      .finally(() => {
        props.setTest(!props.test);
        props.setEditable(!props.editable);
      });
  };

  const handleDeleteField = (id, i) => {
    deleteField({ variables: { id } }).then((data) => {
      if (data.data.deleteField) {
        let arr = [...field];
        arr.splice(i, 1);
        setField(arr);
      }
    });
  };
  const handleDeleteSkill = (id, i) => {
    deleteSkill({ variables: { id } }).then((data) => {
      if (data.data.deleteSkill) {
        let arr = [...skill];
        arr.splice(i, 1);
        setSkill(arr);
      }
    });
  };

  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };

  return (
    <Formsy
      onValidSubmit={handleSubmit}
      onValid={enableButton}
      onInvalid={disableButton}
    >
      <div className="d-flex justify-content-end align-items-center">
        <Fab
          size="medium"
          className={styles["add"]}
          aria-label="add"
          onClick={() => {
            setField([...field, {}]);
          }}
        >
          <AddIcon className={styles["ad"]} />
        </Fab>
      </div>
      {field.map((f, i) => (
        <>
          <br />
          <div className="mr-10">
            <TextFieldFormsy
              type="hidden"
              name={`fieldId[${i}]`}
              id="id"
              value={f.id}
            />
            <TextFieldFormsy
              label="Field name"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`field[${i}]`}
              id="name-edit"
              value={f.name}
              variant="outlined"
              required
            />
            <TextFieldFormsy
              label="Field specialty"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`specialty[${i}]`}
              id="specialty-edit"
              value={f.specialty}
              variant="outlined"
              required
            />
            {deleteLoading ? (
              <CircularProgress
                style={{
                  width: "25px",
                  height: "25px",
                }}
              />
            ) : (
              <IconButton
                aria-label="delete"
                // hidden={field[i]}
                onClick={() => handleDeleteField(parseInt(f.id), i)}
              >
                <DeleteIcon fontSize="small" color="secondary" />
              </IconButton>
            )}
          </div>
        </>
      ))}
      <div>Soft</div>
      <div className="d-flex justify-content-end align-items-center">
        <Fab
          size="medium"
          className={styles["add"]}
          aria-label="add"
          onClick={() => {
            setSkill([...skill, {}]);
          }}
        >
          <AddIcon className={styles["ad"]} />
        </Fab>
      </div>
      {skill.map((s, i) => (
        <>
          {" "}
          <div>
            <TextFieldFormsy
              type="hidden"
              name={`skillId[${i}]`}
              id="id"
              value={s.id}
            />
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
              id="skill-edit"
              value={s.name}
              variant="outlined"
              required
            />
            <TextFieldFormsy
              label="Developer"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`developer[${i}]`}
              id="dev-edit"
              value={s.developer}
              variant="outlined"
              required
            />
            {deleteSLoading ? (
              <CircularProgress
                style={{
                  width: "25px",
                  height: "25px",
                }}
              />
            ) : (
              <IconButton
                aria-label="delete"
                // hidden={field[i]}
                onClick={() => handleDeleteSkill(parseInt(s.id), i)}
              >
                <DeleteIcon fontSize="small" color="secondary" />
              </IconButton>
            )}
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
        disabled={!validation}
        value="legacy"
        onClick={() => {
          props.refetchF();
          props.refetchS();
        }}
      >
        Edit
      </Button>
    </Formsy>
  );
}

export default Form;
