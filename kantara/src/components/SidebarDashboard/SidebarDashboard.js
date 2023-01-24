import React, { useContext } from "react";
import Link from "next/link";
import { Collapse } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import imgL from "../../assets/image/logo-main-black.png";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectAuth from "../../redux/user/userSelector";

const Sidebar = (props) => {
  const gContext = useContext(GlobalContext);

  return (
    <>
      <Collapse in={gContext.showSidebarDashboard}>
        <div className="dashboard-sidebar-wrapper pt-11 " id="sidebar">
          <div className="brand-logo px-11">
            <Link href="/">
              <a>
                <img src={imgL} alt="" />
              </a>
            </Link>
          </div>
          <ul className="list-unstyled dashboard-layout-sidebar d-flex flex-column justify-content-center h-100">
            <li className="">
              <Link href="/dashboard-main">
                <a className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                  <i className="icon icon-layout-11 mr-7"></i>Dashboard
                </a>
              </Link>
            </li>

            <li className="">
              <Link href="/dashboard-inbox">
                <a className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                  <i className="fas fa-inbox mr-7"></i>Inbox
                </a>
              </Link>
            </li>
            {props?.user?.user?.role?.id != 3 ? (
              ""
            ) : (
              <li className="">
                <Link href="/dashboard-settings">
                  <a className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center">
                    <i className="fas fa-cog mr-7"></i>Agency
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Collapse>
      <a
        href="/#"
        className="sidebar-mobile-button"
        onClick={(e) => {
          e.preventDefault();
          gContext.toggleSidebarDashboard();
        }}
      >
        <i className="icon icon-sidebar-2"></i>
      </a>
    </>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(Sidebar);
