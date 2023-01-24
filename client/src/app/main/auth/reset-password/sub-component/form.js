import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const gQl = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, newpassword: $password)
  }
`;

function ResetPasswordForm({ history, location }) {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const [resetPassword, { loading }] = useMutation(gQl);
  const [isFormValid, setIsFormValid] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get the last part of the URL
  const pathParts = location.pathname.split("reset-password/");
  const token = pathParts[pathParts.length - 1];

  function handleSubmit(model) {
    const { token, password } = model;
    formRef.current.updateInputsWithError({ password: null });
    resetPassword({ variables: { token, password } })
      .then(({}) => {
        setSuccess(true);
        setTimeout(() => history.push("/login"), 5000);
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") console.log({ error });
        let errorCode;
        if (error.graphQLErrors && error.graphQLErrors[0])
          errorCode = error.graphQLErrors[0].extensions.code;
        formRef.current.updateInputsWithError({
          password: t([
            `auth:server_errors.${errorCode}`,
            "auth:error.unspecific",
          ]),
        });
      });
  }

  return (
    <Formsy
      onValidSubmit={handleSubmit}
      onValid={() => setIsFormValid(true)}
      onInvalid={() => setIsFormValid(false)}
      ref={formRef}
      className="flex flex-col justify-center w-full"
    >
      {success && (
        <div className="MuiFormControl-root MuiTextField-root mb-16 MuiFormControl-fullWidth">
          <p>{t("auth:success:reset_password")}</p>
        </div>
      )}
      <TextFieldFormsy
        className="mb-16"
        autoFocus
        fullWidth
        type="password"
        name="password"
        label={t("new_password")}
        id="reset-password-password"
        value=""
        disabled={success}
        validations={{
          minLength: 5,
          maxLength: 25,
          matchRegexp: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
        }}
        validationErrors={{
          minLength: t("error.form.minLength", { N: 5 }),
          maxLength: t("error.form.maxLength", { N: 25 }),
          matchRegexp: t("error.form.passwordReq"),
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon className="text-20" color="action">
                email
              </Icon>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        required
      />

      <TextFieldFormsy
        className="mb-16"
        autoFocus
        fullWidth
        type="password"
        name="password2"
        label={t("confirm_password")}
        id="reset-password-password2"
        value=""
        disabled={success}
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
                email
              </Icon>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        required
      />

      <TextFieldFormsy
        type="hidden"
        name="token"
        id="reset-password-token"
        value={token}
        validations={{
          minLength: 30,
        }}
        validationErrors={{
          minLength: "",
        }}
        variant="outlined"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        id="reset-password-button"
        className="w-224 mx-auto mt-16"
        aria-label="RESET"
        disabled={!isFormValid || loading || success}
        value="legacy"
      >
        {loading && <CircularProgress className="mr-16" size={15} />}
        {t("send")}
      </Button>
    </Formsy>
  );
}

export default ResetPasswordForm;
