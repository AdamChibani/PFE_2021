import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import * as contactService from "app/services/graphql/portal/phone_assistance/contact.service";
import * as holidayService from "app/services/graphql/portal/phone_assistance/holidays.service";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import moment from "moment";
import MuiAlert from "@material-ui/lab/Alert";
import DateFormatter from "@catu/components/DateFormatter";
import HolidayCard from "./HolidayCard";

function Alert(props) {
  return <MuiAlert elevation={0} variant="filled" {...props} />;
}

const useStyle = makeStyles((theme) => ({
  phonenumber: {
    borderLeft: "2px solid",
    paddingLeft: "15px",
    borderColor: theme.palette.primary,
    marginBottom: "10px",
    width: "33%",
  },
}));

function AssistancePage() {
  const classes = useStyle();
  const { i18n, t } = useTranslation();
  const [contacts, setContacts] = useState(null);
  const [holidays, setHolidays] = useState(null);

  useEffect(() => {
    const tkrHandleError = (error) => {
      if (process.env.NODE_ENV !== "production") console.error(error);
    };
    // Get contact informations
    contactService
      .get()
      .then((response) => {
        if (Array.isArray(response)) {
          setContacts(response);
        } else {
          setContacts([]);
        }
      })
      .catch(tkrHandleError);
    // Get holidays
    holidayService
      .get(null, 2020)
      .then((response) => {
        setHolidays(response || []);
      })
      .catch(tkrHandleError);
  }, []);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
  };
  const intl = new Intl.DateTimeFormat(i18n.language, options);

  const today = moment();
  const todayIsOff = (holidays || []).find((item) => {
    const start_date = moment(item.start_date);
    const end_date = moment(item.end_date);
    console.log({
      s: start_date.diff(today, "days"),
      e: end_date.diff(today, "days"),
    });
    return (
      start_date.diff(today, "days") <= 0 && end_date.diff(today, "days") >= 0
    );
  });

  return (
    <div className="p-16 max-w-2xl">
      <Typography variant="h4" component="h2" gutterBottom className="mt-32">
        {t("app:contact_nominis_support_and_customer_service")}
      </Typography>
      <Typography
        variant="body2"
        component="div"
        gutterBottom
        className="text-gray-800 mb-20"
      >
        <p>{t("app:description_line_01")}</p>
        <p>{t("app:description_line_02")}</p>
      </Typography>
      {todayIsOff && (
        <Alert severity="warning">
          {t("app:we_are_off_until_date", {
            date: intl.format(new Date(todayIsOff.end_date)),
          })}
        </Alert>
      )}
      <Typography variant="h6" component="h3" className="mt-16">
        {t("app:contacts")}
      </Typography>
      <Typography
        variant="body2"
        component="p"
        gutterBottom
        className="text-grey mb-16"
      >
        {t("app:do_not_hesitate_to_contact_us_by_phone")}
        <br /> {t("app:telephone_charges_apply_for_local_and_national_calls")}.
      </Typography>
      <div className="flex flex-wrap">
        {(contacts || []).map((el, key) => {
          if (el.type !== "email")
            return (
              <div className={classes.phonenumber} key={key}>
                <div className="text-gray-600">{t(el.type)}</div>
                <a href={`${el.type === "fax" ? "fax" : "tel"}:${el.value}`}>
                  {el.value}
                </a>
              </div>
            );
          return null;
        })}
      </div>
      <Typography variant="h6" component="h3" className="mt-16">
        {t("email", { count: 2 })}:
      </Typography>
      <Typography
        variant="body2"
        component="p"
        gutterBottom
        className="text-grey mb-16"
      >
        {t("app:email_sub_title")}
      </Typography>
      <div className="flex flex-wrap">
        {(contacts || []).map((el, key) => {
          if (el.type === "email")
            return (
              <div className={classes.phonenumber} key={key}>
                <div className="text-gray-600">{t("email")}</div>
                <a href={`mailto:${el.value}`}>{el.value}</a>
              </div>
            );
          return null;
        })}
      </div>
      <Typography variant="h6" component="h3" className="mt-16">
        {t("app:next_holidays")} :
      </Typography>
      <Typography
        variant="body2"
        component="p"
        gutterBottom
        className="text-grey mb-16"
      >
        {t("app:holidays_sub_title")}
      </Typography>
      {(holidays || []).map(({ name, end_date, start_date }, key) => (
        <HolidayCard start={start_date} end={end_date} name={name} key={key} />
      ))}
    </div>
  );
}

export default AssistancePage;
