import React, { useRef, useState } from "react";
import Formsy from "formsy-react";
import { SelectFormsy, TextFieldFormsy } from "@fuse";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useTranslation } from "react-i18next";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { MenuItem } from "@material-ui/core";

const gQl = gql`
  mutation signup($data: UserInput!) {
    signup(data: $data)
  }
`;
const regist = gql`
  query getroles {
    roles(ids: []) {
      id
      name
    }
  }
`;
function JWTRegisterTab({ history }) {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const [signup, { loading }] = useMutation(gQl);
  const { data, error } = useQuery(regist);
  const [isFormValid, setIsFormValid] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(model) {
    const data = Object.assign({}, model);
    if (data["password-confirm"]) delete data["password-confirm"];
    signup({ variables: { data } })
      .then(() => {
        setSuccess(true);
        setTimeout(() => history.push("/login"), 10000);
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

  if (success) return <div className="w-full">{t("auth:success.signup")}</div>;

  return (
    <div className="w-full">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={() => setIsFormValid(true)}
        onInvalid={() => setIsFormValid(false)}
        ref={formRef}
        className="flex flex-col justify-center w-full"
      >
        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="firstName"
          label={t("user.first_name")}
          validations={{
            minLength: 4,
          }}
          validationErrors={{
            minLength: t("error.form.minLength", { N: 4 }),
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  person
                </Icon>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />

        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="lastName"
          label={t("user.last_name")}
          validations={{
            minLength: 4,
          }}
          validationErrors={{
            minLength: t("error.form.minLength", { N: 4 }),
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  person
                </Icon>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          required
        />

        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="email"
          label={t("email")}
          validations="isEmail"
          validationErrors={{
            isEmail: t("error.form.email"),
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
          type="password"
          name="password"
          label={t("password")}
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
          type="password"
          name="password-confirm"
          label={t("confirm_password")}
          validations="equalsField:password"
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

        <SelectFormsy
          variant="outlined"
          className="w-full mb-16"
          name="gender"
          label={t("Gender")}
          id="user-gender"
          required
        >
          <MenuItem value="Male">{t("user.Male")}</MenuItem>
          <MenuItem value="Female">{t("user.Female")}</MenuItem>
        </SelectFormsy>

        <SelectFormsy
          className="mb-16"
          variant="outlined"
          name="role"
          label={t("Role")}
          required
        >
          {data?.roles.map((item) => (
            <MenuItem value={item}>{item.name}</MenuItem>
          ))}
        </SelectFormsy>
        {success && (
          <div className="mb-16 w-full">
            <p>{t("auth:success:signup")}</p>
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16 normal-case"
          aria-label="signup"
          disabled={!isFormValid || loading || success}
          value="legacy"
        >
          {loading && <CircularProgress className="mr-16" size={15} />}
          {t("auth:signup")}
        </Button>
      </Formsy>
    </div>
  );
}

export default withRouter(JWTRegisterTab);
