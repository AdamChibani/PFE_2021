import styles from "../../MyProfile/my_profile.module.css";
import { ReactSelectMulti } from "../../../formsy";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";
import Formsy from "formsy-react";
const CREATE_LANGUAGE_MUTATION = gql`
  mutation updS($input: [UpdateLanguagesInput!]!, $pId: Int!) {
    updateLanguages(input: $input, pId: $pId)
  }
`;
function Languages(props) {
  const [createLang] = useMutation(CREATE_LANGUAGE_MUTATION);
  const [validationLang, setValidationLang] = useState(false);
  const [languages, setLanguages] = useState([{}]);
  const handleSubmitLang = (model) => {
    const { languages, read, write, speak, comprehend } = model;
    let arrr = [];

    languages.forEach((f, i) => {
      arrr.push({
        language: languages[i].label,
        read: read[i].label,
        write: write[i].label,
        speak: speak[i].label,
        comprehend: comprehend[i].label,
      });
    });
    createLang({
      variables: {
        input: arrr,

        pId: props.profile,
      },
    })
      .then(() => {
        props.increment({ variables: { id: props.profile, val: 5 } });

        props.setTab("5");
      })
      .catch((e) => {});
  };
  const enableButtonLang = () => {
    setValidationLang(true);
  };
  const disableButtonLang = () => {
    setValidationLang(false);
  };
  const handleDelete = (i) => {
    let arr = [...languages];
    arr.splice(i, 1);
    setLanguages(arr);
  };
  const handleAdd = () => {
    setLanguages([...languages, {}]);
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
        onValidSubmit={handleSubmitLang}
        onValid={enableButtonLang}
        onInvalid={disableButtonLang}
      >
        {languages.map((l, i) => (
          <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
            Language
            <ReactSelectMulti
              name={`languages[${i}]`}
              options={[
                { value: "1", label: "Arabic" },
                { value: "2", label: "English" },
                { value: "3", label: "French" },
              ]}
              isClearable={false}
              isMulti={false}
            />
            Read
            <ReactSelectMulti
              name={`read[${i}]`}
              options={[
                { value: "Native", label: "Native" },
                { value: "Fluent", label: "Fluent" },
                { value: "Conversational", label: "Conversational" },
                { value: "Elementary", label: "Elementary" },
                { value: "Beginner", label: "Beginner" },
                { value: "Bad", label: "Bad" },
              ]}
              isMulti={false}
              isClearable={false}
            />
            Write
            <ReactSelectMulti
              name={`write[${i}]`}
              options={[
                { value: "Native", label: "Native" },
                { value: "Fluent", label: "Fluent" },
                { value: "Conversational", label: "Conversational" },
                { value: "Elementary", label: "Elementary" },
                { value: "Beginner", label: "Beginner" },
                { value: "Bad", label: "Bad" },
              ]}
              isMulti={false}
              isClearable={false}
            />
            Speak
            <ReactSelectMulti
              name={`speak[${i}]`}
              options={[
                { value: "Native", label: "Native" },
                { value: "Fluent", label: "Fluent" },
                { value: "Conversational", label: "Conversational" },
                { value: "Elementary", label: "Elementary" },
                { value: "Beginner", label: "Beginner" },
                { value: "Bad", label: "Bad" },
              ]}
              isMulti={false}
              isClearable={false}
            />
            Comprehend
            <ReactSelectMulti
              name={`comprehend[${i}]`}
              options={[
                { value: "Native", label: "Native" },
                { value: "Fluent", label: "Fluent" },
                { value: "Conversational", label: "Conversational" },
                { value: "Elementary", label: "Elementary" },
                { value: "Beginner", label: "Beginner" },
                { value: "Bad", label: "Bad" },
              ]}
              isMulti={false}
              isClearable={false}
            />
            <IconButton
              aria-label="delete"
              hidden={i == 0}
              onClick={() => handleDelete(i)}
            >
              <DeleteIcon fontSize="small" color="secondary" />
            </IconButton>
          </div>
        ))}
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          color="primary"
          className="w-224 mx-auto mt-16 "
          aria-label="EDIT"
          id="user-skills-edit"
          disabled={!validationLang}
          value="legacy"
        >
          Add
        </Button>
      </Formsy>
    </>
  );
}

export default Languages;
