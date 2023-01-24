import React from "react";
import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import Sidebar from "../components/Sidebar";
import { Select } from "../components/Core";

import imgB1 from "../assets/image/l1/png/feature-brand-1.png";
import imgB2 from "../assets/image/l1/png/feature-brand-2.png";
import imgB3 from "../assets/image/l1/png/feature-brand-3.png";
import imgB4 from "../assets/image/l1/png/feature-brand-4.png";
import imgB5 from "../assets/image/l1/png/feature-brand-5.png";
import imgB6 from "../assets/image/l1/png/feature-brand-6.png";

const defaultCountries = [
  { value: "sp", label: "Singapore" },
  { value: "bd", label: "Bangladesh" },
  { value: "usa", label: "United States of America" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "pk", label: "Pakistan" },
];

const GridSearch = (props) => {
  const toDate = (d) => {
    console.log(d);
    const date = new Date(parseInt(d));
    console.log({ date });
    const today = new Date();
    var Difference_In_Time = today.getTime() - date.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));
    console.log({ Difference_In_Days });
    if (Difference_In_Days < 1) return "Today";
    else if (Difference_In_Days === 1) return Difference_In_Days + " Day ago";
    else return Difference_In_Days + " Days ago";
  };
  const u = props.u;
  return (
    <div className="col-12 col-lg-6">
      <div className="bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments">
        <div className="d-block mb-7">
          <Link
            href={{
              pathname: "/candidate-profile",
              query: { profile: u.id },
            }}
          >
            <a>
              <img src={u.user.profileImage} alt="Profile image" />
            </a>
          </Link>
        </div>
        <Link
          href={{
            pathname: "/candidate-profile",
            query: { profile: u.id },
          }}
        >
          <a className="font-size-3 d-block mb-0 text-gray">
            {u.user.lastName}&nbsp;{u.user.firstName}
          </a>
        </Link>
        <h2 className="mt-n4">
          <Link
            href={{
              pathname: "/candidate-profile",
              query: { profile: u.id },
            }}
          >
            <a className="font-size-7 text-black-2 font-weight-bold mb-4">
              {u.fields[0]?.name}
            </a>
          </Link>
        </h2>
        <ul className="list-unstyled mb-1 card-tag-list">
          {u?.preferences[0]?.countries.map((s, j) =>
            j < 3 ? (
              <li>
                <Link href="/#">
                  <a className="bg-regent-opacity-15 text-denim font-size-3 rounded-3">
                    <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>
                    {s.name}
                  </a>
                </Link>
              </li>
            ) : (
              <span></span>
            )
          )}
          <li>
            <Link href="/#">
              <a className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                {u.preferences[0].name}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#">
              <a className="bg-regent-opacity-15 text-eastern font-size-3 rounded-3">
                <i className="fa fa-dollar-sign mr-2 font-weight-bold"></i>{" "}
                {u.hourRate}
              </a>
            </Link>
          </li>
        </ul>
        <p className="mb-7 font-size-4 text-gray">
          We are looking for Enrollment Advisors who are looking to take 30-35
          appointments per week. All leads are pre-scheduled.
        </p>
        <div className="card-btn-group">
          <Link href="/#">
            <a className="btn btn-green text-uppercase btn-medium rounded-3">
              Apply Now
            </a>
          </Link>
          <Link href="/#">
            <a className="btn btn-outline-mercury text-black-2 text-uppercase btn-medium rounded-3">
              <i className="icon icon-bookmark-2 font-weight-bold mr-4 font-size-4"></i>{" "}
              Save it
            </a>
          </Link>
        </div>
      </div>
      {/* <!-- End Feature One --> */}
    </div>
  );
};
export default GridSearch;
