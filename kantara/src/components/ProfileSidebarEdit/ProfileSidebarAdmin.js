import React, { useEffect, useState } from "react";
import Link from "next/link";
import CreateIcon from "@material-ui/icons/Create";
import styles from "../MyProfile/my_profile.module.css";
import { ReactSelectMulti, TextFieldFormsy } from "../../formsy";
import Formsy from "formsy-react";
import selectAuth from "../../redux/user/userSelector";
import gql from "graphql-tag";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Avatar, Button, CircularProgress } from "@material-ui/core";
const GET_PROFILE_QUERY = gql`
  query my($id: Int!) {
    myProfile(id: $id) {
      id
      firstName
      lastName
      email
      gender
      profileImage
      role {
        id
      }
      company {
        id
        name
        phone
        street
        city
        email
        postalCode
        country {
          id
          name
        }
        states {
          id
          name
        }
      }
    }
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
const getStates = gql`
  query getStates {
    getAllStates {
      id
      name
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation upd($input: UserInput!) {
    updateUser(input: $input) {
      firstName
      lastName
      email
    }
  }
`;
const UPDATE_COMPANY_MUTATION = gql`
  mutation update($input: updateAgInput) {
    updateAgency(input: $input)
  }
`;
const SidebarAdmin = (props) => {
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION);
  const [updateCompany, { loading: companyLoading }] = useMutation(
    UPDATE_COMPANY_MUTATION
  );
  const defaultCountries = [];
  const { data: dat } = useQuery(getCountries);

  if (defaultCountries.length < 1) {
    dat?.getAllCountries.forEach((c) => {
      defaultCountries.push({ value: c.id, label: c.name });
    });
  }
  const { data, refetch } = useQuery(GET_PROFILE_QUERY, {
    variables: { id: props?.user?.user?.id },
    fetchPolicy: "no-cache",
  });
  console.log(data);
  const [user, setUser] = useState(data?.myProfile);
  useEffect(() => {
    setUser(data?.myProfile);
  }, [data]);
  const defaultStates = [];

  const { data: statesData } = useQuery(getStates);
  if (defaultStates.length < 1) {
    statesData?.getAllStates.forEach((c) => {
      defaultStates.push({ value: c.id, label: c.name });
    });
  }
  const [editName, setEditName] = useState(false);
  const [edit, setEdit] = useState(false);

  const [validation, setValidation] = useState(false);
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  const handleSubmit = (model) => {
    Promise.all([
      updateUser({
        variables: {
          input: {
            id: user?.id,
            firstName: model?.firstName || user?.firstName,
            lastName: model?.lastName || user?.lastName,
            email: model?.email || user?.email,
          },
        },
      }),
      updateCompany({
        variables: {
          input: {
            id: user?.company?.id,
            name: model?.companyName || user?.company?.name,
            phone: parseInt(model?.phone) || user?.company?.phone,
            street: model?.street || user?.company?.street,
            city: model?.city || user?.company?.city,
            postalCode: model?.postalCode || user?.company?.postalCode,
            country_id:
              parseInt(model?.country?.value) ||
              parseInt(user?.company?.country?.id),
            state_id:
              parseInt(model?.state?.value) ||
              parseInt(user?.company?.states?.id),
            email: model?.compEmail || user?.company?.email,
          },
        },
      }),
    ]).then(() => {
      refetch();

      setEdit(false);
      setEditName(false);
    });
  };
  return (
    <>
      {/* <!-- SidebarAdmin Start --> */}

      <div {...props}>
        <Formsy
          onValidSubmit={handleSubmit}
          onValid={enableButton}
          onInvalid={disableButton}
        >
          <div className="pl-lg-5">
            {/* <!-- Top Start --> */}
            <div className="bg-white shadow-9 rounded-4">
              <div className="px-5 py-11 text-center border-bottom border-mercury">
                <a className="mb-4">
                  {user?.profileImage ? (
                    <img
                      className="circle-54"
                      src={user?.profileImage}
                      alt=""
                    />
                  ) : (
                    <Avatar className="circle-54">
                      {user?.firstName[0].toUpperCase()}
                    </Avatar>
                  )}
                </a>
                <h4 className="mb-0">
                  {!editName ? (
                    <>
                      {" "}
                      <a className="text-black-2 font-size-6 font-weight-semibold">
                        {user?.firstName}&nbsp;{user?.lastName}
                      </a>
                      <p>
                        <a className="text-gray font-size-4">
                          {user?.company?.name}
                          {"'s admin"}
                        </a>
                      </p>
                    </>
                  ) : (
                    <>
                      <TextFieldFormsy
                        label="First name"
                        type="text"
                        name="firstName"
                        id="fName-edit"
                        value={user?.firstName}
                        validations={{
                          isSpecialWords: true,
                        }}
                        validationErrors={{
                          isSpecialWords: "Error no special characters allowed",
                        }}
                        required
                      />
                      <TextFieldFormsy
                        label="Last name"
                        type="text"
                        name="lastName"
                        id="lName-edit"
                        value={user?.lastName}
                        validations={{
                          isSpecialWords: true,
                        }}
                        validationErrors={{
                          isSpecialWords: "Error no special characters allowed",
                        }}
                        required
                      />
                      <TextFieldFormsy
                        label="Company name"
                        type="text"
                        name="companyName"
                        id="company-edit"
                        value={user?.company?.name}
                        validations={{
                          isSpecialWords: true,
                        }}
                        validationErrors={{
                          isSpecialWords: "Error no special characters allowed",
                        }}
                        required
                      />
                    </>
                  )}
                  <CreateIcon
                    className={styles["edit"]}
                    onClick={() => setEditName(!editName)}
                  />
                </h4>
              </div>
              {/* <!-- Top End --> */}
              {/* <!-- Bottom Start --> */}
              <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
                <h5 className="text-black-2 mb-8 font-size-5">
                  Contact Info{" "}
                  <CreateIcon
                    className={styles["edit"]}
                    onClick={() => setEdit(!edit)}
                  />
                </h5>

                {/* <!-- Single List --> */}
                {edit ? (
                  <>
                    {" "}
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Location</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                        <TextFieldFormsy
                          label="Street"
                          type="text"
                          name="street"
                          className="mt-5"
                          id="street-edit"
                          variant="outlined"
                          value={user?.company?.street}
                          validations={{
                            isSpecialWords: true,
                          }}
                          validationErrors={{
                            isSpecialWords:
                              "Error no special characters allowed",
                          }}
                          required
                        />
                        <TextFieldFormsy
                          label="City"
                          type="text"
                          className="mt-5"
                          name="city"
                          variant="outlined"
                          id="city-edit"
                          value={user?.company?.city}
                          validations={{
                            isSpecialWords: true,
                          }}
                          validationErrors={{
                            isSpecialWords:
                              "Error no special characters allowed",
                          }}
                          required
                        />
                        <ReactSelectMulti
                          name="state"
                          value={{
                            value: user?.company?.states?.id,
                            label: user?.company?.states?.name,
                          }}
                          options={defaultStates}
                          isClearable={false}
                          isMulti={false}
                        />{" "}
                        <ReactSelectMulti
                          name="country"
                          value={{
                            value: user?.company?.country?.id,
                            label: user?.company?.country?.name,
                          }}
                          options={defaultCountries}
                          isClearable={false}
                          isMulti={false}
                        />
                        <TextFieldFormsy
                          label="Postal code"
                          type="text"
                          name="postalCode"
                          className="mt-5"
                          id="postal-edit"
                          variant="outlined"
                          value={user?.company?.postalCode}
                          required
                        />
                      </h5>
                    </div>
                    {/* <!-- Single List --> */}
                    {/* <!-- Single List --> */}
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">E-mail</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <TextFieldFormsy
                          required
                          label="E-mail"
                          validations={{
                            isEmail: true,
                          }}
                          validationErrors={{
                            required: "Error E-mail required",
                            isEmail: "This is not a valid E-mail",
                          }}
                          id="email"
                          name="email"
                          className="mt-5"
                          fullWidth
                          variant="outlined"
                          placeholder="example@gmail.com"
                          value={user?.email}
                        />
                      </h5>
                    </div>
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Company's E-mail</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <TextFieldFormsy
                          required
                          label="Company's E-mail"
                          validations={{
                            isEmail: true,
                          }}
                          validationErrors={{
                            required: "Error E-mail required",
                            isEmail: "This is not a valid E-mail",
                          }}
                          id="email"
                          name="compEmail"
                          className="mt-5"
                          fullWidth
                          variant="outlined"
                          placeholder="example@gmail.com"
                          value={user?.company?.email}
                        />
                      </h5>
                    </div>
                    {/* <!-- Single List --> */}
                    {/* <!-- Single List --> */}
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Phone</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <a
                          className="text-black-2 text-break"
                          href={`tel:${user?.company?.phone}`}
                        ></a>
                        <TextFieldFormsy
                          label="Phone number"
                          type="text"
                          name="phone"
                          className="mt-5"
                          id="phone-edit"
                          variant="outlined"
                          value={user?.company?.phone}
                          required
                        />
                      </h5>
                    </div>
                    {/* <!-- Single List --> */}
                    {/* <!-- Single List --> */}
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Location</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                        {user?.company?.street}, {user?.company?.city},{" "}
                        {user?.company?.states?.name},{" "}
                        {user?.company?.country?.name}{" "}
                        {user?.company?.postalCode}
                      </h5>
                    </div>
                    {/* <!-- Single List --> */}
                    {/* <!-- Single List --> */}
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">E-mail</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <Link href={`mailto:${user?.email}`}>
                          <a className="text-black-2 text-break">
                            {user?.email}
                          </a>
                        </Link>
                      </h5>
                    </div>
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Company's E-mail</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <Link href={`mailto:${user?.company?.email}`}>
                          <a className="text-black-2 text-break">
                            {user?.company?.email}
                          </a>
                        </Link>
                      </h5>
                    </div>
                    {/* <!-- Single List --> */}
                    {/* <!-- Single List --> */}
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Company's phone number</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <a
                          className="text-black-2 text-break"
                          href={`tel:${user?.company.phone}`}
                        >
                          {user?.company.phone}
                        </a>
                      </h5>
                    </div>
                    {/* <!-- Single List --> */}
                    {/* <!-- Single List --> */}
                    {user?.company?.website ? (
                      <div>
                        <p className="font-size-4 mb-0">Website Linked</p>
                        <h5 className="font-size-4 font-weight-semibold mb-0">
                          <Link href={user?.company?.website || "/#"}>
                            <a className="text-break">
                              {user?.company?.website}
                            </a>
                          </Link>
                        </h5>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </>
                )}

                <Button
                  fullWidth
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className="w-224 mx-auto mt-16 "
                  aria-label="EDIT"
                  id="user-preferences-edit"
                  disabled={!validation || loading || companyLoading}
                  hidden={!edit && !editName}
                  value="legacy"
                >
                  {loading || companyLoading ? <CircularProgress /> : "Edit"}
                </Button>
                {/* <!-- Bottom End --> */}
              </div>
            </div>
          </div>
        </Formsy>
      </div>

      {/* <!-- SidebarAdmin End --> */}
    </>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(SidebarAdmin);
