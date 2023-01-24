import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiTableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useTranslation } from "react-i18next";
import TablePaginationActions from "./TablePaginationActions";

const useStyles = makeStyles(() => ({
  tableFooter: {
    bottom: "1px solid #e0e0e0",
  },
}));

function TableFooter(props) {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { border, colNumber, handlers, count } = props;

  if (border === false) classes.tableFooter = "";
  const rows = [5, 10, 25, { label: t("table.all"), value: count + 1 }];

  if (props.hide) return null;
  return (
    <MuiTableFooter className={classes.tableFooter}>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={rows}
          labelDisplayedRows={({ from, to, count, page }) => {
            let display = from;
            switch (to) {
              case -1:
                display += `-${count}`;
                break;
              case from:
                break;
              default:
                display += `-${to}`;
                break;
            }
            let string = display + " " + t("table.of");
            if (count !== -1)
              string = string + " " + t("table.more_than", { count: to });
            return string;
          }}
          colSpan={colNumber}
          count={count}
          rowsPerPage={props.pageSize}
          page={props.pageIndex}
          SelectProps={{
            inputProps: { "aria-label": t("table.rows_per_page") },
            native: false,
          }}
          labelRowsPerPage={t("table.rows_per_page")}
          onChangePage={handlers.handleChangePage}
          onChangeRowsPerPage={handlers.handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </MuiTableFooter>
  );
}

export default TableFooter;
