import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const gQl = gql`
  mutation forgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

function ForgetPasswordForm() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [forgetPassword, { loading }] = useMutation(gQl);
  const [isFormValid, setIsFormValid] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = ({ email }) => {
    if (!email) return false;
    forgetPassword({ variables: { email } })
      .then(({ data }) => {
        setSuccess(data.forgetPassword);
        setTimeout(() => setSuccess(false), 5000);
        formRef.current.updateInputsWithError({ email: null });
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") console.log({ error });
        let errorCode;
        if (error && error.graphQLErrors)
          errorCode = error.graphQLErrors[0].extensions.code;
        formRef.current.updateInputsWithError({
          email: t([
            `auth:server_errors.${errorCode}`,
            "auth:error.unspecific",
          ]),
        });
      });
  };

  return (
    <Formsy
      onValidSubmit={handleSubmit}
      onValid={() => setIsFormValid(true)}
      onInvalid={() => setIsFormValid(false)}
      ref={formRef}
      className="flex flex-col justify-center w-full"
    >
      {success && (
        <p className="mt-16 mb-32" id="forgot-password-success-message">
          {t("auth:success.forgot_password_request")}.
        </p>
      )}
      <TextFieldFormsy
        className="mb-16"
        autoFocus
        fullWidth
        type="email"
        name="email"
        label={t("email")}
        id="forgot-password-email"
        value=""
        disabled={success}
        validations={{
          isEmail: true,
        }}
        validationErrors={{
          isEmail: t("error.form.email"),
          required: t("error.form.required"),
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        id="forgot-password-button"
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

export default ForgetPasswordForm;
