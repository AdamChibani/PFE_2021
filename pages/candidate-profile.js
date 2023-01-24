import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import ProfileSidebar from "../components/ProfileSidebar";
import { useRouter } from "next/router";
import styles from "../components/Contact/contact.module.css";

import imgB1 from "../assets/image/l2/png/featured-job-logo-1.png";
import imgB2 from "../assets/image/l1/png/feature-brand-1.png";
import imgB3 from "../assets/image/svg/harvard.svg";
import imgB4 from "../assets/image/svg/mit.svg";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import imgT1 from "../assets/image/l3/png/team-member-1.png";
import imgT2 from "../assets/image/l3/png/team-member-2.png";
import imgT3 from "../assets/image/l3/png/team-member-3.png";
import imgT4 from "../assets/image/l3/png/team-member-4.png";
import imgT5 from "../assets/image/l3/png/team-member-5.png";
import imgL from "../assets/image/svg/icon-loaction-pin-black.svg";
import selectAuth from "../redux/user/userSelector";

import Rate from "../components/Rate/Rate";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Avatar, CircularProgress } from "@material-ui/core";
import { useLazyQuery } from "@apollo/react-hooks";
const getProfile = gql`
  query getSignle($id: Int!) {
    getSingleProfile(id: $id) {
      createdAt
      phone
      nationalities {
        male
        female
      }
      languages {
        language
        read
        write
        speak
        comprehend
      }
      user {
        id
        email
        lastName
        firstName
        profileImage
        gender
        company {
          id
        }
      }
      preferences {
        name
        countries {
          name
        }
        status
      }
      fields {
        name
        specialty
      }
      skills {
        name
      }
      hourRate
      website
      years
      experiences {
        jobTitle
        startDate
        endDate
        company
      }
      educations {
        majors {
          type
          major
        }
        startDate
        endDate
        university
        diplomas {
          diploma
        }
      }
      certifications {
        name
        category
        instution
        date
        duration
        level
      }
    }
  }
`;
const send = gql`
  mutation create($senderID: Int!, $subject: String!, $receiver: [Int!]) {
    createMessagerie(
      senderID: $senderID
      subject: $subject
      receiver: $receiver
    ) {
      id
    }
  }
`;
const GET_WORKERS_QUERY = gql`
  query getAll($id: Int!, $profile: Int!) {
    getAgenciesWorkers(id: $id, profile: $profile) {
      id
      firstName
      profileImage
      lastName
      profile {
        fields {
          name
        }
      }
    }
  }
`;
const sendMsg_mutation = gql`
  mutation createM($messagerieId: Int!, $authorId: Int!, $content: String!) {
    createMessage(
      messagerieId: $messagerieId
      authorId: $authorId
      content: $content
    ) {
      id

      content
    }
  }
`;
const ADD_CLICK_MUTATION = gql`
  mutation addClick($id: Int!) {
    addClick(id: $id)
  }
`;
const CandidateProfile = (props) => {
  const [addClick] = useMutation(ADD_CLICK_MUTATION);

  const [sendMessage, { loading: lm }] = useMutation(sendMsg_mutation);
  const [sendMsg, { loading: l }] = useMutation(send);
  const handleSend = (senderID, subject, msg) => {
    sendMsg({
      variables: {
        senderID,
        subject,
        receiver: [parseInt(router.query.profile)],
      },
    }).then((dat) => {
      console.log(dat);
      sendMessage({
        variables: {
          messagerieId: dat.data.createMessagerie.id,
          authorId: senderID,
          content: msg,
        },
      });
    });
  };
  const [msg, setMsg] = useState("");
  const [sbj, setSbj] = useState("");
  const toDate = (d) => {
    console.log(d);
    if (!loading) {
      const yy = d.slice(0, 4);
      const mm = d.slice(5, 7);
      const dd = d.slice(8);
      console.log({ dd, mm, yy });
      const day = new Date(yy, mm, dd, 0, 0);

      return day;
    } else return null;
  };
  const dateDiff = (sd, ed) => {
    let yearsDiff = ed.getFullYear() - sd.getFullYear();
    return yearsDiff;
  };
  const router = useRouter();
  console.log(router.query.profile);
  const { loading, error, data } = useQuery(getProfile, {
    variables: { id: parseInt(router.query.profile) },
  });
  const [getWorkers, { data: workers, loading: loadingWorkers }] =
    useLazyQuery(GET_WORKERS_QUERY);
  useEffect(() => {
    if (parseInt(router?.query?.profile))
      addClick({ variables: { id: parseInt(router?.query?.profile) } });
  }, [parseInt(router?.query?.profile)]);

  useEffect(() => {
    if (data && !loading)
      getWorkers({
        variables: {
          profile: data?.getSingleProfile?.user?.id,
          id: data?.getSingleProfile?.user?.company?.id,
        },
      });
  }, [data]);
  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32">
          <div className="container">
            {/* <!-- back Button --> */}
            <div className="row justify-content-center">
              <div className="col-12 dark-mode-texts">
                <div className="mb-9">
                  <Link href="/search-list">
                    <a className="d-flex align-items-center ml-4">
                      <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                      <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                        Back
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- back Button End --> */}
            <div className="row">
              {/* <!-- Left Sidebar Start --> */}
              <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0">
                <ProfileSidebar
                  user={data?.getSingleProfile.user}
                  field={data?.getSingleProfile.fields[0].name}
                  website={data?.getSingleProfile.website}
                  phone={data?.getSingleProfile.phone}
                  hourRate={data?.getSingleProfile.hourRate}
                  nationality={data?.getSingleProfile.nationalities}
                />
              </div>
              {/* <!-- Left Sidebar End --> */}
              {/* <!-- Middle Content --> */}
              <div className="col-12 col-xxl-6 col-lg-8 col-md-7 order-2 order-xl-1">
                <Tab.Container id="left-tabs-example" defaultActiveKey="one">
                  <div className="bg-white rounded-4 shadow-9">
                    {/* <!-- Tab Section Start --> */}
                    <Nav
                      className="nav border-bottom border-mercury pl-12"
                      role="tablist"
                    >
                      <li className="tab-menu-items nav-item pr-12">
                        <Nav.Link
                          eventKey="one"
                          className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                        >
                          Overview
                        </Nav.Link>
                      </li>
                      <li className="tab-menu-items nav-item pr-12">
                        <Nav.Link
                          disabled={!props?.user?.user}
                          eventKey="two"
                          className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                        >
                          Contact
                        </Nav.Link>
                      </li>
                    </Nav>
                    {/* <!-- Tab Content --> */}
                    <Tab.Content>
                      <Tab.Pane eventKey="one">
                        <div className="pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                          <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold">
                            Skills
                          </h4>
                          Technical
                          <ul className="list-unstyled d-flex align-items-center flex-wrap">
                            {data?.getSingleProfile.fields.map((f) => (
                              <li>
                                <a className="bg-polar text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  {f.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                          Soft
                          <ul className="list-unstyled d-flex align-items-center flex-wrap">
                            {data?.getSingleProfile.skills.map((s) => (
                              <li>
                                <a className="bg-polar text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                                  {s.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                          <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold">
                            Preferences
                          </h4>
                          <ul className="list-unstyled ">
                            {data?.getSingleProfile?.preferences.map((p) => (
                              <>
                                <div>
                                  <span>{p.status}:</span> {p.name}
                                </div>
                                <ul className="list-unstyled d-flex align-items-center flex-wrap">
                                  {p.countries.map((c) => (
                                    <li>
                                      <a className="min-width-px-96 mr-3 rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
                                        {c.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ))}
                          </ul>
                        </div>
                        <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                          <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold">
                            Languages
                          </h4>
                          <ul className="list-unstyled ">
                            {data?.getSingleProfile?.languages.map((l) => (
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
                                    Comprehension:{" "}
                                    <Rate Rating={l.comprehend}></Rate>
                                  </a>
                                </div>
                              </>
                            ))}
                          </ul>
                        </div>
                        {/* <!-- Skills End --> */}
                        {/* <!-- Card Section Start --> */}
                        <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                            Work Exprerience
                          </h4>
                          {/* <!-- Single Card --> */}
                          {data?.getSingleProfile.experiences.map((e) => (
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
                                        -{" "}
                                        {dateDiff(
                                          toDate(e.startDate),
                                          toDate(e.endDate)
                                        )}{" "}
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

                          {/* <!-- Single Card End --> */}
                        </div>
                        {/* <!-- Card Section Start --> */}
                        <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                            Education
                          </h4>
                          {/* <!-- Single Card --> */}
                          {data?.getSingleProfile.educations.map(
                            (e) => (
                              console.log(e),
                              (
                                <div className="w-100">
                                  <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                                    <div className="w-100 mt-n2">
                                      <h3 className="mb-0">
                                        <Link href="/#">
                                          <a className="font-size-5 text-black-2">
                                            {e?.diplomas?.diploma} in{" "}
                                            {e?.majors?.major}
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
                                            -{" "}
                                            {dateDiff(
                                              toDate(e.startDate),
                                              toDate(e.endDate)
                                            )}{" "}
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
                              )
                            )
                          )}
                        </div>
                        <div className="border-top p-5 pl-xs-12 pt-7 pb-5">
                          <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                            Certifications
                          </h4>
                          {/* <!-- Single Card --> */}
                          {data?.getSingleProfile.certifications.map(
                            (e) => (
                              console.log(e),
                              (
                                <div className="w-100">
                                  <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                                    <div className="w-100 mt-n2">
                                      <h3 className="mb-0">
                                        <Link href="/#">
                                          <a className="font-size-5 text-black-2">
                                            {e?.name}
                                          </a>
                                        </Link>
                                      </h3>
                                      <Link href="/#">
                                        <a className="font-size-4 text-default-color line-height-2">
                                          {e?.instution}
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
                              )
                            )
                          )}
                        </div>

                        {/* <!-- Card Section End --> */}
                      </Tab.Pane>
                      <Tab.Pane eventKey="two">
                        {/* <!-- Excerpt Start --> */}
                        <div className="pr-xl-11 p-5 pl-xs-12 pt-9 pb-11">
                          <form name="contact">
                            {/* You still need to add the hidden input with the form name to your JSX form */}
                            <input
                              type="hidden"
                              name="form-name"
                              value="contact"
                            />
                            <div className="row">
                              <div className="col-lg-12 mb-7">
                                <label
                                  htmlFor="subject"
                                  className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                >
                                  Subject
                                </label>
                                <input
                                  type="text"
                                  id="subject"
                                  placeholder="Type your subject"
                                  className={"form-control h-px-100"}
                                  name="subject"
                                  onChange={(e) => setSbj(e.target.value)}
                                />
                                <label
                                  htmlFor="message"
                                  className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                                >
                                  Message
                                </label>
                                <textarea
                                  id="message"
                                  placeholder="Type your message"
                                  className={" form-control h-px-100"}
                                  name="message"
                                  onChange={(e) => setMsg(e.target.value)}
                                ></textarea>
                              </div>
                              <div className="col-lg-12 pt-4">
                                <button
                                  className="btn btn-primary text-uppercase w-100 h-px-48"
                                  disabled={l || lm}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSend(props?.user?.user?.id, sbj, msg);
                                  }}
                                >
                                  {l || lm ? <CircularProgress /> : "Send Now"}
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* <!-- Excerpt End --> */}
                      </Tab.Pane>
                    </Tab.Content>
                    {/* <!-- Tab Content End --> */}
                    {/* <!-- Tab Section End --> */}
                  </div>
                </Tab.Container>
              </div>
              {/* <!-- Middle Content --> */}
              {/* <!-- Right Sidebar Start --> */}
              <div className="col-12 col-xxl-3 col-md-4 offset-xxl-0 offset-lg-4 offset-md-5 order-3 order-xl-2 mt-xxl-0 mt-md-12">
                <div className="pl-lg-5">
                  <h4 className="font-size-6 font-weight-semibold mb-0">
                    Other experts
                  </h4>
                  <ul className="list-unstyled">
                    {workers?.getAgenciesWorkers?.map((w) => (
                      <li className="border-bottom">
                        <Link href="/#">
                          <a className="media align-items-center py-9 flex-wrap">
                            <div className="mr-7">
                              {w?.profileImage ? (
                                <img
                                  className="square-72 rounded-3"
                                  src={w.profileImage}
                                  alt=""
                                />
                              ) : (
                                <Avatar>{w.firstName[0].toUpperCase()}</Avatar>
                              )}
                            </div>
                            <div className="">
                              <h4 className="mb-0 font-size-5 font-weight-semibold">
                                {w.firstName} {w.lastName}
                              </h4>
                              {w?.profile ? (
                                <p className="mb-0 font-size-3 heading-default-color">
                                  {w?.profile?.fields[0].field}
                                </p>
                              ) : (
                                <p className="mb-0 font-size-3 heading-default-color">
                                  Agency's admin
                                </p>
                              )}

                              <span className="font-size-3 text-smoke">
                                <img className="mr-2" src={imgL} alt="" />
                                Tunis, Tunisia
                              </span>
                            </div>
                          </a>
                        </Link>
                      </li>
                    ))}

                    {/* <!-- Single List End --> */}
                  </ul>
                </div>
              </div>

              {/* <!-- Right Sidebar End --> */}
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(CandidateProfile);
