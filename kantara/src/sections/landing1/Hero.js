import React, { useState } from "react";
import Link from "next/link";

import { Select } from "../../components/Core";
import imgH from "../../assets/image/l1/png/hero-image-man.png";
import imgP from "../../assets/image/patterns/hero-pattern.png";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
const getCountries = gql`
  query getAll {
    getAllCountries {
      id
      name
    }
  }
`;

const Hero = () => {
  const [field, setField] = useState("");
  const [countries, setCountries] = useState();
  const [label, setLabel] = useState();

  const defaultCountries = [];
  const { data: dat } = useQuery(getCountries);
  if (defaultCountries.length < 1) {
    dat?.getAllCountries.forEach((c) => {
      defaultCountries.push({ value: c.id, label: c.name });
    });
  }
  return (
    <>
      {/* <!-- Hero Area --> */}
      <div className="bg-gradient-1 pt-26 pt-md-32 pt-lg-33 pt-xl-35 position-relative z-index-1 overflow-hidden">
        {/* <!-- .Hero pattern --> */}
        <div className="pos-abs-tr w-50 z-index-n2">
          <img src={imgP} alt="" className="gr-opacity-1" />
        </div>
        {/* <!-- ./Hero pattern --> */}
        <div className="container">
          <div className="row position-relative align-items-center">
            <div
              className="col-xxl-6 col-xl-7 col-lg-8 col-md-12 pt-lg-13 pb-lg-33 pb-xl-34 pb-md-33 pb-10"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <h1 className="font-size-11 mb-12 pr-md-30 pr-lg-0">
                Find the consultant that you need.
              </h1>
              <div className="">
                {/* <!-- .search-form --> */}
                <form className="search-form shadow-6">
                  <div className="filter-search-form-1 bg-white rounded-sm shadow-4">
                    <div className="filter-inputs">
                      <div className="form-group position-relative">
                        <input
                          className="form-control focus-reset pl-13"
                          type="text"
                          id="keyword"
                          placeholder="Field of experience"
                          onChange={(e) => setField(e.target.value)}
                        />
                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- .select-city starts --> */}
                      <div className="form-group position-relative">
                        <Select
                          options={defaultCountries}
                          className="pl-8 h-100 arrow-3 font-size-4 d-flex align-items-center w-100"
                          border={false}
                          onChange={(e) => {
                            setCountries(e.value);
                            setLabel(e.label);
                          }}
                        />

                        <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                          <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
                        </span>
                      </div>
                      {/* <!-- ./select-city ends --> */}
                    </div>
                    {/* <!-- .Hero Button --> */}
                    <div className="button-block">
                      <Link
                        href={{
                          pathname: "/search-list",
                          query: {
                            field: field,
                            countries: countries,
                            label: label,
                          },
                        }}
                      >
                        <button className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase">
                          Search
                        </button>
                      </Link>
                    </div>
                    {/* <!-- ./Hero Button --> */}
                  </div>
                </form>
                {/* <!-- ./search-form --> */}
                <p className="heading-default-color font-size-3 pt-7">
                  <span className="text-smoke">Search keywords e.g.</span>{" "}
                  Digital Business
                </p>
              </div>
            </div>
            {/* <!-- Hero Right Image --> */}
            <div
              className="col-lg-6 col-md-4 col-sm-6 col-xs-6 col-8 pos-abs-br z-index-n1 position-static position-md-absolute mx-auto ml-md-auto"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <div className=" ml-xxl-23 ml-xl-12 ml-md-7">
                <img src={imgH} alt="" className="w-100" />
              </div>
            </div>
            {/* <!-- ./Hero Right Image --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
