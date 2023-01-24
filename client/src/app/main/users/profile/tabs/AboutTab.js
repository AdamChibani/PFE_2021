import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FuseAnimateGroup, SelectFormsy } from "@fuse";
import { useSelector } from "react-redux";
import EditPasswordForm from "../forms/EditMyPassword";
import { useTranslation } from "react-i18next";
import Formsy from "formsy-react";
import TextFieldFormsy from "@fuse/components/formsy/TextFieldFormsy";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { update, getUser } from "app/services/graphql/users/user.service";
import store from "app/store";
import * as Actions from "app/store/actions";
import { updateUser as ReduxActionUpdateUser } from "app/auth/store/actions";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MenuItem } from "@material-ui/core";

// const GET_UserBy_Id = gql`
//   #   query getUserById($id: Int) {
//   #     getUserById(id: $id) {
//   #       id
//   #       email
//   #       firstName
//   #       lastName
//   #       gender
//   #     }
//   #   }
//   #
// `;
function AboutTab(props) {
  const { t } = useTranslation();

  const user = useSelector(({ auth }) => auth.user);
  const id = user.data.id;
  // const { loading, error, data } = useQuery(GET_UserBy_Id, {
  //   variables: { id },
  // });
  // user.data.gender = data?.getUserById.gender;

  return (
    <div className="md:flex max-w-2xl">
      <div className="flex flex-col flex-1 md:pr-32">
        <FuseAnimateGroup enter={{ animation: "transition.slideUpBigIn" }}>
          <ProfileCard id={id} user={user} />
        </FuseAnimateGroup>
      </div>
      <div className="flex flex-col md:w-320">
        <FuseAnimateGroup enter={{ animation: "transition.slideUpBigIn" }}>
          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  {t("edit_my_password")}
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <EditPasswordForm {...props} id={id} user={user} />
            </CardContent>
          </Card>
        </FuseAnimateGroup>
      </div>
    </div>
  );
}

function ProfileCard(props) {
  const { t } = useTranslation();
  const [edit, setEdition] = useState(false);
  const [validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, id } = props;
  const handleSubmit = (model) => {
    setLoading(true);
    update(model)
      .then((data) => {
        if (data === true) {
          store.dispatch(ReduxActionUpdateUser(model));
          store.dispatch(
            Actions.showMessage({
              message: t("success.update.profil"),
              autoHideDuration: 3000,
              variant: "success", //success error info warning null
            })
          );
          setLoading(false);
          setEdition(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        store.dispatch(
          Actions.showMessage({
            message: t("error.server"),
            autoHideDuration: 3000,
            variant: "error", //success error info warning null
          })
        );
      });
  };

  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };

  return (
    <Card className="w-full mb-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            {t("profil")}
          </Typography>
          <Button
            variant="contained"
            color="default"
            className="mx-auto mr-16"
            disableElevation
            id="user-profile-edit-button"
            disabled={edit}
            onClick={() => {
              setEdition(!edit);
            }}
          >
            {t("button.edit")}
          </Button>
        </Toolbar>
      </AppBar>

      <CardContent>
        <Formsy
          onValidSubmit={handleSubmit}
          onValid={enableButton}
          onInvalid={disableButton}
        >
          <TextFieldFormsy
            type="hidden"
            name="id"
            id="id"
            value={id ? id : null}
          />
          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("user.first_name")}
            </Typography>
            {edit ? (
              <TextFieldFormsy
                fullWidth
                type="text"
                name="firstName"
                id="user-profile-first-name-edit"
                value={user.data.firstName}
                disabled={loading}
                variant="outlined"
                required
              />
            ) : (
              <Typography id="user-profile-first-name">
                {user.data.firstName}
              </Typography>
            )}
          </div>

          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("user.last_name")}
            </Typography>
            {edit ? (
              <TextFieldFormsy
                fullWidth
                type="text"
                name="lastName"
                id="user-profile-last-name-edit"
                value={user.data.lastName}
                disabled={loading}
                variant="outlined"
                required
              />
            ) : (
              <Typography id="user-profile-last-name">
                {user.data.lastName}
              </Typography>
            )}
          </div>

          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("email")}
            </Typography>
            {edit ? (
              <TextFieldFormsy
                fullWidth
                type="email"
                name="email"
                id="user-profile-edit-email"
                value={user.data.email}
                disabled={loading}
                validations={{
                  isEmail: true,
                }}
                validationErrors={{
                  isEmail: t("error.form.email"),
                }}
                variant="outlined"
                required
              />
            ) : (
              <Typography id="user-profile-email">{user.data.email}</Typography>
            )}
          </div>
          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("user.gender")}
            </Typography>
            {edit ? (
              <SelectFormsy
                variant="outlined"
                className="w-full"
                name="gender"
                label=""
                id="user-profile-edit-gender"
                value={user.data.gender}
                disabled={loading}
                required
              >
                <MenuItem value="Male">{t("user.Male")}</MenuItem>
                <MenuItem value="Female">{t("user.Female")}</MenuItem>
              </SelectFormsy>
            ) : (
              <Typography id="user-profile-gender">
                {t("user." + user.data.gender)}
              </Typography>
            )}{" "}
          </div>

          {!!edit && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-224 mx-auto mt-16"
              aria-label="EDIT"
              id="user-profile-edit-password-button"
              disabled={!validation || loading}
              value="legacy"
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
          )}
        </Formsy>
      </CardContent>
    </Card>
  );
}
export default AboutTab;
