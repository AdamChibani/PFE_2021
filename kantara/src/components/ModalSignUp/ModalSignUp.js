import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import Formsy from "formsy-react";
import { SelectFormsy, TextFieldFormsy } from "../../formsy";
import { PasswordFormsy } from "../../formsy";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { setUser } from "../../redux/user/userActions";
import { Nav, Tab } from "react-bootstrap";
import Agency from "./component/agency";
const sign = gql`
  mutation signup($input: UserInput) {
    signup(data: $input)
  }
`;
const loginGql = gql`
  mutation login($login: LoginInput) {
    login(input: $login) {
      token
      user {
        id
        email
        firstName
        lastName
        profileImage
      }
    }
  }
`;
const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;
// { id: 1, name: "Consultant" }
const ModalSignUp = (props) => {
  const gContext = useContext(GlobalContext);

  const [login, { data: log, loading: lod, error: errr }] =
    useMutation(loginGql);
  const [activeTab, setActiveTab] = useState("one");
  const handleChangeTab = (value) => {
    console.log({ value });
    setActiveTab(value);
  };
  const [signUp, { data, loading, error }] = useMutation(sign);
  const [profileType, setProfileType] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  function disableButton() {
    setIsFormValid(false);
  }
  function enableButton() {
    setIsFormValid(true);
  }
  const [userD, setUserD] = useState();
  function handleSubmit(input) {
    console.log({ input });
    signUp({
      variables: {
        input: {
          email: input.email,
          firstName: input.fname,
          lastName: input.lname,
          password: input.password,
          gender: input.gender,
        },
      },
    })
      .catch((e) => {})
      .then((d) => {
        console.log(d);

        if (d) {
          login({
            variables: {
              login: { email: input.email, password: input.password },
            },
          })
            .catch((e) => {})
            .then((d) => {
              console.log(d);

              if (d) {
                setUserD(d?.data?.login);
              }
            });
          console.log({ activeTab });
          if (activeTab === "one") setActiveTab("two");
          else handleClose();
          console.log({ activeTab });
          // gContext.toggleSignUpModal();
        }
      });
  }

  const handleClose = () => {
    setProfileType();
    setActiveTab("one");
    gContext.toggleSignUpModal();
  };

  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.signUpModalVisible}
      onHide={gContext.toggleSignUpModal}
    >
      <Modal.Body className="p-0">
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="login-modal-main bg-white rounded-8 overflow-hidden">
          <div className="row no-gutters">
            <div className="col-lg-5 col-md-6">
              <div className="pt-10 pb-6 pl-11 pr-12 bg-black-2 h-100 d-flex flex-column dark-mode-texts">
                <div className="pb-9">
                  <h3 className="font-size-8 text-white line-height-reset pb-4 line-height-1p4">
                    Create a free account today
                  </h3>
                  <p className="mb-0 font-size-4 text-white">
                    Create your account to continue and explore new consultants.
                  </p>
                </div>
                <div className="border-top border-default-color-2 mt-auto">
                  <div className="d-flex mx-n9 pt-6 flex-xs-row flex-column">
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">295</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        New consultants joined today
                      </p>
                    </div>
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">14</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        New enterprises registered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                <Tab.Container id="left-tabs-example" activeKey={activeTab}>
                  <div className="bg-white rounded-4 shadow-9">
                    {/* <!-- Tab Section Start --> */}
                    <Nav
                      className="nav border-bottom border-mercury pl-12"
                      role="tablist"
                    >
                      <li className="tab-menu-items nav-item pr-12">
                        <Nav.Link
                          disabled={activeTab != "one"}
                          eventKey="one"
                          className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                        >
                          Personal info
                        </Nav.Link>
                      </li>
                      <li className="tab-menu-items nav-item pr-12">
                        <Nav.Link
                          disabled={activeTab != "two"}
                          eventKey="two"
                          className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                        >
                          Company info
                        </Nav.Link>
                      </li>
                    </Nav>
                    {/* <!-- Tab Content --> */}
                    <Tab.Content>
                      <Tab.Pane eventKey="one">
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
                                isSpecialWords:
                                  "Error no special characters allowed",
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
                                isSpecialWords:
                                  "Error no special characters allowed",
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
                              <b>Sign up</b>
                            </Button>
                          </div>
                        </Formsy>
                      </Tab.Pane>
                      <Tab.Pane eventKey="two">
                        {!profileType ? (
                          <div className="d-flex flex-column align-items-between">
                            <Button
                              color="primary"
                              variant="contained"
                              fullWidth
                              className="my-10 btn btn-primary btn-medium w-100 rounded-5 text-uppercase w-20"
                              onClick={() => setProfileType("agency")}
                            >
                              <b>Consulting agency</b>
                            </Button>{" "}
                            <Button
                              color="secondary"
                              variant="contained"
                              fullWidth
                              className="my-10  btn btn-primary btn-medium w-100 rounded-5 text-uppercase w-20"
                              onClick={() => setProfileType("Enterprise")}
                            >
                              <b>Enterprise</b>
                            </Button>
                          </div>
                        ) : (
                          <Agency
                            isAgency={profileType === "agency" ? 1 : 0}
                            handler={handleChangeTab}
                            userD={userD}
                          />
                        )}
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => {
      return dispatch(setUser(user));
    },
  };
}

export default connect(null, mapDispatchToProps)(ModalSignUp);
