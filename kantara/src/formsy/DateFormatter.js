import React from "react";

function DateFormatter({ date }) {
  let dateFormatted;
  if (isValidDate(date)) {
    dateFormatted = new Date(date);
  } else if (parseInt(date)) {
    dateFormatted = new Date(parseInt(date));
  } else {
    return <span className="text-grey italic">Calender</span>;
  }
  const d = new Intl.DateTimeFormat("en-US").format(dateFormatted);
  return <span>{d}</span>;
}

function isValidDate(dateObject) {
  if (!dateObject) return false;
  return new Date(dateObject).toString() !== "Invalid Date";
}

export default React.memo(DateFormatter);
