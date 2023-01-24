import { ReactSelectMulti, TextFieldFormsy } from "../../../formsy";

import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import gql from "graphql-tag";
import Formsy from "formsy-react";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectAuth from "../../../redux/user/userSelector";
import { useQuery } from "@apollo/react-hooks";

const UPDATE_PROFILE_MUTATION = gql`
  mutation p($input: UpdateConsultantProfileInput) {
    updateConsultantProfile(input: $input) {
      id
    }
  }
`;
const GET_NATIONALITIES_QUERY = gql`
  query nat {
    getAllNationalities {
      id
      male
      female
    }
  }
`;
function Info(props) {
  const defaultData = [];
  const { data: dat } = useQuery(GET_NATIONALITIES_QUERY);
  if (defaultData.length < 1) {
    console.log(dat);
    if (props?.user?.user?.gender == "Male")
      dat?.getAllNationalities.forEach((c) => {
        defaultData.push({ value: c.id, label: c.male });
      });
    else
      dat?.getAllNationalities.forEach((c) => {
        defaultData.push({ value: c.id, label: c.female });
      });
  }
  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION);
  const [validation, setValidation] = useState(false);
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  const handleSubmit = (model) => {
    const { hourRate, years, phone, website, driversLicense, nationality } =
      model;

    updateProfile({
      variables: {
        input: {
          id: props.profile,
          hourRate: parseInt(hourRate),
          years: parseInt(years),
          phone: parseInt(phone),
          website: website,
          driversLicense: driversLicense.value,
          nationality_id: nationality.value,
        },
      },
    })
      .then(() => {
        props.increment({ variables: { id: props.profile, val: 0 } });

        props.setTab();
      })
      .catch((e) => {});
  };
  return (
    <>
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
      >
        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
          Nationality
          <ReactSelectMulti
            name="nationality"
            options={defaultData}
            isMulti={false}
            isClearable={false}
            required
          />
          <TextFieldFormsy
            variant="outlined"
            label="Phone number"
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
            name="phone"
            id="phone-edit"
            required
          />
          <TextFieldFormsy
            variant="outlined"
            label="Hour rate"
            validations={{
              minLength: 2,
              maxLength: 15,
              matchRegexp: /^[0-9]*$/,
            }}
            validationErrors={{
              minLength: "Minimum length is 2",
              maxLength: "Maximum length is 15",
              matchRegexp: "Only nubmers are allowed",
            }}
            type="text"
            name="hourRate"
            id="hr-edit"
            required
          />
          <TextFieldFormsy
            variant="outlined"
            label="Years of experience"
            validations={{
              minLength: 1,
              maxLength: 15,
              matchRegexp: /^[0-9]*$/,
            }}
            validationErrors={{
              minLength: "Minimum length is 1",
              maxLength: "Maximum length is 15",
              matchRegexp: "Only nubmers are allowed",
            }}
            type="text"
            name="years"
            id="years-edit"
            required
          />
          <TextFieldFormsy
            variant="outlined"
            label="Website"
            validations={{
              matchRegexp:
                /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
            }}
            validationErrors={{
              matchRegexp: "Enter a valid URL",
            }}
            type="text"
            name="website"
            id="website-edit"
          />
          <br />
          Drivers License
          <ReactSelectMulti
            name="driversLicense"
            options={[
              { value: "A1", label: "A1" },
              { value: "A", label: "A" },
              { value: "B", label: "B" },
              { value: "EB", label: "EB" },
              { value: "C1", label: "C1" },
              { value: "C", label: "C" },
              { value: "EC1", label: "EC1" },
              { value: "EC", label: "EC" },
            ]}
            isMulti={false}
            isClearable={false}
            required
          />
        </div>

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
          Add
        </Button>
      </Formsy>{" "}
    </>
  );
}
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(Info);
