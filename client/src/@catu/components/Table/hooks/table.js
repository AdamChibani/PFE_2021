import React from "react";
import SelectCheckbox from "../components/misc/SelectCheckbox";
import ExpandBtn from "../components/misc/ExpandBtn";
import ExpandBtnHeader from "../components/misc/ExpandBtnHeader";

export default function ({ selectable, subRow }) {
  // Adding a selectable column if seletable is true
  return (hooks) => {
    hooks.allColumns.push((columns) => {
      // Selectable
      if (selectable)
        columns = [
          {
            id: "selection",
            sortable: false,
            width: "5%",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <SelectCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <SelectCheckbox
                  {...row.getToggleRowSelectedProps()}
                  onClick={(ev) => ev.stopPropagation()}
                />
              </div>
            ),
          },
          ...columns,
        ];
      // Sub row
      if (subRow)
        columns = [
          {
            id: "subRow",
            sortable: false,
            width: "5%",
            Header: ({ getToggleAllRowsExpandedProps }) => (
              <ExpandBtnHeader {...getToggleAllRowsExpandedProps()} />
            ),
            Cell: ({ row }) => (
              <ExpandBtn
                value={row.isExpanded}
                onClick={() => row.toggleRowExpanded()}
              />
            ),
          },
          ...columns,
        ];

      return columns;
    });
  };
}
