import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "../../formsy";
import { PasswordFormsy } from "../../formsy";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { setUser } from "../../redux/user/userActions";
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
        company_id
        role {
          id
        }
      }
    }
  }
`;
const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalSignIn = (props) => {
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);
  function disableButton() {
    setIsFormValid(false);
  }
  const [login, { data, loading, error }] = useMutation(loginGql);
  function enableButton() {
    setIsFormValid(true);
  }
  function handleSubmit(model) {
    login({ variables: { login: model } })
      .catch((e) => {})
      .then((d) => {
        console.log(d);

        if (d) {
          props.setUser(d?.data?.login);
          console.log(d);
          gContext.setUserId(d?.data?.login?.user?.id);
          gContext.toggleSignInModal();
        }
      });
  }
  function handelChange() {
    enableButton();
    formRef.current.updateInputsWithError({
      email: null,
      password: null,
    });
  }

  const gContext = useContext(GlobalContext);

  const handleClose = () => {
    gContext.toggleSignInModal();
  };
  const handleSignUp = () => {
    handleClose();
    gContext.toggleSignUpModal();
  };

  if (!loading) {
    if (error) {
      <Alert severity="error">This is an error alert — check it out!</Alert>;
    }
  }

  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.signInModalVisible}
      onHide={gContext.toggleSignInModal}
    >
      <Modal.Body className="p-0">
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
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
                    Welcome Back
                  </h3>
                  <p className="mb-0 font-size-4 text-white">
                    Log in to continue your account and explore new consultants.
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
              {error ? (
                <Alert severity="error">Wrong password. Login failed </Alert>
              ) : (
                ""
              )}
              {data ? <Alert severity="success">Login successful </Alert> : ""}
              <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                <Formsy
                  onSubmit={handleSubmit}
                  onValid={enableButton}
                  onInvalid={disableButton}
                  onChange={handelChange}
                  ref={formRef}
                >
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
                        required: "Error E-mail required",
                        isEmail: "This is not a valid E-mail",
                      }}
                      id="email"
                      name="email"
                      fullWidth
                      variant="outlined"
                      placeholder="example@gmail.com"
                    />
                    {/* <input
                      type="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                      id="email"
                    /> */}
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
                        // disabled={loading}
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
                  </div>

                  <div className="form-group mb-8">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      id="login-button"
                      className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                      aria-label="login"
                      disabled={!isFormValid}
                      value="legacy"
                    >
                      Log in
                    </Button>
                  </div>
                  <p className="font-size-4 text-center heading-default-color">
                    Don’t have an account?{" "}
                    <a onClick={() => handleSignUp()} className="text-primary">
                      Create a free account
                    </a>
                  </p>
                </Formsy>
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

export default connect(null, mapDispatchToProps)(ModalSignIn);
