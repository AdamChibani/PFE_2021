import styles from "../../MyProfile/my_profile.module.css";
import { DatePickerFormsy, TextFieldFormsy } from "../../../formsy";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";
import Formsy from "formsy-react";
const CREATE_CERTIFICATION_MUTATION = gql`
  mutation updateCert($input: [UpdateCertificationsInput!]!, $pId: Int!) {
    updateCertifications(input: $input, pId: $pId)
  }
`;
function Certifications(props) {
  const [createCert] = useMutation(CREATE_CERTIFICATION_MUTATION);
  const [validation, setValidation] = useState(false);
  const [certifications, setCertifications] = useState([{}]);
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  const handleDelete = (i) => {
    let arr = [...certifications];
    arr.splice(i, 1);
    setCertifications(arr);
  };
  const handleAdd = () => {
    setCertifications([...certifications, {}]);
  };
  const handleSubmit = (model) => {
    const { name, category, instution, date, duration, level } = model;
    let arrr = [];

    name.forEach((f, i) => {
      arrr.push({
        name: name[i],
        category: category[i],
        instution: instution[i],
        date: date[i],
        duration: duration[i],
        level: level[i],
      });
    });
    createCert({
      variables: {
        input: arrr,

        pId: props.profile,
      },
    })
      .then(() => {
        props.increment({ variables: { id: props.profile, val: 9 } });

        props.setTab("9");
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
        {certifications.map((e, i) => (
          <>
            <TextFieldFormsy
              label="Certification Name"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`name[${i}]`}
              id="name-edit"
              variant="outlined"
              required
            />
            <TextFieldFormsy
              label="Institution"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`instution[${i}]`}
              id="inst-edit"
              variant="outlined"
              required
            />
            <TextFieldFormsy
              label="Category"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`category[${i}]`}
              id="cat-edit"
              variant="outlined"
              required
            />
            <DatePickerFormsy
              fullWidth
              name={`date[${i}]`}
              id="date-edit"
              // disabled={loading}
              variant="outlined"
              required
            />
            <TextFieldFormsy
              label="Duration"
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
              name={`duration[${i}]`}
              id="dur-edit"
              variant="outlined"
              required
            />
            <TextFieldFormsy
              label="Level"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              name={`level[${i}]`}
              id="dur-edit"
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
          id="user-skills-edit"
          disabled={!validation}
          value="legacy"
        >
          Edit
        </Button>
      </Formsy>
    </>
  );
}
export default Certifications;
