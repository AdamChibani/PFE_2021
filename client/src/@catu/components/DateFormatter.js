import React from "react";
import { useTranslation } from "react-i18next";

function DateFormatter({ date }) {
  const { i18n, t } = useTranslation();
  let dateFormatted;
  if (isValidDate(date)) {
    dateFormatted = new Date(date);
  } else if (parseInt(date)) {
    dateFormatted = new Date(parseInt(date));
  } else {
    return <span className="text-grey italic">{t("calendar:none")}</span>;
  }
  const d = new Intl.DateTimeFormat(i18n.language).format(dateFormatted);
  return <span>{d}</span>;
}

function isValidDate(dateObject) {
  if (!dateObject) return false;
  return new Date(dateObject).toString() !== "Invalid Date";
}

export default React.memo(DateFormatter);
