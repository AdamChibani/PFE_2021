import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import LazyLoad from "react-lazyload";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";
import GlobalContext from "../context/GlobalContext";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import selectAuth from "../redux/user/userSelector";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import Contact from "../components/Contact/contact";
import { Avatar, Modal } from "@material-ui/core";
const getMessages = gql`
  query getByUser($id: Int!) {
    getUnopenedMessagerie(id: $id) {
      id
      subject
      opened
      sender {
        id
        profileImage
        firstName
        lastName
        post
        email
        profile {
          phone
        }
        company {
          name
          enterpriseSize
          email
          phone
          fields {
            name
            specialty
          }
          street
          city
          postalCode
          country {
            name
          }

          offices {
            name
            address {
              street
              city

              country {
                name
              }
            }
          }
        }
      }
      messages {
        authorId
        content
      }
      createdAt
    }
  }
`;
const deleteMessagerie = gql`
  mutation deleteMessagerie($id: Int!) {
    deleteMessagerie(id: $id)
  }
`;
const defaultJobs = [
  { value: "pd", label: "Product Designer" },
  { value: "gd", label: "Graphics Designer" },
  { value: "fd", label: "Frontend Developer" },
  { value: "bd", label: "Backend Developer" },
  { value: "cw", label: "Content Writer" },
];
const getCount = gql`
  query count($id: Int!) {
    getCount(id: $id)
  }
`;
const getAll = gql`
  query countAll($id: Int!) {
    getCountAll(id: $id)
  }
`;
const getClick = gql`
  query clicks($id: Int!) {
    myProfile(id: $id) {
      profile {
        clicks
      }
    }
  }
`;
const DashboardMain = (props) => {
  const { data: clicksData } = useQuery(getClick, {
    variables: { id: props?.user?.user?.id },
    fetchPolicy: "network-only",
    pollInterval: 60000,
    fetchPolicy: "no-cache",
  });
  const { data: countData } = useQuery(getCount, {
    variables: { id: props?.user?.user?.id },
    fetchPolicy: "network-only",
    pollInterval: 60000,
    fetchPolicy: "no-cache",
  });
  const { data: countAllData } = useQuery(getAll, {
    variables: { id: props?.user?.user?.id },
    fetchPolicy: "network-only",
    pollInterval: 60000,
    fetchPolicy: "no-cache",
  });
  const gContext = useContext(GlobalContext);
  console.log(props?.user?.user?.id);
  const toDate = (d) => {
    if (!loading) {
      return new Date(d * 1);
    } else return null;
  };
  const [del, { data: dat, loading: lod }] = useMutation(deleteMessagerie);

  const { data, loading } = useQuery(getMessages, {
    variables: { id: props?.user?.user?.id },
  });
  const [dats, setDats] = useState(data?.getUnopenedMessagerie);

  useEffect(() => {
    setDats(data?.getUnopenedMessagerie);
    console.log({ data: data?.getUnopenedMessagerie });
  }, [data]);
  function handleDelete(id, m) {
    let d = [...dats];

    del({
      variables: { id: parseInt(id) },
    })
      .catch((err) => console.log({ err }))
      .then(() => {
        deleteFromTable(d, m);
      });
  }
  function deleteFromTable(d, id) {
    console.log(d.indexOf(id));
    d.splice(d.indexOf(id), 1);
    setDats(d);
    console.log({ d });
  }
  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div className="dashboard-main-container mt-25 mt-lg-31">
          <div className="container">
            <div className="row mb-7">
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8">
                  <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp
                            duration={6}
                            end={countData?.getCount || 0}
                          />
                        </span>
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Current offers
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8">
                  <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-user"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp
                            duration={4}
                            end={countAllData?.getCountAll || 0}
                          />
                        </span>
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Total Applicants
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8">
                  <div className="text-orange bg-orange-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-eye"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp
                            duration={4}
                            end={clicksData?.myProfile?.profile?.clicks || 0}
                          />
                        </span>
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Jobs View
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-sm-6">
                {/* <!-- Single Category --> */}
                <a className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8">
                  <div className="text-egg-blue bg-egg-blue-opacity-1 circle-56 font-size-6 mr-7">
                    <i className="fas fa-mouse-pointer"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                      <LazyLoad>
                        <span className="counter">
                          <CountUp
                            duration={4}
                            decimal="."
                            decimals={1}
                            end={
                              (countAllData?.getCountAll /
                                clicksData?.myProfile?.profile?.clicks) *
                                100 || 0
                            }
                          />
                        </span>
                        %
                      </LazyLoad>
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray mb-0">
                      Applied Rate
                    </p>
                  </div>
                </a>
                {/* <!-- End Single Category --> */}
              </div>
            </div>
            <div className="mb-14">
              <div className="row mb-11 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">
                    Applicants List ({countData?.getCount || 0})
                  </h3>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="pl-0  border-0 font-size-4 font-weight-normal"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Applied as
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Applied on
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        ></th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        ></th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dats?.map((msg) => (
                        <tr className="border border-color-2">
                          <th scope="row" className="pl-6 border-0 py-7 pr-0">
                            <Link
                              href={{
                                pathname: "/candidate-profile",
                                query: { profile: msg.sender.id },
                              }}
                            >
                              <a className="media min-width-px-235 align-items-center">
                                <div className="circle-36 mr-6">
                                  {msg.sender.profileImage ? (
                                    <img
                                      src={msg.sender.profileImage}
                                      alt=""
                                      className="w-100"
                                    />
                                  ) : (
                                    <Avatar>
                                      {msg.sender.firstName[0].toUpperCase()}
                                    </Avatar>
                                  )}
                                </div>
                                <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                  {msg.sender.firstName} {msg.sender.lastName}
                                </h4>
                              </a>
                            </Link>
                          </th>
                          <td className="table-y-middle py-7 min-width-px-235 pr-0">
                            <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                              {msg.sender.company.name}{" "}
                            </h3>
                          </td>
                          <td className="table-y-middle py-7 min-width-px-170 pr-0">
                            <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                              {new Intl.DateTimeFormat("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }).format(toDate(msg.createdAt))}
                            </h3>
                          </td>
                          <td className="table-y-middle py-7 min-width-px-170 pr-0">
                            <div className="">
                              <a
                                className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                                onClick={(e) => {
                                  e.preventDefault();
                                  gContext.toggleApplicationModal(msg);
                                }}
                              >
                                View Application
                              </a>
                            </div>
                          </td>
                          <td className="table-y-middle py-7 min-width-px-110 pr-0">
                            <div className="">
                              <a
                                onClick={() => {
                                  gContext.toggleContactModal(msg);
                                }}
                                className="font-size-3 font-weight-bold text-green text-uppercase"
                              >
                                Contact
                              </a>
                            </div>
                            <Modal
                              open={gContext.contactModalVisible}
                              onClose={() => {
                                gContext.toggleContactModal(msg);
                              }}
                              aria-labelledby="Contact"
                              aria-describedby=""
                            >
                              <Contact
                                id={props?.user?.user?.id}
                                del={deleteFromTable}
                                msgId={msg.id}
                                d={[...dats]}
                              />
                            </Modal>
                          </td>
                          <td className="table-y-middle py-7 min-width-px-100 pr-0">
                            <div className="">
                              <span
                                onClick={() => handleDelete(msg.id, msg)}
                                className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                              >
                                Reject
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(DashboardMain);
