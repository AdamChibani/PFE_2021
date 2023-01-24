import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Tooltip from "@material-ui/core/Tooltip";
import RefetchButton from "../buttons/RefetchButton";

function ToolbarActions({ filter, selecting, refetch }) {
  return (
    <>
      {filter && (
        <div>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <RefetchButton refetch={refetch} />
      {selecting && (
        <div>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export default ToolbarActions;
