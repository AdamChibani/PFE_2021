import { Button, Fab, IconButton } from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import AddIcon from "@material-ui/icons/Add";
import { useEffect, useState } from "react";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "../../../formsy";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import styles from "../my_profile.module.css";

const uSkill = gql`
  mutation updateSkill($id: Int!, $name: String, $developer: String) {
    updateSkill(id: $id, name: $name, developer: $developer) {
      id
      name
      developer
    }
  }
`;
const delField = gql`
  mutation del($id: Int!) {
    deleteField(id: $id)
  }
`;
const uField = gql`
  mutation updateField($id: Int, $name: String, $specialty: String, $pId: Int) {
    updateField(id: $id, name: $name, specialty: $specialty, pId: $pId) {
      id
      name
      specialty
    }
  }
`;

const Field = (props) => {
  const [updateField, { loading }] = useMutation(uField);
  const [deleteField, { loading: delFieldLoading }] = useMutation(delField);
  const [updateSkill, { loading: ls }] = useMutation(uSkill);
  const handleDeleteField = (id, i) => {
    deleteField({ variables: { id } }).then((data) => {
      if (data.data.deleteField) {
        let arr = [...field];
        arr.splice(i, 1);
        setField(arr);
      }
    });
  };
  const delFromField = (i) => {
    let arr = [...field];
    arr.splice(i, 1);
    setField(arr);
  };
  const handleSubmit = ({
    fieldId,
    skillId,
    field,
    specialty,
    skill,
    developer,
  }) => {
    let arrr = [];

    // ask Mohamed if having a condition over the content and the old one before the backend calls
    fieldId.forEach((_, i) => {
      updateField({
        variables: {
          id: parseInt(fieldId[i]),
          name: field[i],
          specialty: specialty[i],
          pId: props?.pId,
        },
      })
        .then((data) => {
          if (data) {
            setEditField(false);
          }
        })
        .catch((e) => {});
    });
    skillId.forEach((id, i) => {
      updateSkill({
        variables: {
          id: parseInt(skillId[i]),
          name: skill[i],
          developer: developer[i],
        },
      })
        .then((data) => {
          if (data) {
            setEditField(false);
            props.skills[i] = data.data.updateSkill;
          }
        })
        .catch((e) => {});
    });
  };
  const [validation, setValidation] = useState(false);
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  const [editField, setEditField] = useState(false);
  const [field, setField] = useState([]);
  const [skill, setSkill] = useState(props?.skills);
  const [skills, setSkills] = useState(props?.skills);
  //   useEffect(() => {
  //     console.log("s");
  //     console.log({ p: props });
  //     setFields(field);
  //     console.log({ field });
  //   }, []);
  //   useEffect(() => {
  //     setFields(props?.fields);
  //     setField(props?.fields);
  //   }, [props]);
  const Styles = { root: { marginRight: "2.25rem !important" } };
  return (
    <div>
      <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
        Skills
        <CreateIcon
          className={styles["edit"]}
          onClick={() => {
            setEditField(!editField);
          }}
        />
      </h4>
      Technical
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
      >
        {!editField ? (
          <>
            <ul className="list-unstyled d-flex flex-row align-items-center flex-wrap ">
              {props?.fields?.map((f, key) => {
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
              {skills?.map((s) => (
                <li>
                  <a className="bg-polar text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
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
            {props?.fields?.map((f, i) => (
              <>
                <br />

                <div className="">
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
                    className="mr-6"
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

                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteField(parseInt(f.id), i)}
                  >
                    <DeleteIcon fontSize="small" color="secondary" />
                  </IconButton>
                </div>
              </>
            ))}
            {field?.map((f, i) => (
              <>
                <TextFieldFormsy
                  type="hidden"
                  name={`fieldId[${i}]`}
                  id="id"
                  value={f.id}
                />
                <div className="">
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
                    className="mr-6"
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
                  {delFieldLoading ? (
                    <CircularProgress
                      style={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => delFromField(i)}
                    >
                      <DeleteIcon fontSize="small" color="secondary" />
                    </IconButton>
                  )}
                </div>
              </>
            ))}
            <div>Soft</div>
            {skill.map((s, i) => (
              <>
                <br />
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
            >
              Edit
            </Button>
          </>
        )}
      </Formsy>
    </div>
  );
};
export default Field;
