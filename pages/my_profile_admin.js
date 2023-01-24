import React from "react";

import PageWrapper from "../components/PageWrapper";
import ProfileSidebarAdmin from "../components/ProfileSidebarEdit/ProfileSidebarAdmin";

import selectAuth from "../redux/user/userSelector";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import MyProfileAdmin from "../components/MyProfile/MyProfileAdmin";

const MyProfile = (props) => {
  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32">
          <div className="container">
            {/* <!-- back Button End --> */}
            <div className="row">
              {/* <!-- Left Sidebar Start --> */}

              <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0">
                <ProfileSidebarAdmin />
              </div>
              {/* <!-- Left Sidebar End --> */}
              {/* <!-- Middle Content --> */}
              <MyProfileAdmin />

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
