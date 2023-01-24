import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FuseAnimateGroup, SelectFormsy } from "@fuse";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Formsy from "formsy-react";
import TextFieldFormsy from "@fuse/components/formsy/TextFieldFormsy";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as Actions from "app/store/actions";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Icon,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
const getCountries = gql`
  query getAll {
    getAllCountries {
      id
      name
      continent
    }
  }
`;
const getPrefByUser = gql`
  query getPref($consultantID: Int!) {
    getAllPreferencesByConsultant(consultantID: $consultantID) {
      id
      name
      countries {
        id
        name
        continent
      }
      status
    }
  }
`;
const updateLink = gql`
  mutation updateLink($dat: linkInput!) {
    updateLinks(input: $dat)
  }
`;
const updatePref = gql`
  mutation updatePred($input: PreferenceUpdate) {
    updatePreference(input: $input) {
      id
      name
      countries {
        id
        name
        continent
      }
      status
    }
  }
`;
const getByName = gql`
  query getbyname($name: String!) {
    getCountryByName(name: $name) {
      id
      name
      continent
    }
  }
`;
// const updateDip = gql`
//   mutation updateDip($input: DiplomaUpdate!) {
//     updateDiploma(input: $input) {
//       id
//       diploma
//     }
//   }
// `;
// const updateMaj = gql`
//   mutation update($input: MajorUpdate!) {
//     updateMajor(input: $input) {
//       id
//       type
//       major
//     }
//   }
// `;
function PreferenceTab() {
  const { t } = useTranslation();

  const user = useSelector(({ auth }) => auth.user);
  const id = user.data.id;

  const { loading, error, data } = useQuery(getPrefByUser, {
    variables: { consultantID: 1 },
  });

  const profile = data;
  // console.log(profile);

  return (
    <div className="max-w-full">
      <div className="flex flex-col flex-1 md:pr-32">
        <FuseAnimateGroup enter={{ animation: "transition.slideUpBigIn" }}>
          {profile?.getAllPreferencesByConsultant.map((pref, i) => (
            <ProfileCard key={i} id={id} user={user} pref={pref} />
          ))}
        </FuseAnimateGroup>
      </div>
      <div className="flex flex-col md:w-320"></div>
    </div>
  );
}

function ProfileCard(props) {
  const dispatch = useDispatch();
  const [getCount, { data: da }] = useLazyQuery(getByName);
  const { data } = useQuery(getCountries);
  const counts = data?.getAllCountries;
  // console.log(counts);
  const [update] = useMutation(updatePref);
  const [update2] = useMutation(updateLink);
  const { t } = useTranslation();
  const [edit, setEdition] = useState(false);

  const [validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  // const { i, pref } = props;
  const [pref, setPref] = useState(props.pref);
  const [err, setErr] = useState(false);

  useEffect(() => {
    console.log({ pref });
  }, [pref]);
  // console.log({ preeeeeeeef: pref });
  useEffect(() => {
    console.log(da?.getCountryByName);
    console.log({ da });
  }, [da]);
  function getCountryByName(name) {
    console.log(name);
    let i;
    for (i = 0; i < data.getAllCountries.length; i++) {
      console.log({ data: data.getAllCountries[i].name, name });
      if (data.getAllCountries[i].name === name) {
        break;
      }
    }
    console.log({ test: data.getAllCountries[i], i });
    return data.getAllCountries[i];
  }
  const handleSubmit = (input) => {
    setLoading(true);
    // console.log({ input });
    update({ variables: { input } })
      .then((data) => {
        if (data) {
          data.data.updatePreference.countries.forEach((count, i) => {
            update2({
              variables: {
                dat: {
                  countryId: parseInt(count.id),
                  preferenceId: input.id,
                  newCountry: input.country[i],
                },
              },
            }).catch((e) => {
              setLoading(false);
              setErr(true);
              dispatch(
                Actions.showMessage({
                  message: t("error.server"),
                  autoHideDuration: 3000,
                  variant: "error",
                })
              );
            });
          });
          var countries = input.country;
          input.country.forEach((c, i) => {
            countries[i] = getCountryByName(c);
          });

          setPref({ ...pref, ...data.data.updatePreference, countries });
          dispatch(
            Actions.showMessage({
              message: t("success.update.preference"),
              autoHideDuration: 3000,
              variant: "success", //success error info warning null
            })
          );
          console.log(err);

          setLoading(false);
          setEdition(err);
        }
      })
      .catch((e) => {
        setLoading(false);
        dispatch(
          Actions.showMessage({
            message: t("error.server"),
            autoHideDuration: 3000,
            variant: "error", //success error info warning null
          })
        );
      });
  };
  //   const handleSubmit2 = (input) => {
  //     setLoading(true);
  //     console.log(input);
  //     update2({ variables: { input } })
  //       .then((data) => {
  //         if (data) {
  //           console.log(pref.majors.type);
  //           pref.majors = data.data.updateMajor;
  //           console.log(data.data.updateMajor);
  //           console.log(pref.majors);
  //           dispatch(
  //             Actions.showMessage({
  //               message: t("success.update.preference"),
  //               autoHideDuration: 3000,
  //               variant: "success", //success error info warning null
  //             })
  //           );
  //           setLoading(false);
  //           setEdition2(false);
  //         }
  //       })
  //       .catch((e) => {
  //         setLoading(false);
  //         dispatch(
  //           Actions.showMessage({
  //             message: t("error.server"),
  //             autoHideDuration: 3000,
  //             variant: "error", //success error info warning null
  //           })
  //         );
  //       });
  //   };

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
            value={pref.id ? pref.id : null}
          />
          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("preference.contract-type")}
            </Typography>
            {edit ? (
              <TextFieldFormsy
                fullWidth
                type="text"
                name="name"
                id="contract-type-edit"
                value={pref.name}
                disabled={loading}
                variant="outlined"
                required
              />
            ) : (
              <Typography id="contract-type">{pref.name}</Typography>
            )}
          </div>

          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("preference.status")}
            </Typography>
            {edit ? (
              <SelectFormsy
                variant="outlined"
                className="w-full"
                name="status"
                label=""
                id="user-profile-edit-major-type"
                value={pref.status}
                disabled={loading}
                required
              >
                <MenuItem value="Looking">{t("preference.Looking")}</MenuItem>
                <MenuItem value="Open">{t("preference.Open")}</MenuItem>
                <MenuItem value="Satisfied">
                  {t("preference.Satisfied")}
                </MenuItem>
              </SelectFormsy>
            ) : (
              <Typography id="status">
                {t("preference." + pref.status)}
              </Typography>
            )}
          </div>
          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("preference.countries")}
            </Typography>
            {edit ? (
              pref.countries.map((count, i) => (
                <ListItem key={i}>
                  <SelectFormsy
                    variant="outlined"
                    className="w-full"
                    key={i}
                    name={`country[${i}]`}
                    label=""
                    id="user-profile-edit-major-type"
                    value={count?.name}
                    disabled={loading}
                    required
                  >
                    {counts.map((c, k) => (
                      <MenuItem key={(i, k)} value={c.name}>
                        {t("country." + c.name)}
                      </MenuItem>
                    ))}
                  </SelectFormsy>
                  <Icon className="list-item-icon text-16" color="action" />
                </ListItem>
              ))
            ) : (
              <List>
                {pref.countries.map((count, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={t("country." + count?.name)}
                      secondary={t("country." + count?.continent)}
                    />
                  </ListItem>
                ))}
              </List>
            )}
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
export default PreferenceTab;
