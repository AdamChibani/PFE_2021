import styles from "../../MyProfile/my_profile.module.css";
import { TextFieldFormsy } from "../../../formsy";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";
import Formsy from "formsy-react";

const UPDATE_FIELD_MUTATION = gql`
  mutation updateField($input: [updateFieldsInput!]!, $pId: Int!) {
    updateFields(input: $input, pId: $pId)
  }
`;
function Fields(props) {
  const [updateField, { loading: updateFielLoading }] = useMutation(
    UPDATE_FIELD_MUTATION
  );
  const [validation, setValidation] = useState(false);
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  const [field, setField] = useState([{}]);

  const handleDelete = (i) => {
    let arr = [...field];
    arr.splice(i, 1);
    setField(arr);
  };
  const handleAdd = () => {
    setField([...field, {}]);
  };
  const handleSubmit = (model) => {
    const { field, specialty } = model;
    let arrr = [];

    field.forEach((f, i) => {
      arrr.push({
        name: field[i],
        specialty: specialty[i],
      });
    });
    updateField({
      variables: {
        input: arrr,

        pId: props.profile,
      },
    })
      .then(() => {
        props.increment({ variables: { id: props.profile, val: 2 } });
        props.setTab("2");
      })
      .catch((e) => {});
  };
  return (
    <div className="h-100">
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
        data-netlify-honeypot="bot-field"
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
      >
        {field.map((f, i) => (
          <>
            <br />
            <div className="mr-10">
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
        <footer>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            color="primary"
            className="w-224 mx-auto mt-16"
            aria-label="ADD"
            id="user-fields-add"
            disabled={!validation}
            value="legacy"
          >
            Add
          </Button>
        </footer>
      </Formsy>
    </div>
  );
}

export default Fields;
