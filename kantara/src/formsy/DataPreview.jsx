import React from "react";
import clsx from "clsx";

export default function (props) {
  let value = props.value;
  if (typeof props.formatValue === "function")
    value = props.formatValue(value);
    
  return (
    <div
      className={clsx({
        "w-full": props.fullWidth,
      })}
    >
      <div className="font-bold pl-8 mb-4">{props.label}</div>
      <div className="bg-gray-100 rounded flex items-center py-8 px-8">
        {value || "--"}
      </div>
    </div>
  );
}
