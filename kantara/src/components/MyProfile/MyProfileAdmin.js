import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CreateIcon from "@material-ui/icons/Create";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import selectAuth from "../../redux/user/userSelector";
import styles from "./my_profile.module.css";
import Offices from "./components/company/offices/offices";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classes from "./MyProfileAdmin.module.css";
import { useState } from "react";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "../../formsy";
import { Button } from "@material-ui/core";
const GET_COMPANY_QUERY = gql`
  query d($id: Int!) {
    getCompanyByAdmin(id: $id) {
      id
      enterpriseSize
      taxId
      fields {
        id
        name
        specialty
      }
    }
  }
`;

function MyProfileAdmin(props) {
  const { data, loading } = useQuery(GET_COMPANY_QUERY, {
    variables: { id: props?.user?.user?.id },
  });
  const [editNum, setEditNum] = useState(false);
  const [editField, setEditField] = useState(false);
  const [validation, setValidation] = useState(false);
  const enableButton = () => {
    setValidation(true);
  };
  const disableButton = () => {
    setValidation(false);
  };
  
  return (
    <div className=" col-lg-8 bg-white rounded-4 shadow-9">
      <div className="pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
          Company's info{" "}
          <CreateIcon
            className={styles["edit"]}
            onClick={() => setEditNum(!editNum)}
          />
        </h4>

        {!editNum ? (
          <>
            {" "}
            <h5 className="font-size-4 font-weight-normal mb-0 text-black-2 text-break">
              {data?.getCompanyByAdmin?.enterpriseSize}
              {" Employees"}
            </h5>
            <h5 className="font-size-4 font-weight-normal mb-0 text-black-2 text-break">
              Tax ID: {data?.getCompanyByAdmin?.taxId}
            </h5>
          </>
        ) : (
          <Formsy onValid={enableButton} onInvalid={disableButton}>
            <TextFieldFormsy
              label="Number of employees"
              validations={{
                maxLength: 6,
                matchRegexp: /^[0-9]*$/,
              }}
              validationErrors={{
                maxLength: "Maximum length is 6",
                matchRegexp: "Only nubmers are allowed",
              }}
              type="text"
              name="enterprise_size"
              id="enterpriseSize-edit"
              variant="outlined"
              required
              value={data?.getCompanyByAdmin?.enterpriseSize.toString()}
            />
            <TextFieldFormsy
              required
              type="text"
              label="tax id"
              validations={{
                maxLength: 15,
                matchRegexp: /^[0-9]*$/,
              }}
              validationErrors={{
                maxLength: "Maximum length is 15",
                matchRegexp: "Only nubmers are allowed",
              }}
              id="taxId"
              name="taxId"
              value={data?.getCompanyByAdmin?.taxId.toString()}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              id="update-button"
              className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
              aria-label="update"
              disabled={!validation}
              value="legacy"
            >
              <b>Update</b>
            </Button>
          </Formsy>
        )}
      </div>
      <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        <Offices id={data?.getCompanyByAdmin?.id} />{" "}
      </div>

      <div className="border-top pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
        {" "}
        <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
          Fields
          <CreateIcon
            className={styles["edit"]}
            onClick={() => setEditField(!editField)}
          />
        </h4>
        <ul className="list-unstyled d-flex flex-row  flex-wrap ">
          {data?.getCompanyByAdmin?.fields?.map((f, key) => {
            return (
              <li key={key} className="mr-5">
                <Accordion
                  classes={{
                    root: classes.accord,
                    expanded: classes["accord-expanded"],
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    {f?.name}
                  </AccordionSummary>
                  <AccordionDetails className="d-flex flex-column">
                    <a className="bg-light text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 align-items-center">
                      Adam
                    </a>
                    <a className="bg-light text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 align-items-center">
                      Hbib
                    </a>
                    <a className="bg-light text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 align-items-center">
                      Bilel
                    </a>
                  </AccordionDetails>
                </Accordion>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(MyProfileAdmin);
