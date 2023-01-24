import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  tableHead: {
    borderTop: "1px solid #e0e0e0",
  },
}));

function TableHeader({ headerGroups, border }) {
  const classes = useStyles();

  // Classes
  if (border === false) classes.tableHead = "";

  return (
    <TableHead className={classes.tableHead}>
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => {
            return (
              <TableCell
                className={clsx("font-bold", column.headersClasses)}
                {...(!column.sortable
                  ? column.getHeaderProps()
                  : column.getHeaderProps(column.getSortByToggleProps()))}
                style={{
                  width: column.width || "auto",
                }}
              >
                {column.render("Header")}
                {column.sortable ? (
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? "desc" : "asc"}
                    hideSortIcon={false}
                  />
                ) : null}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableHead>
  );
}

export default TableHeader;
