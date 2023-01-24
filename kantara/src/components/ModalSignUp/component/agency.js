import React, { useContext, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";

import Formsy from "formsy-react";
import { ReactSelectMulti, TextFieldFormsy } from "../../../formsy";
import Button from "@material-ui/core/Button";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { connect } from "react-redux";
import selectAuth from "../../../redux/user/userSelector";
import { setUser } from "../../../redux/user/userActions";

import { createStructuredSelector } from "reselect";
const getCountries = gql`
  query getAll {
    getAllCountries {
      id
      name
    }
  }
`;
const getStates = gql`
  query getStates {
    getAllStates {
      id
      name
    }
  }
`;
const createCompany = gql`
  mutation createComp($input: createAgInput) {
    createAgency(input: $input) {
      id
    }
  }
`;
const createEnterprise = gql`
  mutation createComp($input: createAgInput) {
    createEnterprise(input: $input) {
      id
    }
  }
`;
const assignCompany = gql`
  mutation assignComp($input: UserInput) {
    user(data: $input)
  }
`;
const Agency = (props) => {
  const gContext = useContext(GlobalContext);
  console.log({ pop: props.handler });
  const [createEnt] = useMutation(createEnterprise);
  const [createComp, { data: cc, loading, error }] = useMutation(createCompany);
  const [isFormValid, setIsFormValid] = useState(false);
  function disableButton() {
    setIsFormValid(false);
  }
  function enableButton() {
    setIsFormValid(true);
  }
  function handleSubmit(input) {
    console.log({ userD: props.userD });
    if (props.isAgency === 1) {
      createComp({
        variables: {
          input: {
            name: input.name,
            enterpriseSize: parseInt(input.size),
            taxId: parseInt(input.taxId),
            phone: parseInt(input.phone),
            street: input.street,
            city: input.city,
            postalCode: input.postalCode,
            country_id: parseInt(input.country.value),
            email: input.email,
            userId: props.userD.user.id,
            state_id: parseInt(input.state.value),
            isAgency: props.isAgency,
          },
        },
      })
        .catch((e) => {})
        .then((d) => {
          console.log(d);

          if (d) {
            props.handler("one");
            console.log({ d });
            props.setUser({
              ...props?.userD,
              user: {
                __typename: props.userD.user.__typename,
                email: props.userD.user.email,
                firstName: props.userD.user.firstName,
                id: props.userD.user.id,
                lastName: props.userD.user.lastName,
                profileImage: props.userD.user.profileImage,
                role: { id: 3 },
                company_id: d?.data?.createEnterprise?.id,
              },
            });
            gContext.toggleSignUpModal();
          }
        });
    } else {
      createEnt({
        variables: {
          input: {
            name: input.name,
            enterpriseSize: parseInt(input.size),
            taxId: parseInt(input.taxId),
            phone: parseInt(input.phone),
            street: input.street,
            city: input.city,
            postalCode: input.postalCode,
            country_id: parseInt(input.country.value),
            email: input.email,
            userId: props.userD.user.id,
            state_id: parseInt(input.state.value),
            isAgency: props.isAgency,
          },
        },
      })
        .catch((e) => {})
        .then((d) => {
          console.log(d);

          if (d) {
            props.handler("one");
            props.setUser({
              ...props?.userD,
              user: {
                __typename: props.userD.user.__typename,
                email: props.userD.user.email,
                firstName: props.userD.user.firstName,
                id: props.userD.user.id,
                lastName: props.userD.user.lastName,
                profileImage: props.userD.user.profileImage,
                role: { id: 2 },
                company_id: d?.data?.createEnterprise?.id,
              },
            });

            gContext.toggleSignUpModal();
          }
        });
    }
  }
  const defaultCountries = [];
  const defaultStates = [];
  const { data: dat } = useQuery(getCountries);
  const { data } = useQuery(getStates);
  if (defaultCountries.length < 1) {
    dat?.getAllCountries.forEach((c) => {
      defaultCountries.push({ value: c.id, label: c.name });
    });
  }
  if (defaultStates.length < 1) {
    data?.getAllStates.forEach((c) => {
      defaultStates.push({ value: c.id, label: c.name });
    });
  }
  return (
    <Formsy
      onSubmit={handleSubmit}
      onValid={enableButton}
      onInvalid={disableButton}
    >
      <div className="form-group">
        <label
          htmlFor="name"
          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
        >
          Name{" "}
        </label>
        <TextFieldFormsy
          required
          label="name"
          validations={{
            isSpecialWords: true,
          }}
          validationErrors={{
            isSpecialWords: "Error no special characters allowed",
          }}
          id="name"
          name="name"
          fullWidth
          variant="outlined"
        />
      </div>
      <div className="form-group">
        <label
          htmlFor="size"
          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
        >
          Number of employees{" "}
        </label>
        <TextFieldFormsy
          required
          type="text"
          label="number of employees"
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
          id="size"
          name="size"
          fullWidth
          variant="outlined"
        />
      </div>
      <div className="form-group">
        <label
          htmlFor="taxId"
          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
        >
          Tax Id{" "}
        </label>
        <TextFieldFormsy
          required
          type="text"
          fullWidth={true}
          label="tax id"
          validations={{
            maxLength: 15,
            matchRegexp: /^[0-9]*$/,
          }}
          validationErrors={{
            maxLength: "Maximum length is 15",
            matchRegexp: "Only nubmers are allowed",
          }}
          id="taxId"
          name="taxId"
          variant="outlined"
        />
      </div>
      <div className="or-devider">
        <span className="font-size-3 line-height-reset ">Contact</span>
      </div>
      <div className="form-group">
        <label
          htmlFor="email"
          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
        >
          E-mail
        </label>
        <TextFieldFormsy
          required
          label="email"
          validations={{
            isEmail: true,
          }}
          validationErrors={{
            required: "E-mail is required",
            isEmail: "This is not a valid E-mail",
          }}
          id="email"
          name="email"
          fullWidth
          variant="outlined"
          placeholder="example@gmail.com"
        />
      </div>
      <div className="form-group">
        <label
          htmlFor="phoneNumber"
          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
        >
          Phone number
        </label>
        <div className="position-relative">
          <TextFieldFormsy
            required
            label="phone number"
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
            id="phoneNumber"
            name="phone"
            fullWidth
            variant="outlined"
            type="text"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="country"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Country
          </label>
          <div className="position-relative">
            <ReactSelectMulti
              name="country"
              options={defaultCountries}
              required
              isClearable={false}
              isMulti={false}
              placeholder="Select country..."
            />
          </div>
        </div>
        <div className="form-group">
          <div className="position-relative mt-5">
            <label
              htmlFor="address"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              Address{" "}
            </label>
            <TextFieldFormsy
              required
              label="street"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              id="street"
              name="street"
              fullWidth
              variant="outlined"
            />
            <TextFieldFormsy
              required
              label="city"
              validations={{
                isSpecialWords: true,
              }}
              validationErrors={{
                isSpecialWords: "Error no special characters allowed",
              }}
              id="city"
              name="city"
              fullWidth
              variant="outlined"
            />
            <ReactSelectMulti
              name="state"
              options={defaultStates}
              required
              isClearable={false}
              isMulti={false}
              placeholder="Select state..."
            />
            <TextFieldFormsy
              required
              label="postal code"
              id="postalCode"
              name="postalCode"
              fullWidth
              variant="outlined"
            />
          </div>
        </div>
      </div>

      <div className="form-group mb-8">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          id="signup-button"
          className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
          aria-label="signup"
          disabled={!isFormValid}
          value="legacy"
        >
          <b>Submit</b>
        </Button>
      </div>
    </Formsy>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectAuth });
function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => {
      return dispatch(setUser(user));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Agency);
