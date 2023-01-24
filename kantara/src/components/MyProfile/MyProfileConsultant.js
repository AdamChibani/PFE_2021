import styles from "./my_profile.module.css";
import selectAuth from "../../redux/user/userSelector";
import CreateIcon from "@material-ui/icons/Create";
import Link from "next/link";
import imgL from "../../assets/image/svg/icon-loaction-pin-black.svg";
import Rate from "../Rate/Rate";
import Formsy from "formsy-react";
import {
  TextFieldFormsy,
  DatePickerFormsy,
  ReactSelectMulti,
} from "../../formsy";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useContext, useState } from "react";
import { Button, IconButton, makeStyles } from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import Field from "./components/field/field";
import ProfileContext from "./components/context/ProfileContext";
// const delField = gql`
//   mutation del($id: Int!) {
//     deleteField(id: $id)
//   }
// `;
// const uField = gql`
//   mutation updateField($id: Int, $name: String, $specialty: String, $pId: Int) {
//     updateField(id: $id, name: $name, specialty: $specialty, pId: $pId) {
//       id
//       name
//       specialty
//     }
//   }
// `;
const uCertifications = gql`
  mutation updateCertification($input: certificationUpdateInput) {
    updateCertification(input: $input) {
      id
      name
      category
      instution
      date
      duration
      level
    }
  }
`;

const getCountries = gql`
  query getAll {
    getAllCountries {
      id
      name
    }
  }
`;

const uPreference = gql`
  mutation updatePreference($input: PreferenceUpdate) {
    updatePreference(input: $input) {
      id
      name
      countries {
        id
        name
      }
      status
    }
  }
`;
const uLanguage = gql`
  mutation updateLanguage($input: LanguageUpdate) {
    updateLanguage(input: $input) {
      id
      language
      read
      write
      speak
      comprehend
    }
  }
`;
const uWorkExperience = gql`
  mutation updateExperience($input: ExperienceUpdateInput) {
    updateExperience(input: $input) {
      id
      jobTitle
      description
      startDate
      endDate
      employer
      company
      poFirstName
      poLastName
      poEmail
      poPhoneNumber
      poPosition
    }
  }
`;
const uEducation = gql`
  mutation updateEdu(
    $input1: EducationUpdate
    $input3: DiplomaUpdate
    $input2: MajorUpdate
  ) {
    updateMajor(input: $input2) {
      id
      type
      major
    }
    updateDiploma(input: $input3) {
      id
      diploma
    }
    updateEducation(input: $input1) {
      id
      startDate
      endDate
      university
      majors {
        id
        type
        major
      }
      diplomas {
        id
        diploma
      }
    }
  }
`;

const gPdf = gql`
  mutation cv($id: Int!) {
    getPDF(id: $id)
  }
`;
const MyProfileConsultant = (props) => {
  const pContext = useContext(ProfileContext);
  // const [updateField] = useMutation(uField);
  // const [deleteField, { loading: delFieldLoading }] = useMutation(delField);
  // const [global, setglobal] = useState(initialState)
  // const [updateSkill] = useMutation(uSkill);
  const [updatePreference] = useMutation(uPreference);
  const [updateLanguage] = useMutation(uLanguage);
  const [updateCertification] = useMutation(uCertifications);
  const [updateWorkExperience] = useMutation(uWorkExperience);
  const [updateEducation] = useMutation(uEducation);
  // const handleDeleteField = (id, i) => {
  //   setLoading(true);
  //   deleteField({ variables: { id } }).then((data) => {
  //     if (data.data.deleteField) {
  //       let arr = [...fields];
  //       arr.splice(i, 1);
  //       setFields(arr);
  //       arr = [...field];
  //       arr.splice(i, 1);
  //       setField(arr);
  //     }
  //     setLoading(false);
  //   });
  // };
  const handleSubmitCertification = (inputs) => {
    setLoading(true);
    inputs?.id.forEach((c, i) => {
      updateCertification({
        variables: {
          input: {
            id: parseInt(inputs.id[i]),
            category: inputs.category[i],
            duration: inputs.duration[i],
            date: inputs.date[i],
            instution: inputs.instution[i],
            name: inputs.name[i],
          },
        },
      })
        .then((data) => {
          if (data) {
            setLoading(false);

            setEditCert(false);
          }
        })
        .catch((e) => {
          setLoading(false);
        });
    });
  };
  const handleSubmitEducation = (inputs) => {
    setLoading(true);
    inputs?.diplomaId.forEach((d, i) => {
      updateEducation({
        variables: {
          input1: {
            id: parseInt(inputs.educationId[i]),
            specialty: "",
            startDate: inputs.startDate[i],
            endDate: inputs.endDate[i],
            university: inputs.university[i],
          },
          input3: {
            id: parseInt(inputs.diplomaId[i]),
            diploma: inputs.diplomas.diploma[i],
          },
          input2: {
            id: parseInt(inputs.majorId[i]),
            type: inputs.type[i].value,
            major: inputs.majors.major[i],
          },
        },
      })
        .then((data) => {
          if (data) {
            setLoading(false);

            setEditEd(false);

            // props.data.myProfile.profile.experiences[i] =
            //   data.data.updateExperience;
          }
        })
        .catch((e) => {
          setLoading(false);
        });
    });
  };
  const handleSubmitExperience = (inputs) => {
    setLoading(true);
    inputs?.company.forEach((c, i) => {
      updateWorkExperience({
        variables: {
          input: {
            id: parseInt(inputs.id[i]),
            jobTitle: inputs.jobTitle[i],
            description: inputs.description[i],
            startDate: inputs.startDate[i],
            endDate: inputs.endDate[i],
            employer: inputs.employer[i],
            company: inputs.company[i],
            poFirstName: inputs.poFname[i],
            poLastName: inputs.poLname[i],
            poEmail: inputs.poEmail[i],
            poPhoneNumber: inputs.poPhoneNumber[i],
            poPosition: inputs.poPosition[i],
          },
        },
      })
        .then((data) => {
          if (data) {
            setLoading(false);

            setEditExp(false);

            props.data.myProfile.profile.experiences[i] =
              data.data.updateExperience;
          }
        })
        .catch((e) => {
          setLoading(false);
        });
    });
  };
  const handleSubmitLang = (inputs) => {
    setLoading(true);
    inputs?.languages.forEach((l, i) => {
      updateLanguage({
        variables: {
          input: {
            id: parseInt(inputs.languages[i].value),
            language: inputs.languages[i].label,
            read: inputs.read[i].label,
            write: inputs.write[i].label,
            speak: inputs.speak[i].label,
            comprehend: inputs.comprehend[i].label,
          },
        },
      })
        .then((data) => {
          if (data) {
            setLoading(false);

            setEditLang(false);

            props.data.myProfile.profile.languagess[i] =
              data.data.updateLanguage;
          }
        })
        .catch((e) => {
          setLoading(false);
        });
    });
  };
  const handleSumbitPref = (inputs) => {
    setLoading(true);
    inputs?.countries.forEach((c, i) => {
      let countries = [];
      c.forEach((cont) => {
        countries.push(parseInt(cont.value));
      });

      updatePreference({
        variables: {
          input: {
            id: inputs.id[i],
            status: inputs.status[i],
            name: inputs.name[i],
            countryId: countries,
          },
        },
      })
        .then((data) => {
          if (data) {
            setLoading(false);

            setEditPref(false);

            props.data.myProfile.profile.preferences[i] =
              data.data.updatePreference;
          }
        })
        .catch((e) => {
          setLoading(false);
        });
    });
  };
  // const handleSubmit = ({
  //   fieldId,
  //   skillId,
  //   field,
  //   specialty,
  //   skill,
  //   developer,
  // }) => {
  //   setLoading(true);
  //   let arrr = [];

  //   // ask Mohamed if having a condition over the content and the old one before the backend calls
  //   fieldId.forEach((_, i) => {
  //     updateField({
  //       variables: {
  //         id: parseInt(fieldId[i]),
  //         name: field[i],
  //         specialty: specialty[i],
  //         pId: data?.myProfile.profile.id,
  //       },
  //     })
  //       .then((data) => {
  //         if (data) {
  //           setLoading(false);

  //           arrr[i] = data.data.updateField;

  //           setEditField(false);
  //         }
  //       })
  //       .catch((e) => {
  //         setLoading(false);
  //       });
  //   });
  //   skillId.forEach((id, i) => {
  //     updateSkill({
  //       variables: {
  //         id: parseInt(skillId[i]),
  //         name: skill[i],
  //         developer: developer[i],
  //       },
  //     })
  //       .then((data) => {
  //         if (data) {
  //           setLoading(false);

  //           setEditField(false);
  //           props.data.myProfile.profile.skills[i] = data.data.updateSkill;
  //         }
  //       })
  //       .catch((e) => {
  //         setLoading(false);
  //       });
  //   });
  //   setField(arrr);
  //   setFields(arrr);
  //   console.log({ fields: fields }, { fieldUP: field });
  // };
  // const [validation, setValidation] = useState(false);
  const [validationPref, setValidationPref] = useState(false);
  const [validationLang, setValidationLang] = useState(false);
  const [validationWexp, setValidationWexp] = useState(false);
  const [validationCert, setValidationCert] = useState(false);
  const [validationEd, setValidationEd] = useState(false);

  const [loading, setLoading] = useState(false);
  const enableButtonPref = () => {
    setValidationPref(true);
  };
  const disableButtonPref = () => {
    setValidationPref(false);
  };
  const enableButtonLang = () => {
    setValidationLang(true);
  };
  const disableButtonLang = () => {
    setValidationLang(false);
  };
  const enableButtonExperience = () => {
    setValidationWexp(true);
  };
  const disableButtonExperience = () => {
    setValidationWexp(false);
  };
  const enableButtonEducation = () => {
    setValidationEd(true);
  };
  const disableButtonEducation = () => {
    setValidationEd(false);
  };
  const enableButtonCertification = () => {
    setValidationCert(true);
  };
  const disableButtonCertification = () => {
    setValidationCert(false);
  };
  // const enableButton = () => {
  //   setValidation(true);
  // };
  // const disableButton = () => {
  //   setValidation(false);
  // };
  // const [editField, setEditField] = useState(false);
  const [editPref, setEditPref] = useState(false);
  const [editLang, setEditLang] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [editCert, setEditCert] = useState(false);
  const [editEd, setEditEd] = useState(false);
  const data = props?.data;
  // const [field, setField] = useState(data?.myProfile.profile.fields);
  // const [fields, setFields] = useState(data?.myProfile.profile.fields);
  // useEffect(() => {
  //   setFields(data?.myProfile.profile.fields);
  //   setField(data?.myProfile.profile.fields);
  // }, [data]);
  // useEffect(() => {
  //   setFields(field);
  //   console.log({ field });
  // }, []);
  const toDate = (d) => {
    if (d) {
      const yy = d.slice(0, 4);
      const mm = d.slice(5, 7);
      const dd = d.slice(8);
      const day = new Date(yy, mm - 1, dd, 0, 0);

      return day;
    } else return null;
  };
  const dateDiff = (sd, ed) => {
    // let yearsDiff = 0;
    let yearsDiff = ed.getFullYear() - sd.getFullYear();
    return yearsDiff;
  };
  const defaultCountries = [];
  const { data: dat } = useQuery(getCountries);

  if (defaultCountries.length < 1) {
    dat?.getAllCountries.forEach((c) => {
      defaultCountries.push({ value: c.id, label: c.name });
    });
  }
  var defaultValues = [];
  data?.myProfile?.profile?.preferences?.forEach((p, i) => {
    let tab = [];
    p.countries.forEach((c) => {
      tab.push({ value: c.id, label: c.name });
    });
    defaultValues[i] = tab;
  });

  const [getPdf, { loading: PLoading }] = useMutation(gPdf);
  const createDownloadPdf = () => {
    getPdf({ variables: { id: data.myProfile.profile.id } }).then((data) => {
      const pdf = data?.data?.getPDF;

      let a = document.createElement("a");
      a.href = `data:application/pdf;base64,${pdf}`;
      a.download = "newPdf.pdf";
      a.click();
    });
  };

  return (
    <div className=" col-lg-8 bg-white rounded-4 shadow-9">
      <div className="pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <div className="d-flex justify-content-end align-items-center">
          {PLoading ? <span>Downloading C.V</span> : <span>Download C.V</span>}
          <IconButton
            className={styles["edit"]}
            aria-label="download"
            size="medium"
            disabled={PLoading}
            onClick={() => createDownloadPdf()}
          >
            <ArrowDownwardIcon fontSize="inherit" />
          </IconButton>
        </div>
        <Field pId={data?.myProfile?.profile?.id}></Field>
      </div>
      {/* <!-- Skills End --> */}
      <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
          Preferences
          <CreateIcon
            className={styles["edit"]}
            onClick={() => setEditPref(!editPref)}
          />
        </h4>

        <ul className="list-unstyled ">
          {/* {!editPref ? (
                      data?.myProfile?.profile?.preferences.map((p) => (
                        <>
                          <div>
                            {" "}
                            <span>{p.status}:</span> {p.name}
                          </div>
                  {p.countries.map((c) => (
                    <li>
                      <a className="min-width-px-96 mr-3 rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
                        {c.name}
                      </a>
                    </li>
                  ))}  
                  )
                )) :("" )            </>
                      )))} */}
          {!editPref ? (
            data?.myProfile?.profile?.preferences.map((p, i) => (
              <div key={i}>
                <div>
                  <span>{p.status}:</span> {p.name}
                </div>
                <ul className="list-unstyled d-flex align-items-center flex-wrap">
                  {p.countries.map((c, j) => (
                    <li key={j}>
                      <a className="min-width-px-96 mr-3 rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
                        {c.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <Formsy
              onValidSubmit={handleSumbitPref}
              onValid={enableButtonPref}
              onInvalid={disableButtonPref}
            >
              {data?.myProfile?.profile?.preferences.map((p, i) => (
                <div>
                  <TextFieldFormsy
                    type="hidden"
                    name={`id[${i}]`}
                    id="id"
                    value={p.id}
                  />
                  <TextFieldFormsy
                    label="Status"
                    type="text"
                    name={`status[${i}]`}
                    id="status-edit"
                    value={p.status}
                    variant="outlined"
                    required
                  />
                  <TextFieldFormsy
                    label="Name"
                    type="text"
                    name={`name[${i}]`}
                    id="name-edit"
                    value={p.name}
                    variant="outlined"
                    required
                  />
                  <ul className="list-unstyled">
                    <ReactSelectMulti
                      name={`countries[${i}]`}
                      value={defaultValues[i]}
                      options={defaultCountries}
                      required
                    />
                    {/* 
                        <SelectMultipleFormsy
                          countries={dat?.getAllCountries}
                          value={p?.countries}
                          variant="outlined"
                          name="bled"
                        /> */}
                    {/* {p?.countries?.map((c) => (
                            <MenuItem value={c.id} key={c.id}>
                              {c.name}
                            </MenuItem>
                          ))} */}
                  </ul>
                </div>
              ))}{" "}
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                className="w-224 mx-auto mt-16 "
                aria-label="EDIT"
                id="user-skills-edit"
                disabled={!validationPref}
                value="legacy"
              >
                Edit
              </Button>
            </Formsy>
          )}
        </ul>
      </div>
      <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
          Languages
          <CreateIcon
            className={styles["edit"]}
            onClick={() => setEditLang(!editLang)}
          />
        </h4>
        {!editLang ? (
          <ul className="list-unstyled ">
            {data?.myProfile?.profile?.languages.map((l) => (
              <>
                <div>{l.language}</div>
                <div className="row">
                  <a className="row justify-content-between align-items-center align-items-center col-sm min-width-px-96 mr-3 rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
                    Reading: <Rate Rating={l.read}></Rate>
                  </a>

                  <a className="row justify-content-between align-items-center align-items-center col-sm min-width-px-96 mr-3 rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
                    Writing: <Rate Rating={l.write}></Rate>
                  </a>
                </div>
                <div className="row">
                  <a className="row justify-content-between align-items-center align-items-center col-sm min-width-px-96 mr-3 rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
                    Speaking: <Rate Rating={l.speak}></Rate>
                  </a>

                  <a className="row justify-content-between align-items-center align-items-center col-sm min-width-px-96 mr-3 rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
                    Comprehension: <Rate Rating={l.comprehend}></Rate>
                  </a>
                </div>
              </>
            ))}
          </ul>
        ) : (
          <>
            <Formsy
              onValidSubmit={handleSubmitLang}
              onValid={enableButtonLang}
              onInvalid={disableButtonLang}
            >
              {data?.myProfile?.profile?.languages.map((l, i) => (
                <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                  <TextFieldFormsy
                    type="hidden"
                    name={`id[${i}]`}
                    id="id"
                    value={l.id}
                  />{" "}
                  Language
                  <ReactSelectMulti
                    name={`languages[${i}]`}
                    value={{ value: l.id.toString(), label: l.language }}
                    options={[
                      { value: "1", label: "Arabic" },
                      { value: "2", label: "English" },
                    ]}
                    isClearable={false}
                    isMulti={false}
                  />
                  Read
                  <ReactSelectMulti
                    name={`read[${i}]`}
                    value={{ value: l.id.toString(), label: l.read }}
                    options={[
                      { value: "Native", label: "Native" },
                      { value: "Fluent", label: "Fluent" },
                      { value: "Conversational", label: "Conversational" },
                      { value: "Elementary", label: "Elementary" },
                      { value: "Beginner", label: "Beginner" },
                      { value: "Bad", label: "Bad" },
                    ]}
                    isMulti={false}
                    isClearable={false}
                  />
                  Write
                  <ReactSelectMulti
                    name={`write[${i}]`}
                    value={{ value: l.id.toString(), label: l.write }}
                    options={[
                      { value: "Native", label: "Native" },
                      { value: "Fluent", label: "Fluent" },
                      { value: "Conversational", label: "Conversational" },
                      { value: "Elementary", label: "Elementary" },
                      { value: "Beginner", label: "Beginner" },
                      { value: "Bad", label: "Bad" },
                    ]}
                    isMulti={false}
                    isClearable={false}
                  />
                  Speak
                  <ReactSelectMulti
                    name={`speak[${i}]`}
                    value={{ value: l.id.toString(), label: l.speak }}
                    options={[
                      { value: "Native", label: "Native" },
                      { value: "Fluent", label: "Fluent" },
                      { value: "Conversational", label: "Conversational" },
                      { value: "Elementary", label: "Elementary" },
                      { value: "Beginner", label: "Beginner" },
                      { value: "Bad", label: "Bad" },
                    ]}
                    isMulti={false}
                    isClearable={false}
                  />
                  Comprehend
                  <ReactSelectMulti
                    name={`comprehend[${i}]`}
                    value={{ value: l.id.toString(), label: l.comprehend }}
                    options={[
                      { value: "Native", label: "Native" },
                      { value: "Fluent", label: "Fluent" },
                      { value: "Conversational", label: "Conversational" },
                      { value: "Elementary", label: "Elementary" },
                      { value: "Beginner", label: "Beginner" },
                      { value: "Bad", label: "Bad" },
                    ]}
                    isMulti={false}
                    isClearable={false}
                  />
                </div>
              ))}
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                className="w-224 mx-auto mt-16 "
                aria-label="EDIT"
                id="user-skills-edit"
                disabled={!validationLang}
                value="legacy"
              >
                Edit
              </Button>
            </Formsy>
          </>
        )}
      </div>
      {/* <!-- Card Section Start --> */}
      <div className="border-top !pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
          {" "}
          Work Exprerience
          <CreateIcon
            className={styles["edit"]}
            onClick={() => setEditExp(!editExp)}
          />
        </h4>
        {/* <!-- Single Card --> */}

        {!editExp ? (
          <>
            {data?.myProfile.profile.experiences.map((e) => (
              <div className="w-100">
                <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                  {/* <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                  <img src={imgB1} alt="" />
                </div> */}
                  <div className="w-100 mt-n2">
                    <h3 className="mb-0">
                      <Link href="/#">
                        <a className="font-size-6 text-black-2 font-weight-semibold">
                          {e.jobTitle}{" "}
                        </a>
                      </Link>
                    </h3>
                    <Link href="/#">
                      <a className="font-size-4 text-default-color line-height-2">
                        {e.company}
                      </a>
                    </Link>
                    <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                      <Link href="/#">
                        <a className="font-size-4 text-gray mr-5">
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            year: "numeric",
                          }).format(toDate(e.startDate))}{" "}
                          -{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            year: "numeric",
                          }).format(toDate(e.endDate))}{" "}
                          - {dateDiff(toDate(e.startDate), toDate(e.endDate))}{" "}
                          years
                        </a>
                      </Link>
                      <Link href="/#">
                        <a className="font-size-3 text-gray">
                          <span
                            className="mr-4"
                            css={`
                              margin-top: -2px;
                            `}
                          >
                            <img src={imgL} alt="" />
                          </span>
                          Tunis, Tunisia
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <Formsy
              onValidSubmit={handleSubmitExperience}
              onValid={enableButtonExperience}
              onInvalid={disableButtonExperience}
            >
              {data?.myProfile.profile.experiences.map((e, i) => (
                <>
                  <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                    <TextFieldFormsy
                      type="hidden"
                      name={`id[${i}]`}
                      id="id"
                      value={e.id}
                    />
                    <TextFieldFormsy
                      label="Job Title"
                      type="text"
                      name={`jobTitle[${i}]`}
                      id="wxp-edit"
                      value={e.jobTitle}
                      variant="outlined"
                      required
                    />
                    <TextFieldFormsy
                      label="Company Name"
                      type="text"
                      name={`company[${i}]`}
                      id="cmpn-edit"
                      value={e.company}
                      variant="outlined"
                      required
                    />
                    <TextFieldFormsy
                      label="Job Description"
                      type="text"
                      name={`description[${i}]`}
                      id="desc-edit"
                      value={e.description}
                      variant="outlined"
                      required
                    />
                    <DatePickerFormsy
                      fullWidth
                      name={`startDate[${i}]`}
                      id="start-date-edit"
                      value={e.startDate}
                      // disabled={loading}
                      variant="outlined"
                      required
                    />
                    <DatePickerFormsy
                      fullWidth
                      name={`endDate[${i}]`}
                      id="end-date-edit"
                      value={e.endDate}
                      // disabled={loading}
                      variant="outlined"
                      required
                    />
                    <TextFieldFormsy
                      label="Employer Name"
                      type="text"
                      name={`employer[${i}]`}
                      id="employer-edit"
                      value={e.employer}
                      variant="outlined"
                      required
                    />

                    <TextFieldFormsy
                      label="Person of contact first name"
                      type="text"
                      name={`poFname[${i}]`}
                      id="poFname-edit"
                      value={e.poFirstName}
                      variant="outlined"
                      required
                    />
                    <TextFieldFormsy
                      label="Person of contact last name"
                      type="text"
                      name={`poLname[${i}]`}
                      id="poLname-edit"
                      value={e.poLastName}
                      variant="outlined"
                      required
                    />

                    <TextFieldFormsy
                      fullWidth
                      label="Person of contact E-Mail"
                      type="text"
                      name={`poEmail[${i}]`}
                      id="poEmail-edit"
                      value={e.poEmail}
                      required
                      validations={{
                        isEmail: true,
                      }}
                      validationErrors={{
                        isEmail: "Not a valid E-Mail",
                      }}
                      variant="outlined"
                      required
                    />
                    <TextFieldFormsy
                      label="Person of contact phone number"
                      type="tel"
                      name={`poPhoneNumber[${i}]`}
                      id="poPhoneNumber-edit"
                      value={e.poPhoneNumber}
                      variant="outlined"
                      required
                    />
                    <TextFieldFormsy
                      label="Person of contact position"
                      type="text"
                      name={`poPosition[${i}]`}
                      id="poPosition-edit"
                      value={e.poPosition}
                      variant="outlined"
                      required
                    />
                  </div>
                </>
              ))}
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                className="w-224 mx-auto mt-16 "
                aria-label="EDIT"
                id="user-skills-edit"
                disabled={!validationWexp}
                value="legacy"
              >
                Edit
              </Button>
            </Formsy>{" "}
          </>
        )}

        {/* <!-- Single Card End --> */}
      </div>
      {/* <!-- Card Section Start --> */}
      <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
          {" "}
          Education
          <CreateIcon
            className={styles["edit"]}
            onClick={() => setEditEd(!editEd)}
          />
        </h4>
        {/* <!-- Single Card --> */}
        {!editEd ? (
          data?.myProfile.profile.educations.map((e) => (
            <div className="w-100">
              <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                <div className="w-100 mt-n2">
                  <h3 className="mb-0">
                    <Link href="/#">
                      <a className="font-size-5 text-black-2">
                        {e?.diplomas?.diploma} in {e?.majors?.major}
                      </a>
                    </Link>
                  </h3>
                  <Link href="/#">
                    <a className="font-size-4 text-default-color line-height-2">
                      {e?.university}
                    </a>
                  </Link>
                  <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                    <Link href="/#">
                      <a className="font-size-3 text-gray mr-5">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          year: "numeric",
                        }).format(toDate(e.startDate))}{" "}
                        -{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          year: "numeric",
                        }).format(toDate(e.endDate))}{" "}
                        - {dateDiff(toDate(e.startDate), toDate(e.endDate))}{" "}
                        years{" "}
                      </a>
                    </Link>
                    <Link href="/#">
                      <a className="font-size-3 text-gray">
                        <span
                          className="mr-4"
                          css={`
                            margin-top: -2px;
                          `}
                        >
                          <img src={imgL} alt="" />
                        </span>
                        Sfax, Tunisia
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <Formsy
              onValidSubmit={handleSubmitEducation}
              onValid={enableButtonEducation}
              onInvalid={disableButtonEducation}
            >
              {data?.myProfile.profile.educations.map((e, i) => (
                <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                  <TextFieldFormsy
                    type="hidden"
                    name={`educationId[${i}]`}
                    id="edId"
                    value={e.id}
                  />
                  <TextFieldFormsy
                    label="University"
                    type="text"
                    name={`university[${i}]`}
                    id="uni-edit"
                    value={e.university}
                    variant="outlined"
                    required
                  />
                  <DatePickerFormsy
                    fullWidth
                    name={`startDate[${i}]`}
                    id="start-date-edit"
                    value={e.startDate}
                    // disabled={loading}
                    variant="outlined"
                    required
                  />
                  <DatePickerFormsy
                    fullWidth
                    name={`endDate[${i}]`}
                    id="end-date-edit"
                    value={e.endDate}
                    // disabled={loading}
                    variant="outlined"
                    required
                  />
                  <TextFieldFormsy
                    type="hidden"
                    name={`diplomaId[${i}]`}
                    id="dipId"
                    value={e.diplomas.id}
                  />
                  <TextFieldFormsy
                    label="Diploma"
                    type="text"
                    name={`diplomas.diploma[${i}]`}
                    id="dip-edit"
                    value={e.diplomas.diploma}
                    variant="outlined"
                    required
                  />
                  <TextFieldFormsy
                    type="hidden"
                    name={`majorId[${i}]`}
                    id="majId"
                    value={e.majors.id}
                  />
                  <div>Major Type</div>
                  <ReactSelectMulti
                    name={`type[${i}]`}
                    value={{
                      value: e.majors.type,
                      label:
                        e.majors.type == "US"
                          ? "United States"
                          : "Bologna Process",
                    }}
                    options={[
                      { value: "US", label: "United States" },
                      { value: "BolognaProcess", label: "Bologna Process" },
                    ]}
                    isMulti={false}
                    isClearable={false}
                  />
                  <TextFieldFormsy
                    label="Major"
                    type="text"
                    name={`majors.major[${i}]`}
                    id="maj-edit"
                    value={e.majors.major}
                    variant="outlined"
                    required
                  />
                </div>
              ))}
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                className="w-224 mx-auto mt-16 "
                aria-label="EDIT"
                id="user-skills-edit"
                disabled={!validationEd}
                value="legacy"
              >
                Edit
              </Button>
            </Formsy>
          </>
        )}
      </div>
      {/* <!-- Card Section End --> */}
      <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
          Certifications
          <CreateIcon
            className={styles["edit"]}
            onClick={() => setEditCert(!editCert)}
          />
        </h4>
        {/* <!-- Single Card --> */}
        {!editCert ? (
          data?.myProfile.profile.certifications.map((e) => (
            <div className="w-100">
              <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                <div className="w-100 mt-n2">
                  <h3 className="mb-0">
                    <Link href="/#">
                      <a className="font-size-5 text-black-2">{e?.name}</a>
                    </Link>
                  </h3>
                  <Link href="/#">
                    <a className="font-size-4 text-default-color line-height-2">
                      {e?.instution} - {e?.category}
                    </a>
                  </Link>
                  <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                    <Link href="/#">
                      <a className="font-size-3 text-gray mr-5">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          year: "numeric",
                        }).format(toDate(e.date))}{" "}
                        - {e.duration} months{" "}
                      </a>
                    </Link>
                    <Link href="/#">
                      <a className="font-size-3 text-gray">
                        <span
                          className="mr-4"
                          css={`
                            margin-top: -2px;
                          `}
                        >
                          <img src={imgL} alt="" />
                        </span>
                        Sfax, Tunisia
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <Formsy
              onValidSubmit={handleSubmitCertification}
              onValid={enableButtonCertification}
              onInvalid={disableButtonCertification}
            >
              {data?.myProfile.profile.certifications.map((e, i) => (
                <>
                  <TextFieldFormsy
                    type="hidden"
                    name={`id[${i}]`}
                    id="certId"
                    value={e.id}
                  />
                  <TextFieldFormsy
                    label="Certification Name"
                    type="text"
                    name={`name[${i}]`}
                    id="name-edit"
                    value={e.name}
                    variant="outlined"
                    required
                  />
                  <TextFieldFormsy
                    label="Institution"
                    type="text"
                    name={`instution[${i}]`}
                    id="inst-edit"
                    value={e.instution}
                    variant="outlined"
                    required
                  />
                  <TextFieldFormsy
                    label="Category"
                    type="text"
                    name={`category[${i}]`}
                    id="cat-edit"
                    value={e.category}
                    variant="outlined"
                    required
                  />
                  <DatePickerFormsy
                    fullWidth
                    name={`date[${i}]`}
                    id="date-edit"
                    value={e.date}
                    // disabled={loading}
                    variant="outlined"
                    required
                  />
                  <TextFieldFormsy
                    label="Duration"
                    type="number"
                    name={`duration[${i}]`}
                    id="dur-edit"
                    value={e.duration}
                    variant="outlined"
                    required
                  />
                </>
              ))}
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                color="primary"
                className="w-224 mx-auto mt-16 "
                aria-label="EDIT"
                id="user-skills-edit"
                disabled={!validationCert}
                value="legacy"
              >
                Edit
              </Button>
            </Formsy>
          </>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(MyProfileConsultant);
