import React from "react";
import ReactTimeAgo from "react-time-ago";
import { useTranslation } from "react-i18next";
import moment from "moment";

function TimeAgo({ date }) {
  const { i18n, t } = useTranslation();
  let dateFormatted;
  if (moment(date).isValid()) {
    dateFormatted = new Date(date);
  } else if (parseInt(date)) {
    dateFormatted = new Date(parseInt(date));
  } else {
  return <span className="text-grey italic">{t("calendar:never")}</span>;
  }
  return <span className="italic"><ReactTimeAgo date={dateFormatted} locale={i18n.language} /></span>;
}

export default React.memo(TimeAgo);
