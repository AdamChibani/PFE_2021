import styles from "../../MyProfile/my_profile.module.css";
import { ReactSelectMulti, TextFieldFormsy } from "../../../formsy";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";
import Formsy from "formsy-react";
import { useQuery } from "@apollo/react-hooks";

const CREATE_PREFERENCES_MUTATION = gql`
  mutation mo3jza($input: [UpdatePreferencesInput!]!, $pId: Int!) {
    updatePreferences(input: $input, pId: $pId)
  }
`;
const getCountries = gql`
  query getAll {
    getAllCountries {
      id
      name
    }
  }
`;
function Preferences(props) {
  const [createPreferences] = useMutation(CREATE_PREFERENCES_MUTATION);
  const [validation, setValidation] = useState(false);
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  const [preference, setPreference] = useState([{}]);
  const handleSubmit = (model) => {
    const { name, status, countries } = model;
    let arrr = [];

    name.forEach((f, i) => {
      let country = [];
      countries[i].forEach((cont) => {
        country.push(parseInt(cont.value));
      });
      console.log(country);
      arrr.push({
        name: name[i],
        status: status[i],
        countryId: country,
      });
    });
    createPreferences({
      variables: {
        input: arrr,

        pId: props.profile,
      },
    })
      .then(() => {
        props.increment({ variables: { id: props.profile, val: 4 } });

        props.setTab("4");
      })
      .catch((e) => {});
  };
  const handleDelete = (i) => {
    let arr = [...preference];
    arr.splice(i, 1);
    setPreference(arr);
  };
  const handleAdd = () => {
    setPreference([...preference, {}]);
  };
  const defaultCountries = [];
  const { data: dat } = useQuery(getCountries);

  if (defaultCountries.length < 1) {
    dat?.getAllCountries.forEach((c) => {
      defaultCountries.push({ value: c.id, label: c.name });
    });
  }
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
        {preference.map((p, i) => (
          <div>
            <TextFieldFormsy
              label="Status"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              type="text"
              name={`status[${i}]`}
              id="status-edit"
              variant="outlined"
              required
            />
            <TextFieldFormsy
              label="Name"
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
            <ReactSelectMulti
              name={`countries[${i}]`}
              options={defaultCountries}
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
        ))}{" "}
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          color="primary"
          className="w-224 mx-auto mt-16 "
          aria-label="EDIT"
          id="user-preferences-edit"
          disabled={!validation}
          value="legacy"
        >
          Add
        </Button>
      </Formsy>
    </>
  );
}

export default Preferences;
