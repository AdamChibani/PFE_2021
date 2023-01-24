import { connect } from "react-redux";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "../../formsy";
import { PasswordFormsy } from "../../formsy";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Alert from "@material-ui/lab/Alert";
import React, { useContext, useRef, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { createStructuredSelector } from "reselect";
import selectAuth from "../../redux/user/userSelector";

const UPDATE_PASSWORD_MUTATION = gql`
  mutation pass(
    $oldpassword: String!
    $newpassword: String!
    $newpassword2: String!
    $user: UserMDP
  ) {
    updateMyPassword(
      oldpassword: $oldpassword
      newpassword: $newpassword
      newpassword2: $newpassword2
      user: $user
    )
  }
`;
function changeAuth(props) {
  console.log(props);
  const [updatePass, { loading }] = useMutation(UPDATE_PASSWORD_MUTATION);
  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);
  function disableButton() {
    setIsFormValid(false);
  }
  function enableButton() {
    setIsFormValid(true);
  }
  function handelChange() {
    enableButton();
    formRef.current.updateInputsWithError({
      email: null,
      oldpassword: null,
      newpassword: null,
      newpassword2: null,
    });
  }
  function handleSubmit(model) {
    model.user = { id: props.user.user.id, email: model.email };
    updatePass({ variables: model });
  }
  return (
    <section className="mx-auto w-50 mt-22">
      <div className="container p-4 position-relative bg-white rounded-8 ">
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          onClick={() => props.auth()}
        >
          <i className="fas fa-times"></i>
        </button>

        <Formsy
          onSubmit={handleSubmit}
          onValid={enableButton}
          onInvalid={disableButton}
          onChange={handelChange}
          ref={formRef}
          // className="bg-white "
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
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              Old Password
            </label>
            <div className="position-relative">
              <PasswordFormsy
                required
                // disabled={loading}
                label="password"
                id="password"
                name="oldpassword"
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
                  maxLength: "Error password can't surpass 25 characters long",
                  matchRegexp:
                    "Error password has to have atleast one character one number and one special character",
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              New Password
            </label>
            <div className="position-relative">
              <PasswordFormsy
                required
                // disabled={loading}
                label="New password"
                id="Newpassword"
                name="newpassword"
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
                  maxLength: "Error password can't surpass 25 characters long",
                  matchRegexp:
                    "Error password has to have atleast one character one number and one special character",
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              Confirm New Password
            </label>
            <div className="position-relative">
              <PasswordFormsy
                required
                // disabled={loading}
                label="Confirm password"
                id="Confirmnewpassword"
                name="newpassword2"
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
                  maxLength: "Error password can't surpass 25 characters long",
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
              id="update-button"
              className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
              aria-label="update"
              disabled={!isFormValid}
              value="legacy"
            >
              Update
            </Button>
          </div>
        </Formsy>
      </div>
    </section>
  );
}
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(changeAuth);
