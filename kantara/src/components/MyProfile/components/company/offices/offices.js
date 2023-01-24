import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Formsy from "formsy-react";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { ReactSelectMulti, TextFieldFormsy } from "../../../../../formsy";
import styles from "../../../my_profile.module.css";
const getCountries = gql`
  query getAll {
    getAllCountries {
      id
      name
    }
  }
`;
const UPDATE_OFFICES_MUTATION = gql`
  mutation findAll($input: [UpdateOfficeInput!]!) {
    updateOffices(input: $input)
  }
`;
const GET_OFFICES_QUERY = gql`
  query findAll($id: Int!) {
    getAllOffices(id: $id) {
      id
      name
      address {
        street
        city
        postalCode
        country {
          id
          name
          continent {
            name
          }
        }
      }
    }
  }
`;
function Offices(props) {
  const defaultCountries = [];
  const { data: dat } = useQuery(getCountries);
  if (defaultCountries.length < 1) {
    dat?.getAllCountries.forEach((c) => {
      defaultCountries.push({ value: c.id, label: c.name });
    });
  }
  const { data, loading, refetch } = useQuery(GET_OFFICES_QUERY, {
    variables: { id: props.id },
    fetchPolicy: "no-cache",
  });
  const [editOf, setEditOf] = useState(false);
  const [validation, setValidation] = useState(false);
  const [update] = useMutation(UPDATE_OFFICES_MUTATION);
  const handleSubmit = (model) => {
    const { officeId, office, street, city, postalCode, country } = model;
    let arrr = [];
    office.forEach((o, i) => {
      if (officeId[i]) {
        arrr.push({
          id: parseInt(officeId[i]),
          name: office[i],
          street: street[i],
          city: city[i],
          postal_code: postalCode[i],
          country_id: parseInt(country[i].value),
        });
      } else {
        arrr.push({
          name: office[i],
          street: street[i],
          city: city[i],
          postal_code: postalCode[i],
          country_id: parseInt(country[i].value),
          company_id: props?.id,
        });
      }
    });

    update({ variables: { input: arrr } }).then(() => {
      refetch();
      setEditOf(false);
    });
  };
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  // useEffect(() => {
  //   console.log("test");
  // }, [data]);
  return (
    <>
      {" "}
      <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
        Offices
        <CreateIcon
          className={styles["edit"]}
          onClick={() => setEditOf(!editOf)}
        />
      </h4>
      {!editOf ? (
        <ul className="list-unstyled ">
          {data?.getAllOffices?.map((o, i) => (
            <li className="min-width-px-96 mr-3 rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
              {o?.name}: {o?.address?.street}, {o?.address?.city}{" "}
              {o?.address?.postalCode}, {o?.address?.country?.name}
            </li>
          ))}
        </ul>
      ) : (
        <Formsy
          onValidSubmit={handleSubmit}
          onValid={enableButton}
          onInvalid={disableButton}
        >
          {data?.getAllOffices?.map((o, i) => (
            <div className="py-10 border-top">
              <TextFieldFormsy
                type="hidden"
                name={`officeId[${i}]`}
                id="id"
                value={o?.id}
              />
              <TextFieldFormsy
                label="Office name"
                type="text"
                name={`office[${i}]`}
                id="name-edit"
                value={o?.name}
                variant="outlined"
                className="mx-10"
                required
              />
              <TextFieldFormsy
                label="Office street"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`street[${i}]`}
                id="street-edit"
                value={o?.address?.street}
                variant="outlined"
                required
              />
              <TextFieldFormsy
                label="Office city"
                validations={{
                  isSpecialWords: true,
                }}
                validationErrors={{
                  isSpecialWords: "Error no special characters allowed",
                }}
                type="text"
                name={`city[${i}]`}
                id="city-edit"
                value={o?.address?.city}
                variant="outlined"
                className="mx-5"
                required
              />
              <TextFieldFormsy
                label="Office postalCode"
                type="text"
                name={`postalCode[${i}]`}
                id="postalCode-edit"
                value={o?.address?.postalCode}
                variant="outlined"
                className="ml-10 mt-5"
                required
              />
              <ReactSelectMulti
                name={`country[${i}]`}
                options={defaultCountries}
                value={{
                  value: o?.address?.country?.id,
                  label: o?.address?.country?.name,
                }}
                required
                isClearable={false}
                isMulti={false}
                placeholder="Select country..."
              />
            </div>
          ))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="update-button"
            className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
            aria-label="update"
            disabled={!validation}
            value="legacy"
          >
            <b>Update</b>
          </Button>
        </Formsy>
      )}
    </>
  );
}
export default Offices;
