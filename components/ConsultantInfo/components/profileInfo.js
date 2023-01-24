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
          <ReactSelectMulti
            name="nationality"
            options={defaultData}
            isMulti={false}
            isClearable={false}
            required
          />
          <TextFieldFormsy
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
            label="Hour rate"
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
            name="hourRate"
            id="hr-edit"
            required
          />
          <TextFieldFormsy
            label="Years of experience"
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
            name="years"
            id="years-edit"
            required
          />
          <TextFieldFormsy
            label="Website"
            validations={{
              isSpecialWords: true,
            }}
            validationErrors={{
              isSpecialWords: "Error no special characters allowed",
            }}
            type="text"
            name="website"
            id="website-edit"
          />
          <ReactSelectMulti
            name="driversLicense"
            options={[{ value: "A", label: "A" }]}
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
          Edit
        </Button>
      </Formsy>{" "}
    </>
  );
}
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(Info);
