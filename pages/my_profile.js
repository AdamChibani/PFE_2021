import React from "react";

import PageWrapper from "../components/PageWrapper";
import ProfileSidebar from "../components/ProfileSidebarEdit";
import MyProfileConsultant from "../components/MyProfile";

import selectAuth from "../redux/user/userSelector";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
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

  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32">
          <div className="container">
            {/* <!-- back Button End --> */}
            <div className="row">
              {/* <!-- Left Sidebar Start --> */}

              <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0">
                <ProfileSidebar
                  user={{
                    firstName: data?.myProfile.firstName,
                    lastName: data?.myProfile.lastName,
                    profileImage: data?.myProfile.profileImage,
                    email: data?.myProfile.email,
                    gender: data?.myProfile.gender,
                  }}
                  field={data?.myProfile.profile.fields[0].name}
                  website={data?.myProfile.profile.website}
                  phone={data?.myProfile.profile.phone}
                  hourRate={data?.myProfile.profile.hourRate}
                  nationality={data?.myProfile.profile.nationalities}
                  modify={true}
                />
              </div>
              {/* <!-- Left Sidebar End --> */}
              {/* <!-- Middle Content --> */}
              <MyProfileConsultant data={data} />

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
