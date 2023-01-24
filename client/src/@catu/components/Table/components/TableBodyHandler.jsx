import React from "react";
import TableBody from "@material-ui/core/TableBody";
import ErrorComponent from "./bodies/Error";
import NoDataComponent from "./bodies/NoData";
import LoadingComponent from "./bodies/Loading";
import TableRows from "./bodies/TableRows";

function TableBodyHandler(props) {
  const { colNumber, refetch, loading, error, data, columns } = props;
  
  if (loading)
    return <LoadingComponent selectable={props.selectable} columns={columns} />;

  if (error || !Array.isArray(data))
    return <ErrorComponent colNumber={colNumber} retry={refetch} />;

  if (data.length === 0)
    return <NoDataComponent colNumber={colNumber} retry={refetch} />;

  return <TableRows {...props} />;
}

function Wrapper(props) {
  return (
    <TableBody>
      <TableBodyHandler {...props} />
    </TableBody>
  );
}

export default Wrapper;
