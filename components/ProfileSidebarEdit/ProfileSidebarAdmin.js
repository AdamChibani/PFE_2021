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
import { Avatar, Button } from "@material-ui/core";
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
        country {
          id
          name
        }
      }
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
const UPDATE_USER_MUTATION = gql`
  mutation upd($input: UserInput!) {
    updateUser(input: $input) {
      firstName
      lastName
      email
    }
  }
`;
const UPDATE_PROFILE_MUTATION = gql`
  mutation update($input: UpdateConsultantProfileInput) {
    updateConsultantProfile(input: $input) {
      id
      hourRate
      phone
      nationalities {
        id
        male
        female
      }
    }
  }
`;
const SidebarAdmin = (props) => {
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION);
  const [updateProfile, { loading: profileLoading }] = useMutation(
    UPDATE_PROFILE_MUTATION
  );

  const { data } = useQuery(GET_PROFILE_QUERY, {
    variables: { id: props.user.user.id },
  });
  console.log(data);
  const [user, setUser] = useState(data?.myProfile);
  useEffect(() => {
    setUser(data?.myProfile);
  }, [data]);
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
    console.log(model);
    console.log(user?.profile?.nationalities);
    updateUser({
      variables: {
        input: {
          id: user?.id,
          firstName: model.firstName || user?.firstName,
          lastName: model.lastName || user?.lastName,
          email: model.email || user?.email,
        },
      },
    });
    updateProfile({
      variables: {
        input: {
          id: user?.profile?.id,
          hourRate: parseInt(model.hourRate) || user?.profile?.hourRate,
          phone: parseInt(model.phone) || user?.profile?.phone,
          nationality_id:
            model.nationality.value || user?.profile?.nationalities?.id,
        },
      },
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
                        validations={{
                          isSpecialWords: true,
                        }}
                        validationErrors={{
                          isSpecialWords: "Error no special characters allowed",
                        }}
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
                        validations={{
                          isSpecialWords: true,
                        }}
                        validationErrors={{
                          isSpecialWords: "Error no special characters allowed",
                        }}
                        type="text"
                        name="lastName"
                        id="lName-edit"
                        value={user?.lastName}
                        required
                      />
                      <TextFieldFormsy
                        label="Company name"
                        validations={{
                          isSpecialWords: true,
                        }}
                        validationErrors={{
                          isSpecialWords: "Error no special characters allowed",
                        }}
                        type="text"
                        name="companyName"
                        id="company-edit"
                        value={user?.company?.name}
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
                        Tunis , Tunisia
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
                          fullWidth
                          variant="outlined"
                          placeholder="example@gmail.com"
                          value={user?.email}
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
                        {user?.company?.country?.name}
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
                    {/* <!-- Single List --> */}
                    {/* <!-- Single List --> */}
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Phone</p>
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
                  disabled={!validation}
                  hidden={!edit && !editName}
                  value="legacy"
                >
                  Edit
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
