import React from "react";
import clsx from "clsx";
import DateFormatter from "@catu/components/DateFormatter";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  card: {
    borderLeft: "2px solid",
    paddingLeft: "15px",
    borderColor: theme.palette.primary,
    marginBottom: "10px",
  },
}));

function HolidayCard({ start, end, name }) {
  const classes = useStyle();
  const { t } = useTranslation();

  const today = moment();
  const timestamp = parseInt(end ? end : start);
  const holiday = moment(timestamp);
  const pastEvent = holiday.isBefore(today, "days");

  return (
    <div
      className={clsx({
        [classes.card]: true,
        "w-full md:w-1/3": true,
        "opacity-50": pastEvent,
      })}
    >
      <div className="text-gray-600">
        {name}
        {pastEvent && <i> - {t("calendar:past_event").toLowerCase()}</i>}
      </div>
      <strong>
        <DateFormatter date={start} />
        {" " + t("calendar:to") + " "}
        <DateFormatter date={end} />
      </strong>
    </div>
  );
}

export default React.memo(HolidayCard);
