import React from "react";
import TableRow from "./TableRow";

function TableRows({ data, prepareRow, onRowClick, options }) {
  return data.map((row, i) => {
    prepareRow(row);
    return (
      <TableRow
        key={i}
        row={row}
        onRowClick={onRowClick}
        options={options}
      />
    );
  });
}

export default TableRows;
