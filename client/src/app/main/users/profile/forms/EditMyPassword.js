import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import TextFieldFormsy from "@fuse/components/formsy/TextFieldFormsy";
import Formsy from "formsy-react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updatePassword } from "app/services/graphql/users/user.service";
import * as MainActions from "app/store/actions";

function EditPasswordForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function showMessage(variant, message) {
    dispatch(
      MainActions.showMessage({
        message,
        translate: false,
        variant, // success error info warning null
      })
    );
  }

  function handleSubmit(model) {
    const form = formRef.current;
    setLoading(true);
    updatePassword(model)
      .then((data) => {
        if (data === true) {
          form.reset();
          showMessage("success", t("password_changed.success"));
        }
      })
      .catch((error) => {
        let message = t("error.generic");
        if (error)
          switch (error) {
            case "PASSWORDS_NOT_OK":
              message = t("error.form.wrong_passwords");
              form.updateInputsWithError({
                password: message,
                password2: message,
              });
              break;
            case "OLD_PASSWORD_NOT_OK":
              message = t("error.form.bad_password");
              form.updateInputsWithError({
                oldpassword: message,
              });
              break;
            default:
              form.updateInputsWithError({
                oldpassword: message,
              });
              break;
          }
        showMessage("error", message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const passwordValidation = {
    validations: {
      minLength: 5,
    },
    errors: {
      minLength: t("error.form.minLength", { N: 5 }),
    },
  };

  return (
    <Formsy
      onValidSubmit={handleSubmit}
      onValid={enableButton}
      onInvalid={disableButton}
      ref={formRef}
      className="flex flex-col justify-center w-full"
    >
      <TextFieldFormsy
        className="mb-16"
        autoFocus
        fullWidth
        type="password"
        name="oldpassword"
        label={t("current_password")}
        id="user-profile-edit-password-oldpassword"
        value=""
        validations={passwordValidation.validations}
        validationErrors={passwordValidation.errors}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon className="text-20" color="action">
                vpn_key
              </Icon>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        required
      />

      <TextFieldFormsy
        className="mb-16"
        fullWidth
        type="password"
        name="password"
        label={t("new_password")}
        id="user-profile-edit-password-password"
        value=""
        validations={{
          ...passwordValidation.validations,
          maxLength: 25,
          matchRegexp: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+/,
        }}
        validationErrors={{
          ...passwordValidation.errors,
          maxLength: t("error.form.maxLength", { N: 25 }),
          matchRegexp: t("error.form.passwordReq"),
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon className="text-20" color="action">
                vpn_key
              </Icon>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        required
      />

      <TextFieldFormsy
        className="mb-16"
        fullWidth
        type="password"
        name="password2"
        label={t("confirm_password")}
        id="user-profile-edit-password-password2"
        value=""
        validations={{
          equalsField: "password",
        }}
        validationErrors={{
          equalsField: t("error.form.passwordEquals"),
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon className="text-20" color="action">
                vpn_key
              </Icon>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="w-224 mx-auto mt-16"
        aria-label="EDIT"
        id="user-profile-edit-password-button"
        disabled={!isFormValid || loading}
      >
        {loading ? (
          <CircularProgress
            style={{
              width: "25px",
              height: "25px",
            }}
          />
        ) : (
          t("save")
        )}
      </Button>
    </Formsy>
  );
}

export default EditPasswordForm;
