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
      profile {
        id
        hourRate
        phone
        website
        nationalities {
          id
          male
          female
        }
        fields {
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
const Sidebar = (props) => {
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION);
  const [updateProfile, { loading: profileLoading }] = useMutation(
    UPDATE_PROFILE_MUTATION
  );

  const { data } = useQuery(GET_PROFILE_QUERY, {
    variables: { id: props?.user?.user?.id },
  });
  console.log(data);
  const [user, setUser] = useState(data?.myProfile);
  useEffect(() => {
    setUser(data?.myProfile);
  }, [data]);
  console.log(user?.profile?.nationalities?.male, user?.gender);
  const [editName, setEditName] = useState(false);
  const [edit, setEdit] = useState(false);
  const defaultData = [];
  const { data: dat } = useQuery(GET_NATIONALITIES_QUERY);
  if (defaultData.length < 1) {
    console.log(dat);
    if (user?.gender == "Male")
      dat?.getAllNationalities.forEach((c) => {
        defaultData.push({ value: c.id, label: c.male });
      });
    else
      dat?.getAllNationalities.forEach((c) => {
        defaultData.push({ value: c.id, label: c.female });
      });
  }
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
      {/* <!-- Sidebar Start --> */}

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
                    </>
                  ) : (
                    <>
                      <TextFieldFormsy
                        label="First name"
                        type="text"
                        name="firstName"
                        id="fName-edit"
                        value={user?.firstName}
                        required
                      />
                      <TextFieldFormsy
                        label="Last name"
                        type="text"
                        name="lastName"
                        id="lName-edit"
                        value={user?.lastName}
                        required
                      />{" "}
                    </>
                  )}
                  <CreateIcon
                    className={styles["edit"]}
                    onClick={() => setEditName(!editName)}
                  />
                </h4>
                <p>
                  <a className="text-gray font-size-4">
                    {user?.profile.fields[0].name}
                  </a>
                </p>
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
                    {user?.profile?.nationalities?.male ? (
                      <div className="mb-7">
                        <p className="font-size-4 mb-0">Nationality</p>
                        <ReactSelectMulti
                          name="nationality"
                          options={defaultData}
                          value={
                            ({ value: user?.profile?.nationalities?.id },
                            { label: user?.profile?.nationalities?.male })
                          }
                          isMulti={false}
                          isClearable={false}
                          required
                        />
                      </div>
                    ) : (
                      <span></span>
                    )}
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
                          href={`tel:${user?.profile.phone}`}
                        ></a>
                        <TextFieldFormsy
                          label="Phone number"
                          type="text"
                          name="phone"
                          id="phone-edit"
                          value={user?.profile?.phone.toString()}
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
                          required
                        />
                      </h5>
                    </div>
                    {user?.profile?.hourRate ? (
                      <div className="mb-7">
                        <p className="font-size-4 mb-0">Hour rate</p>
                        <h5 className="font-size-4 font-weight-semibold mb-0">
                          <TextFieldFormsy
                            label="Hour rate"
                            type="text"
                            name="hourRate"
                            id="hr-edit"
                            value={user?.profile?.hourRate.toString()}
                            validations={{
                              maxLength: 15,
                              matchRegexp: /^[0-9]*$/,
                            }}
                            validationErrors={{
                              maxLength: "Maximum length is 15",
                              matchRegexp: "Only nubmers are allowed",
                            }}
                            required
                          />
                        </h5>
                      </div>
                    ) : (
                      <span></span>
                    )}
                    {/* <!-- Single List --> */}
                    {/* <!-- Single List --> */}
                    <div className="mb-7">
                      <p className="font-size-4 mb-0">Website Linked</p>
                      <h5 className="font-size-4 font-weight-semibold mb-0">
                        <TextFieldFormsy
                          label="Website"
                          type="text"
                          name="website"
                          id="website-edit"
                          value={user?.profile?.website || null}
                        />
                      </h5>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    {user?.profile?.nationalities?.male ? (
                      <div className="mb-7">
                        <p className="font-size-4 mb-0">Nationality</p>
                        {user?.gender == "Male" ? (
                          <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                            {user?.profile?.nationalities?.male}
                          </h5>
                        ) : (
                          <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                            {user?.profile?.nationalities?.female}
                          </h5>
                        )}
                      </div>
                    ) : (
                      <span></span>
                    )}
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
                          href={`tel:${user?.profile.phone}`}
                        >
                          {user?.profile.phone}
                        </a>
                      </h5>
                    </div>
                    {user?.profile?.hourRate ? (
                      <div>
                        <p className="font-size-4 mb-0">Hour rate</p>
                        <h5 className="font-size-4 font-weight-semibold mb-0">
                          <a className="text-break">
                            {user?.profile?.hourRate}$
                          </a>
                        </h5>
                      </div>
                    ) : (
                      <span></span>
                    )}
                    {/* <!-- Single List --> */}
                    {/* <!-- Single List --> */}
                    {user?.profile?.website ? (
                      <div>
                        <p className="font-size-4 mb-0">Website Linked</p>
                        <h5 className="font-size-4 font-weight-semibold mb-0">
                          <Link href={user?.profile?.website || "/#"}>
                            <a className="text-break">
                              {user?.profile?.website}
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

      {/* <!-- Sidebar End --> */}
    </>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(Sidebar);
