import React from "react";
import Link from "next/link";

import imgP from "../../assets/image/l3/png/pro-img.png";
import { Avatar } from "@material-ui/core";

const Sidebar = (props) => {
  const user = props.user;

  return (
    <>
      {/* <!-- Sidebar Start --> */}

      <div {...props}>
        <div className="pl-lg-5">
          {/* <!-- Top Start --> */}
          <div className="bg-white shadow-9 rounded-4">
            <div className="px-5 py-11 text-center border-bottom border-mercury">
              <a className="mb-4">
                {user?.profileImage ? (
                  <img className="circle-54" src={user?.profileImage} alt="" />
                ) : (
                  <Avatar className="circle-54">
                    {user?.firstName[0].toUpperCase()}
                  </Avatar>
                )}
              </a>
              <h4 className="mb-0">
                <a className="text-black-2 font-size-6 font-weight-semibold">
                  {user?.firstName}&nbsp;{user?.lastName}
                </a>
              </h4>
              <p className="mb-8">
                <a className="text-gray font-size-4">{props?.field}</a>
              </p>
              <div className="icon-link d-flex align-items-center justify-content-center flex-wrap">
                <Link href="/#">
                  <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </Link>
                <Link href="/#">
                  <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </Link>
                <Link href="/#">
                  <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                    <i className="fab fa-twitter"></i>
                  </a>
                </Link>
                <Link href="/#">
                  <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                    <i className="fab fa-dribbble"></i>
                  </a>
                </Link>
                <Link href="/#">
                  <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green">
                    <i className="fab fa-behance"></i>
                  </a>
                </Link>
              </div>
            </div>
            {/* <!-- Top End --> */}
            {/* <!-- Bottom Start --> */}
            <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
              <h5 className="text-black-2 mb-8 font-size-5">Contact Info</h5>
              {/* <!-- Single List --> */}
              <div className="mb-7">
                <p className="font-size-4 mb-0">Nationality</p>
                {user?.gender == "Male" && props?.nationality ? (
                  <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                    {props?.nationality?.male}
                  </h5>
                ) : (
                  <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                    {props?.nationality?.female}
                  </h5>
                )}
              </div>
              <div className="mb-7">
                <p className="font-size-4 mb-0">Location</p>
                <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                  Tunis , Tunisia
                </h5>
              </div>
              {/* <!-- Single List --> */}
              {/* <!-- Single List --> */}
              <div className="mb-7">
                <p className="font-size-4 mb-0">E-mail</p>
                <h5 className="font-size-4 font-weight-semibold mb-0">
                  <Link href={`mailto:${user?.email}`}>
                    <a className="text-black-2 text-break">{user?.email}</a>
                  </Link>
                </h5>
              </div>
              {/* <!-- Single List --> */}
              {/* <!-- Single List --> */}
              <div className="mb-7">
                <p className="font-size-4 mb-0">Phone</p>
                <h5 className="font-size-4 font-weight-semibold mb-0">
                  <a
                    className="text-black-2 text-break"
                    href={`tel:${user?.phone}`}
                  >
                    {props?.phone}
                  </a>
                </h5>
              </div>
              {props?.hourRate ? (
                <div className="mb-7">
                  <p className="font-size-4 mb-0">Hour rate</p>
                  <h5 className="font-size-4 font-weight-semibold mb-0">
                    <a className="text-break">{props?.hourRate}$</a>
                  </h5>
                </div>
              ) : (
                <span></span>
              )}
              {/* <!-- Single List --> */}
              {/* <!-- Single List --> */}
              {props?.website ? (
                <div className="mb-7">
                  <p className="font-size-4 mb-0">Website</p>
                  <h5 className="font-size-4 font-weight-semibold mb-0">
                    <Link href={props?.website || "/#"}>
                      <a className="text-break">{props?.website}</a>
                    </Link>
                  </h5>
                </div>
              ) : (
                <span></span>
              )}

              {/* <!-- Single List --> */}
            </div>
            {/* <!-- Bottom End --> */}
          </div>
        </div>
      </div>

      {/* <!-- Sidebar End --> */}
    </>
  );
};

export default Sidebar;
