import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Sidebar from "../components/Sidebar";
import { Select } from "../components/Core";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import SearchList from "../components/searchList/searchList";

import gql from "graphql-tag";
import GridSearch from "./search-grid";
import { useRouter } from "next/router";
const getCountries = gql`
  query getAll {
    getAllCountries {
      id
      name
    }
  }
`;
const getConsultants = gql`
  query getByFilter($input: Filter) {
    getByFilter(input: $input) {
      id
      user {
        id
        firstName
        lastName
        profileImage
      }
      hourRate
      years
      preferences {
        updatedAt
        name
        countries {
          name
        }
      }
      fields {
        name
      }
      skills {
        name
      }
    }
  }
`;
const defaultCountries = [];
const styles = {
  clickable: {
    cursor: "pointer",
    "&hover": {
      cursor: "pointer",
    },
  },
};

const SearchGrid = () => {
  const router = useRouter();

  useEffect(() => {
    getUsers({
      variables: { input: {} },
    });
  }, []);
  const [jobType, setJobType] = useState([]);
  const [rangeValues, setRangeValues] = useState([0, 150]);
  const [expereienceLevel, setExperienceLevel] = useState([]);
  const [years, setYears] = useState([]);

  const handleRange = (value) => {
    console.log(value);
    setRangeValues(value);
  };
  const handleExperience = (val, act) => {
    console.log(act);
    if (!act) {
      // e.preventDefault();
      setExperienceLevel([...expereienceLevel, val]);
    } else {
      expereienceLevel.splice(expereienceLevel.indexOf(val), 1);
    }
    console.log({ expereienceLevel });
  };
  const handleYears = (val, act) => {
    if (!act) {
      let v = [];
      v = val.split("-");
      if (v != "15+") v[0] -= 1;

      v[0] = v[0].toString();
      setYears([...years, v]);
    } else {
      years.splice(years.indexOf(val), 1);
    }
    console.log({ years });
  };
  const handleChange = (val, act) => {
    console.log(act);
    if (!act) {
      // e.preventDefault();
      setJobType([...jobType, val]);
    } else {
      jobType.splice(jobType.indexOf(val), 1);
    }
    console.log({ jobType });
  };
  const handleChangeSearch = (e) => {
    setJobField(e.target.value);
  };
  const handleChangeCountry = (e) => {
    setCountry(e.value);
  };

  function submit(f, c) {
    let input = {};
    console.log(typeof f);
    console.log({ jobField });
    if (jobField || (f && typeof f == String)) {
      input.field = jobField || f;
    }
    if (jobType.length > 0) {
      input.jobType = jobType;
    }
    if ((country || c) && country != 247) {
      input.country = parseInt(country) || parseInt(c);
    }
    if (rangeValues) {
      input.hourRate = rangeValues;
    }
    if (expereienceLevel.length > 0 && expereienceLevel.indexOf("All") == -1) {
      input.diploma = expereienceLevel;
    }
    if (years.length > 0) {
      input.years = years;
    }
    getUsers({
      variables: { input },
    });
  }
  const [jobField, setJobField] = useState();
  const [country, setCountry] = useState();
  const [isList, setIsList] = useState(true);
  const { data: dat } = useQuery(getCountries);
  if (defaultCountries.length < 1) {
    dat?.getAllCountries.forEach((c) => {
      defaultCountries.push({ value: c.id, label: c.name });
    });
  }
  const [getUsers, { data, loading }] = useLazyQuery(getConsultants);

  if (!loading) console.log(dat?.getAllCountries);
  useEffect(() => {
    if (
      router?.query?.field ||
      (router?.query?.countries && router?.query?.label)
    ) {
      setJobField(router?.query?.field);
      setCountry(router?.query?.countries);
      submit(router?.query?.field, router?.query?.countries);
    }
  }, [router]);

  return (
    <>
      <PageWrapper>
        <div className="bg-default-1 pt-26 pt-lg-28 pb-13 pb-lg-25">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4 col-md-5 col-xs-8">
                <Sidebar
                  props={handleChange}
                  hr={handleRange}
                  he={handleExperience}
                  hy={handleYears}
                  rangeValues={rangeValues}
                />
              </div>
              {/* <!-- Main Body --> */}
              <div className="col-12 col-xl-8 col-lg-8">
                {/* <!-- form --> */}
                {/* <form className="search-form"> */}
                <div className="filter-search-form-2 search-1-adjustment bg-white rounded-sm shadow-7 pr-6 py-6 pl-6">
                  <div className="filter-inputs">
                    <div className="form-group position-relative w-lg-45 w-xl-40 w-xxl-45">
                      <input
                        onChange={(e) => handleChangeSearch(e)}
                        className="form-control focus-reset pl-13"
                        type="text"
                        id="keyword"
                        placeholder="Search by field"
                        defaultValue={router?.query?.field || null}
                      />
                      <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                        <i className="icon icon-zoom-2 text-primary font-weight-bold"></i>
                      </span>
                    </div>
                    {/* <!-- .select-city starts --> */}
                    <div
                      style={styles.clickable}
                      className="form-group position-relative w-lg-55 w-xl-60 w-xxl-55"
                    >
                      <Select
                        options={defaultCountries}
                        className="pl-8 h-100 arrow-3 font-size-4 d-flex align-items-center w-100"
                        border={false}
                        defaultValue={
                          {
                            value: router?.query?.countries,
                            label: router?.query?.label,
                          } || null
                        }
                        onChange={(e) => handleChangeCountry(e)}
                      />
                      <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                        <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
                      </span>
                    </div>
                    {/* <!-- ./select-city ends --> */}
                  </div>
                  <div className="button-block">
                    <button
                      onClick={submit}
                      className="btn btn-primary line-height-reset h-100 btn-submit w-100 text-uppercase"
                    >
                      Search
                    </button>
                  </div>
                </div>
                {/* </form> */}
                <div className="pt-12">
                  <div className="d-flex align-items-center justify-content-between mb-6">
                    <h5 className="font-size-4 font-weight-normal text-gray">
                      <span className="heading-default-color">
                        {data?.getByFilter?.length || 0}
                      </span>{" "}
                      result for{" "}
                      <span className="heading-default-color">{jobField}</span>
                    </h5>
                    <div className="d-flex align-items-center result-view-type">
                      <a
                        style={styles.clickable}
                        className={
                          isList
                            ? "active heading-default-color pl-5 font-size-6 hover-text-hitgray"
                            : "heading-default-color pl-5 font-size-6 hover-text-hitgray"
                        }
                        onClick={() => setIsList(true)}
                      >
                        <i className="fa fa-list-ul"></i>
                      </a>
                      <a
                        style={styles.clickable}
                        className={
                          !isList
                            ? "active heading-default-color pl-5 font-size-6 hover-text-hitgray"
                            : "heading-default-color pl-5 font-size-6 hover-text-hitgray"
                        }
                        onClick={() => setIsList(false)}
                      >
                        <i className="fa fa-th-large"></i>
                      </a>
                    </div>
                  </div>

                  {isList ? (
                    data?.getByFilter.map((u, i) => <SearchList u={u} />)
                  ) : (
                    <div className="pt-6">
                      <div className="row justify-content-center">
                        {data?.getByFilter.map((u, i) => (
                          <GridSearch u={u} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-center pt-5 pt-lg-13"></div>
                </div>
                {/* <!-- form end --> */}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default SearchGrid;
