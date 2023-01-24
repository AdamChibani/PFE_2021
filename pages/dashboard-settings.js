import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import selectAuth from "../redux/user/userSelector";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";
import gql from "graphql-tag";

import {
  Avatar,
  Button,
  CircularProgress,
  Fab,
  Fade,
  Grid,
  makeStyles,
  MenuItem,
  Modal,
  Typography,
} from "@material-ui/core";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Link } from "react-scroll";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../components/MyProfile/my_profile.module.css";
import Formsy from "formsy-react";
import { PasswordFormsy, SelectFormsy, TextFieldFormsy } from "../formsy";

const sign = gql`
  mutation signup($input: UserInput) {
    signup(data: $input)
  }
`;
const DELETE_USER_MUTATION = gql`
  mutation del($id: Int!) {
    deleteUser(userID: $id)
  }
`;
const GET_CONSULTANTS_QUERY = gql`
  query get($id: Int!) {
    getAgenciesConsultants(id: $id) {
      id
      firstName
      lastName
      profileImage

      profile {
        fields {
          name
        }
      }
    }
  }
`;
const CREATE_PROFILE_MUTATION = gql`
  mutation p($input: CreateConsultantProfileInput) {
    createConsultantProfile(input: $input) {
      id
    }
  }
`;

// const UPDATE_PROFILE_PICTURE = gql`
//   mutation updateProfilePicture($file: String!) {
//     updateProfilePicture(file: $file)
//   }
// `;
function DashboardSettings(props) {
  const [open, setOpen] = useState(false);

  const [signUp, { data: singUpData, loading: signUpLoading, error }] =
    useMutation(sign);
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);
  const [isFormValid, setIsFormValid] = useState(false);
  function disableButton() {
    setIsFormValid(false);
  }
  function enableButton() {
    setIsFormValid(true);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [deleteUser, { data: deleteData, loading: deleteLoading }] =
    useMutation(DELETE_USER_MUTATION);
  // const [del, { data: dat, loading: lod }] = useMutation(deleteMessagerie);
  const { data, loading } = useQuery(GET_CONSULTANTS_QUERY, {
    variables: { id: props?.user?.user?.company_id },
  });
  const [dats, setDats] = useState(data?.getAgenciesConsultants);

  useEffect(() => {
    setDats(data?.getAgenciesConsultants);
    console.log({ data: data?.getAgenciesConsultants });
  }, [data]);
  function handleDelete(id) {
    let d = [...dats];

    deleteUser({
      variables: { id: parseInt(id) },
    })
      .catch((err) => console.log({ err }))
      .then((r) => {
        if (r.data.deleteUser === 1) {
          d.splice(d.indexOf(id), 1);
          console.log({ d, dats });
          setDats(d);
        }
      });
  }
  function handleSubmit(input) {
    console.log({ input });
    if (input.password == input.password2)
      signUp({
        variables: {
          input: {
            email: input.email,
            firstName: input.fname,
            lastName: input.lname,
            password: input.password,
            gender: input.gender,
            role_id: 1,
            company_id: props?.user?.user?.company_id,
          },
        },
      })
        .catch((e) => {})
        .then((d) => {
          console.log({ d, dats });

          if (d) {
            createProfile({ variables: { input: { userId: d.data.signup } } });
            handleClose();
            let arrr = [...dats];
            arrr.push({
              _typename: "User",
              email: input.email,
              firstName: input.fname,
              lastName: input.lname,
              password: input.password,
              gender: input.gender,
              companyId: props?.user?.user?.company_id,
              id: d.data.signup,
            });
            setDats(arrr);
          }
        });
  }

  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div
          className="dashboard-main-container mt-24 mt-lg-31"
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-15 mb-lg-23">
              <div className="row">
                <div className="col-xxxl-9 px-lg-13 px-6">
                  <h5 className="font-size-6 font-weight-semibold mb-11">
                    Update Agency's Consultants
                  </h5>
                  <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="pl-0  border-0 font-size-4 font-weight-normal"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="border-0 font-size-4 font-weight-normal"
                            >
                              Field
                            </th>

                            <th
                              scope="col"
                              className="border-0 font-size-4 font-weight-normal"
                            ></th>

                            <th
                              scope="col"
                              className="border-0 font-size-4 font-weight-normal"
                            >
                              <Fab
                                size="medium"
                                className={styles["add"]}
                                aria-label="add"
                                onClick={handleClickOpen}
                              >
                                <AddIcon className={styles["ad"]} />
                              </Fab>{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dats?.map((con) => (
                            <tr className="border border-color-2">
                              <th
                                scope="row"
                                className="pl-6 border-0 py-7 pr-0"
                              >
                                <Link href="/candidate-profile">
                                  <a className="media min-width-px-235 align-items-center">
                                    <div className="circle-36 mr-6">
                                      <img
                                        src={con.profileImage}
                                        alt=""
                                        className="w-100"
                                      />
                                    </div>
                                    <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                      {con.firstName} {con.lastName}
                                    </h4>
                                  </a>
                                </Link>
                              </th>
                              <td className="table-y-middle py-7 min-width-px-235 pr-0">
                                <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                                  {con?.profile?.fields[0]?.name}{" "}
                                </h3>
                              </td>

                              <td className="table-y-middle py-7 min-width-px-170 pr-0">
                                <div className="">
                                  <a
                                    href="/#"
                                    className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                                    // onClick={(e) => {
                                    //   e.preventDefault();
                                    //   gContext.toggleApplicationModal(msg);
                                    // }}
                                  >
                                    View Profile
                                  </a>
                                </div>
                              </td>

                              <td className="table-y-middle py-7 min-width-px-100 pr-0">
                                <div className="">
                                  <span
                                    onClick={() => handleDelete(con?.id)}
                                    className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                                  >
                                    Dismiss
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add consultant</DialogTitle>
          <DialogContent>
            <Formsy
              onSubmit={handleSubmit}
              onValid={enableButton}
              onInvalid={disableButton}
            >
              <div className="form-group">
                <label
                  htmlFor="fname"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  First name{" "}
                </label>
                <TextFieldFormsy
                  required
                  label="first name"
                  validations={{
                    isSpecialWords: true,
                  }}
                  validationErrors={{
                    isSpecialWords: "Error no special characters allowed",
                  }}
                  id="fname"
                  name="fname"
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="lname"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Last name{" "}
                </label>
                <TextFieldFormsy
                  required
                  label="last name"
                  validations={{
                    isSpecialWords: true,
                  }}
                  validationErrors={{
                    isSpecialWords: "Error no special characters allowed",
                  }}
                  id="lname"
                  name="lname"
                  fullWidth
                  variant="outlined"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="gender"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Gender{" "}
                </label>
                <SelectFormsy
                  required
                  fullWidth={true}
                  label="gender"
                  id="gender"
                  name="gender"
                  variant="outlined"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </SelectFormsy>
              </div>
              <div className="or-devider">
                <span className="font-size-3 line-height-reset ">
                  Authentication
                </span>
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
                  htmlFor="password"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Password
                </label>
                <div className="position-relative">
                  <PasswordFormsy
                    required
                    label="password"
                    id="password"
                    name="password"
                    fullWidth
                    variant="outlined"
                    validations={{
                      minLength: 5,
                      maxLength: 25,
                      matchRegexp:
                        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
                    }}
                    validationErrors={{
                      required: "Error password is required",
                      minLength:
                        "Error password should be atleast 5 characters long",
                      maxLength:
                        "Error password can't surpass 25 characters long",
                      matchRegexp:
                        "Error password has to have atleast one character one number and one special character",
                    }}
                  />
                </div>
                <div className="form-group">
                  <div className="position-relative mt-5">
                    <label
                      htmlFor="password2"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Confirm password
                    </label>
                    <PasswordFormsy
                      required
                      label="confirm password"
                      id="password2"
                      name="password2"
                      fullWidth
                      variant="outlined"
                      validations={{
                        minLength: 5,
                        maxLength: 25,
                        matchRegexp:
                          /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
                      }}
                      validationErrors={{
                        required: "Error password is required",
                        minLength:
                          "Error password should be atleast 5 characters long",
                        maxLength:
                          "Error password can't surpass 25 characters long",
                        matchRegexp:
                          "Error password has to have atleast one character one number and one special character",
                      }}
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
                  {signUpLoading ? <CircularProgress /> : <b>Create</b>}
                </Button>
              </div>
            </Formsy>
          </DialogContent>
        </Dialog>
      </PageWrapper>
    </>
  );
}
const mapStateToProps = createStructuredSelector({ user: selectAuth });
function mapDispatchToProps(dispatch) {
  return {
    updateUserProfilePicture: () => {
      return dispatch(updateUserProfilePicture());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardSettings);
