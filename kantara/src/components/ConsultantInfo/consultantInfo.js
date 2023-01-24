import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import gql from "graphql-tag";
import { Nav, Tab } from "react-bootstrap";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectAuth from "../../redux/user/userSelector";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { Fields } from "./components";
import Skills from "./components/skills";
import Languages from "./components/language";
import Preferences from "./components/preferences";
import Experiences from "./components/experience";
import Projects from "./components/project";
import Certifications from "./components/certifications";
import Educations from "./components/education";
import { logOut } from "../../redux/user/userActions";
import Info from "./components/profileInfo";

const GET_MY_PROFILE_QUERY = gql`
  query getMy($id: Int!) {
    getMyProfile(id: $id) {
      id
      state
    }
  }
`;
const INCREMENT_STATE_MUTATION = gql`
  mutation inc($id: Int!, $val: Int!) {
    inceremntState(id: $id, val: $val)
  }
`;
const ConsultantInfo = (props) => {
  const { data } = useQuery(GET_MY_PROFILE_QUERY, {
    variables: { id: props?.user?.user?.id },
  });
  const [incrmnt] = useMutation(INCREMENT_STATE_MUTATION);
  const [activeTab, setActiveTab] = useState("1");
  console.log(data);
  useEffect(() => {
    setActiveTab(data?.getMyProfile?.state);
  }, [data]);
  const gContext = useContext(GlobalContext);

  const toggleModal = () => {
    gContext.toggleConsultantInfoModal();
  };
  function handleClick() {
    props.logOut();
    toggleModal();
  }

  return (
    <div className={"container position-relative overflow-auto"}>
      <div className=" container row justify-content-center mt-24 mx-auto">
        <div className="col-xxl-6 col-xl-7 col-lg-8">
          <div
            className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4 overflow-auto"
            style={{ height: "600px" }}
          >
            <a
              onClick={() => handleClick()}
              className=" dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
            >
              Log Out
            </a>
            <Tab.Container
              id="left-tabs-example"
              className="overflow-auto"
              activeKey={activeTab}
            >
              <Nav
                className="nav border-bottom border-mercury pl-12"
                role="tablist"
              >
                <li className="tab-menu-items nav-item pr-12">
                  <Nav.Link
                    //   disabled={activeTab != "1"}
                    eventKey="1"
                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                  >
                    Fields{" "}
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-12">
                  <Nav.Link
                    //   disabled={activeTab != "2"}
                    eventKey="2"
                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                  >
                    Skills
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-12">
                  <Nav.Link
                    //   disabled={activeTab != "2"}
                    eventKey="3"
                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                  >
                    Preferences
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-12">
                  <Nav.Link
                    //   disabled={activeTab != "2"}
                    eventKey="4"
                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                  >
                    Languages
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-12">
                  <Nav.Link
                    //   disabled={activeTab != "2"}
                    eventKey="5"
                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                  >
                    Work experiences
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-12">
                  <Nav.Link
                    //   disabled={activeTab != "2"}
                    eventKey="6"
                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                  >
                    Projects
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-12">
                  <Nav.Link
                    //   disabled={activeTab != "2"}
                    eventKey="7"
                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                  >
                    Educations
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-12">
                  <Nav.Link
                    //   disabled={activeTab != "2"}
                    eventKey="8"
                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                  >
                    Certifications
                  </Nav.Link>
                </li>
                <li className="tab-menu-items nav-item pr-12">
                  <Nav.Link
                    //   disabled={activeTab != "2"}
                    eventKey="9"
                    className="text-uppercase font-size-3 font-weight-bold text-default-color py-3 px-0"
                  >
                    Work Info
                  </Nav.Link>
                </li>
              </Nav>
              <Tab.Content className="h-100">
                <Tab.Pane eventKey="1">
                  <Fields
                    profile={data?.getMyProfile?.id}
                    setTab={setActiveTab}
                    increment={incrmnt}
                  ></Fields>
                </Tab.Pane>
                <Tab.Pane eventKey="2">
                  <Skills
                    profile={data?.getMyProfile?.id}
                    setTab={setActiveTab}
                    increment={incrmnt}
                  ></Skills>
                </Tab.Pane>
                <Tab.Pane eventKey="3">
                  <Preferences
                    profile={data?.getMyProfile?.id}
                    setTab={setActiveTab}
                    increment={incrmnt}
                  ></Preferences>
                </Tab.Pane>
                <Tab.Pane eventKey="4">
                  <Languages
                    profile={data?.getMyProfile?.id}
                    setTab={setActiveTab}
                    increment={incrmnt}
                  ></Languages>
                </Tab.Pane>
                <Tab.Pane eventKey="5">
                  <Experiences
                    profile={data?.getMyProfile?.id}
                    setTab={setActiveTab}
                    increment={incrmnt}
                  ></Experiences>
                </Tab.Pane>
                <Tab.Pane eventKey="6">
                  <Projects
                    profile={data?.getMyProfile?.id}
                    setTab={setActiveTab}
                    increment={incrmnt}
                  ></Projects>
                </Tab.Pane>
                <Tab.Pane eventKey="7">
                  <Educations
                    profile={data?.getMyProfile?.id}
                    setTab={setActiveTab}
                    increment={incrmnt}
                  ></Educations>
                </Tab.Pane>
                <Tab.Pane eventKey="8">
                  <Certifications
                    profile={data?.getMyProfile?.id}
                    setTab={setActiveTab}
                    increment={incrmnt}
                  ></Certifications>
                </Tab.Pane>
                <Tab.Pane eventKey="9">
                  <Info
                    profile={data?.getMyProfile?.id}
                    setTab={toggleModal}
                    increment={incrmnt}
                  ></Info>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({ user: selectAuth });
function mapDispatchToProps(dispatch) {
  return {
    logOut: () => {
      return dispatch(logOut());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ConsultantInfo);
