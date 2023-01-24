import React from "react";

import PageWrapper from "../components/PageWrapper";
import ProfileSidebar from "../components/ProfileSidebarEdit";
import MyProfileConsultant from "../components/MyProfile";
import MyProfileAdmin from "../components/MyProfile/MyProfileAdmin";
import ProfileSidebarAdmin from "../components/ProfileSidebarEdit/ProfileSidebarAdmin";
import { Redirect } from "react-router";

import selectAuth from "../redux/user/userSelector";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import IndexPage from ".";
const getProfile = gql`
  query my($id: Int!) {
    myProfile(id: $id) {
      email
      firstName
      lastName
      lastPasswordChange
      gender
      company {
        name
        offices {
          name
          address {
            street
            city
            postalCode
            country {
              name
              continent {
                name
              }
            }
          }
        }
      }
      post
      isEnterpriseAdmin
      profileImage

      profile {
        id
        phone
        hourRate
        phone
        years
        website
        affiliations {
          id
          group
          startDate
          endDate
          post
        }
        languages {
          id
          language
          read
          write
          speak
          comprehend
        }
        preferences {
          id
          name
          countries {
            id
            name
            continent {
              id
              name
            }
          }
          status
        }
        educations {
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

        fields {
          id
          name
          specialty
        }
        experiences {
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
        projects {
          id
          projectTitle
          jobTitle
          scope
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
        certifications {
          id
          name
          category
          instution
          date
          duration
          level
        }
        isAgencyAdmin
        nationalities {
          male
          female
        }
        driversLicense
      }
    }
  }
`;

const MyProfile = (props) => {
  const { loading, error, data } = useQuery(getProfile, {
    variables: { id: props?.user?.user?.id },
  });
  console.log(data);
  console.log(props?.user?.user?.role?.id);
  if (!props?.user?.user?.role?.id) return <IndexPage />;
  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32">
          <div className="container">
            {/* <!-- back Button End --> */}
            <div className="row">
              {/* <!-- Left Sidebar Start --> */}

              {props?.user?.user?.role?.id == 1 ? (
                <>
                  {" "}
                  <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0">
                    <ProfileSidebar />
                  </div>
                  {/* <!-- Left Sidebar End --> */}
                  {/* <!-- Middle Content --> */}
                  <MyProfileConsultant data={data} />
                </>
              ) : (
                <>
                  {" "}
                  <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0">
                    <ProfileSidebarAdmin />
                  </div>
                  {/* <!-- Left Sidebar End --> */}
                  {/* <!-- Middle Content --> */}
                  <MyProfileAdmin />
                </>
              )}

              {/* <!-- Middle Content --> */}
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(MyProfile);
