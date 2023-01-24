import React from "react";
import { useTranslation } from "react-i18next";

function MoneyFormatter({ data, number, noWarp }) {
  const { i18n } = useTranslation();
  const options = number === true ? {} : {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  };
  const formatted = new Intl.NumberFormat(i18n.language, options).format(data);
  if (noWarp) return formatted;
  return <span>{formatted}</span>;
}

export default MoneyFormatter;
