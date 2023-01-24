import React, { useState } from "react";
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
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MenuItem } from "@material-ui/core";
import DatePickerFormsy from "@catu/components/DatePickerFormsy";
import DateFormatter from "@catu/components/DateFormatter";
const GET_ProfileBy_User = gql`
  query getEducations($consultantId: Int!) {
    getAllEducationsByConsultant(consultantId: $consultantId) {
      id
      majors {
        id
        type
        major
      }
      diplomas {
        id
        diploma
      }
      specialty
      startDate
      endDate
      university
    }
  }
`;
const updateEdu = gql`
  mutation update($input: EducationUpdate!) {
    updateEducation(input: $input) {
      id
      specialty
      startDate
      endDate
      university
    }
  }
`;
const updateDip = gql`
  mutation updateDip($input: DiplomaUpdate!) {
    updateDiploma(input: $input) {
      id
      diploma
    }
  }
`;
const updateMaj = gql`
  mutation update($input: MajorUpdate!) {
    updateMajor(input: $input) {
      id
      type
      major
    }
  }
`;
function ProfileTab() {
  const { t } = useTranslation();

  const user = useSelector(({ auth }) => auth.user);
  const id = user.data.id;

  const { loading, error, data } = useQuery(GET_ProfileBy_User, {
    variables: { consultantId: 1 },
  });
  const profile = data;
  console.log(profile);

  return (
    <div className="max-w-full">
      <div className="flex flex-col flex-1 md:pr-32">
        <FuseAnimateGroup enter={{ animation: "transition.slideUpBigIn" }}>
          {profile?.getAllEducationsByConsultant.map((edu, i) => (
            <ProfileCard key={i} id={id} user={user} edu={edu} />
          ))}
        </FuseAnimateGroup>
      </div>
      <div className="flex flex-col md:w-320"></div>
    </div>
  );
}

function ProfileCard(props) {
  const dispatch = useDispatch();

  const [update] = useMutation(updateEdu);
  const [update2] = useMutation(updateMaj);
  const [update3] = useMutation(updateDip);
  const { t } = useTranslation();
  const [edit, setEdition] = useState(false);
  const [edit2, setEdition2] = useState(false);
  const [edit3, setEdition3] = useState(false);
  const [validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  // const { i, edu } = props;
  const [edu, setEdu] = useState(props.edu);
  const handleSubmit = (input) => {
    setLoading(true);
    update({ variables: { input } })
      .then((data) => {
        if (data) {
          setEdu({ ...edu, ...data.data.updateEducation });

          dispatch(
            Actions.showMessage({
              message: t("success.update.education"),
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
        dispatch(
          Actions.showMessage({
            message: t("error.server"),
            autoHideDuration: 3000,
            variant: "error", //success error info warning null
          })
        );
      });
  };
  const handleSubmit2 = (input) => {
    setLoading(true);
    console.log(input);
    update2({ variables: { input } })
      .then((data) => {
        if (data) {
          console.log(edu.majors.type);
          edu.majors = data.data.updateMajor;
          console.log(data.data.updateMajor);
          console.log(edu.majors);
          dispatch(
            Actions.showMessage({
              message: t("success.update.education"),
              autoHideDuration: 3000,
              variant: "success", //success error info warning null
            })
          );
          setLoading(false);
          setEdition2(false);
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

  const handleSubmit3 = (input) => {
    setLoading(true);
    console.log(input);
    update3({ variables: { input } })
      .then((data) => {
        if (data) {
          edu.diplomas = data.data.updateDiploma;
          dispatch(
            Actions.showMessage({
              message: t("success.update.education"),
              autoHideDuration: 3000,
              variant: "success", //success error info warning null
            })
          );
          setLoading(false);
          setEdition3(false);
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
            value={edu.id ? edu.id : null}
          />
          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("education.specialty")}
            </Typography>
            {edit ? (
              <TextFieldFormsy
                fullWidth
                type="text"
                name="specialty"
                id="specialty-edit"
                value={edu.specialty}
                disabled={loading}
                variant="outlined"
                required
              />
            ) : (
              <Typography id="specialty">{edu.specialty}</Typography>
            )}
          </div>

          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("education.university")}
            </Typography>
            {edit ? (
              <TextFieldFormsy
                fullWidth
                type="text"
                name="university"
                id="university-edit"
                value={edu.university}
                disabled={loading}
                variant="outlined"
                required
              />
            ) : (
              <Typography id="university">{edu.university}</Typography>
            )}
          </div>

          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("education.startDate")}
            </Typography>
            {edit ? (
              <DatePickerFormsy
                fullWidth
                name="startDate"
                id="start-date-edit"
                value={edu.startDate}
                disabled={loading}
                variant="outlined"
                required
              />
            ) : (
              <DateFormatter
                id="start-date"
                date={edu.startDate}
              ></DateFormatter>
            )}
          </div>

          <div className="mb-16">
            <Typography className="font-bold mb-4 text-15">
              {t("education.endDate")}
            </Typography>
            {edit ? (
              <DatePickerFormsy
                fullWidth
                name="endDate"
                id="end-date-edit"
                value={edu.endDate}
                disabled={loading}
                variant="outlined"
                required
              />
            ) : (
              <DateFormatter id="end-date" date={edu.endDate}></DateFormatter>
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
      <div className="flex flex-row justify-around">
        <Card className="w-2/4 mx-5">
          <AppBar position="static" elevation={0}>
            <Toolbar className="pl-16 pr-8">
              <Typography
                variant="subtitle1"
                color="inherit"
                className="flex-1"
              >
                {t("education.major")}
              </Typography>
              <Button
                variant="contained"
                color="default"
                className="mx-auto mr-16"
                disableElevation
                id="user-major-edit-button"
                disabled={edit2}
                onClick={() => {
                  setEdition2(!edit2);
                }}
              >
                {t("button.edit")}
              </Button>
            </Toolbar>
          </AppBar>
          <CardContent>
            <Formsy
              onValidSubmit={handleSubmit2}
              onValid={enableButton}
              onInvalid={disableButton}
              className="flex flex-col justify-center w-full"
            >
              <TextFieldFormsy
                type="hidden"
                name="id"
                id="id"
                value={edu.majors.id ? parseInt(edu.majors.id) : null}
              />
              <div className="mb-16">
                <Typography className="font-bold mb-4 text-15">
                  {t("education.majorType")}
                </Typography>
                {edit2 ? (
                  <SelectFormsy
                    variant="outlined"
                    className="w-full"
                    name="type"
                    label=""
                    id="user-profile-edit-major-type"
                    value={edu.majors.type}
                    disabled={loading}
                    required
                  >
                    <MenuItem value="BolognaProcess">
                      {t("education.BolognaProcess")}
                    </MenuItem>
                    <MenuItem value="US">{t("education.US")}</MenuItem>
                  </SelectFormsy>
                ) : (
                  <Typography id="user-education-major-type">
                    {t("education." + edu.majors.type)}
                  </Typography>
                )}{" "}
              </div>

              <div className="mb-16">
                <Typography className="font-bold mb-4 text-15">
                  {t("education.major")}
                </Typography>
                {edit2 ? (
                  <TextFieldFormsy
                    fullWidth
                    type="major"
                    name="major"
                    id="user-profile-edit-major"
                    value={edu.majors.major}
                    disabled={loading}
                    variant="outlined"
                    required
                  />
                ) : (
                  <Typography id="user-profile-major">
                    {edu.majors.major}
                  </Typography>
                )}
              </div>
              {!!edit2 && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="EDIT"
                  id="user-profile-edit-password-button"
                  disabled={loading}
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
        <Card className="w-2/4 mx-5">
          <AppBar position="static" elevation={0}>
            <Toolbar className="pl-16 pr-8">
              <Typography
                variant="subtitle1"
                color="inherit"
                className="flex-1"
              >
                {t("education.diploma")}
              </Typography>
              <Button
                variant="contained"
                color="default"
                className="mx-auto mr-16"
                disableElevation
                id="user-diploma-edit-button"
                disabled={edit3}
                onClick={() => {
                  setEdition3(!edit3);
                }}
              >
                {t("button.edit")}
              </Button>
            </Toolbar>
          </AppBar>
          <CardContent>
            <Formsy
              onValidSubmit={handleSubmit3}
              onValid={enableButton}
              onInvalid={disableButton}
              className="flex flex-col justify-center w-full"
            >
              <TextFieldFormsy
                type="hidden"
                name="id"
                id="id"
                value={edu.diplomas.id ? parseInt(edu.diplomas.id) : null}
              />
              <div className="mb-16">
                <Typography className="font-bold mb-4 text-15">
                  {t("education.diploma")}
                </Typography>
                {edit3 ? (
                  <TextFieldFormsy
                    fullWidth
                    type="diploma"
                    name="diploma"
                    id="user-profile-edit-diploma"
                    value={edu.diplomas.diploma}
                    disabled={loading}
                    variant="outlined"
                    required
                  />
                ) : (
                  <Typography id="user-profile-diploma">
                    {edu.diplomas.diploma}
                  </Typography>
                )}
              </div>
              {!!edit3 && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="EDIT"
                  id="user-profile-edit-diploma-button"
                  disabled={loading}
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
      </div>
    </Card>
  );
}
export default ProfileTab;
