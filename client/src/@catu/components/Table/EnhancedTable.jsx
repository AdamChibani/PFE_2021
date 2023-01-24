import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useExpanded,
} from "react-table";
import TableToolbar from "./components/TableToolbar";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBodyHandler";
import TableFooter from "./components/TableFooter";
import tableHooks from "./hooks/table";

function EnhancedTable(props) {
  // Get the props
  const { data, onRowClick, loading, filter, error } = props;

  // Get the options
  let options = props.options || {};
  options.selectable = options.selectable || props.selectable || false;
  options.subRow = options.subRow || false;

  // React table plugins (order is important)
  const plugins = [useGlobalFilter, useSortBy];
  if (options.subRow) plugins.push(useExpanded);
  plugins.push(usePagination);
  if (options.selectable) plugins.push(useRowSelect);
  plugins.push(tableHooks(options));

  const {
    columns,
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state,
  } = useTable(
    {
      columns: props.columns,
      data,
      autoResetPage: true,
      initialState: {
        pageSize: options
          ? options.initialPageSize && options.initialPageSize >= 5
            ? options.initialPageSize
            : 10
          : 10,
      },
    },
    ...plugins
  );

  // Table states
  const { pageIndex, pageSize, selectedRowIds } = state;

  // Pagging handlers
  const handleChangePage = (e, newPage) => gotoPage(newPage);
  const handleChangeRowsPerPage = (event) => setPageSize(event.target.value);

  // Columns number
  let colNumber = columns.length;
  if (options.selectable) colNumber++;
  if (options.subRow) colNumber++;

  return (
    <TableContainer className={props.classesNames}>
      <TableToolbar
        filter={filter}
        numSelected={Object.keys(selectedRowIds || {}).length}
        refetch={options && options.refetch}
        {...props}
      />
      <Table {...getTableProps()}>
        <TableHeader headerGroups={headerGroups} border={options.border_top} />
        <TableBody
          error={error}
          loading={loading}
          colNumber={colNumber}
          data={page}
          columns={columns}
          refetch={options && options.refetch}
          {...{
            prepareRow,
            onRowClick,
            selectable: options.selectable,
            options,
          }}
        />
        <TableFooter
          hide={options.footer}
          border={options.border_bottom}
          colNumber={colNumber}
          count={data.length}
          pageSize={pageSize}
          pageIndex={pageIndex}
          handlers={{
            handleChangePage,
            handleChangeRowsPerPage,
          }}
        />
      </Table>
    </TableContainer>
  );
}

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  selectable: PropTypes.bool,
  loading: PropTypes.bool,
  classesNames: PropTypes.string,
  dense: PropTypes.bool,
};

EnhancedTable.defaultProps = {
  loading: false,
  classesNames: "min-h-full",
};

export default EnhancedTable;
