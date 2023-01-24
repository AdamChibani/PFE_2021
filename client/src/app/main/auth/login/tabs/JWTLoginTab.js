import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import * as authActions from "app/auth/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import portalConfig from "app/configs/portalConfig";
import CircularProgress from "@material-ui/core/CircularProgress";

function JWTLoginTab(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);
  const loading = useSelector(({ auth }) => auth.login.loading);

  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const emailInput = useRef(null);

  useEffect(() => {
    if (login.error && (login.error.email || login.error.password)) {
      const error = {};
      if (login.error.email) error.email = t(login.error.email);
      if (login.error.password) error.password = t(login.error.password);
      formRef.current.updateInputsWithError({ ...error });
      disableButton();
    }
  }, [login.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(authActions.submitLogin(model));
  }

  // Reset error when changing any component of the form
  function handelChange() {
    enableButton();
    formRef.current.updateInputsWithError({
      email: null,
      password: null,
    });
  }

  /**
   * Trim all white space from the email input
   */
  function trimWhiteSpace(e) {
    emailInput.current.setValue(e.target.value.replace(/\s/g, ""));
  }

  const allowLBUN = portalConfig.allowLBUN; // Allow login by user name
  // Validation
  const emailValidation = {};
  if (!allowLBUN) {
    emailValidation.isEmail = false;
  }

  return (
    <div className="w-full">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        onChange={handelChange}
        ref={formRef}
        className="flex flex-col justify-center w-full"
      >
        <TextFieldFormsy
          className="mb-16"
          type={allowLBUN ? "texte" : "email"}
          name="email"
          label={t("email") + (allowLBUN ? " / " + t("username") : "")}
          id={"login-email" + (allowLBUN && "-username")}
          onChange={trimWhiteSpace}
          ref={emailInput} // important for the space trim
          validations={emailValidation}
          validationErrors={{
            isEmail: t("error.form.email"),
            required: t("error.form.required"),
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  {allowLBUN ? "person" : "email"}
                </Icon>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />

        <TextFieldFormsy
          className="mb-16"
          type="password"
          name="password"
          label={t("password")}
          id="login-password"
          value=""
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  vpn_key
                </Icon>
              </InputAdornment>
            ),
          }}
          validationErrors={{
            required: t("error.form.required"),
          }}
          variant="outlined"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          id="login-button"
          className="w-full mx-auto mt-16 normal-case"
          aria-label="login"
          disabled={!isFormValid || loading}
          value="legacy"
        >
          {loading && <CircularProgress className="mr-16" size={15} />}
          {t("login")}
        </Button>
      </Formsy>
    </div>
  );
}

export default JWTLoginTab;
