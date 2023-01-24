import React, { useEffect, forwardRef, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "6px",
    margin: "2px",
  },
});

function ExpandBtn({ indeterminate, value, onClick, ...rest }, ref) {
  const classes = useStyles();
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <IconButton ref={resolvedRef} onClick={onClick} classes={classes}>
      {value ? <RemoveCircleIcon /> : <AddCircle />}
    </IconButton>
  );
}

export default forwardRef(ExpandBtn);
