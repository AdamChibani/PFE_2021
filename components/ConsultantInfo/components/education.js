import styles from "../../MyProfile/my_profile.module.css";
import {
  ReactSelectMulti,
  TextFieldFormsy,
  DatePickerFormsy,
} from "../../../formsy";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";
import Formsy from "formsy-react";

const CREATE_EDUCATION_MUTATION = gql`
  mutation upd($input: [UpdateEducationsInput!]!, $pId: Int!) {
    updateEducations(input: $input, pId: $pId)
  }
`;
function Educations(props) {
  const [createEdu] = useMutation(CREATE_EDUCATION_MUTATION);
  const [educations, setEducations] = useState([{}]);
  const [validation, setValidation] = useState(false);
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  const handleDelete = (i) => {
    let arr = [...educations];
    arr.splice(i, 1);
    setEducations(arr);
  };
  const handleAdd = () => {
    setEducations([...educations, {}]);
  };
  const handleSubmit = (model) => {
    const { university, startDate, endDate, diploma, type, major } = model;
    let arrr = [];

    university.forEach((f, i) => {
      arrr.push({
        university: university[i],
        startDate: startDate[i],
        endDate: endDate[i],
        diploma: { diploma: diploma[i] },
        major: { major: major[i], type: type[i].value },
      });
    });
    createEdu({
      variables: {
        input: arrr,

        pId: props.profile,
      },
    })
      .then(() => {
        props.increment({ variables: { id: props.profile, val: 8 } });

        props.setTab("8");
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
      </Fab>{" "}
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
      >
        {educations.map((e, i) => (
          <>
            <TextFieldFormsy
              label="University"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`university[${i}]`}
              id="uni-edit"
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
              label="Diploma"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`diploma[${i}]`}
              id="dip-edit"
              variant="outlined"
              required
            />

            <div>Major Type</div>
            <ReactSelectMulti
              name={`type[${i}]`}
              options={[
                { value: "US", label: "United States" },
                { value: "BolognaProcess", label: "Bologna Process" },
              ]}
              isMulti={false}
              isClearable={false}
            />
            <TextFieldFormsy
              label="Major"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`major[${i}]`}
              id="maj-edit"
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
          </>
        ))}
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          color="primary"
          className="w-224 mx-auto mt-16 "
          aria-label="EDIT"
          id="user-universitys-edit"
          disabled={!validation}
          value="legacy"
        >
          Edit
        </Button>
      </Formsy>
    </>
  );
}

export default Educations;
