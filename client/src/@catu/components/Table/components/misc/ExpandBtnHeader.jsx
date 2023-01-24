import React, { useEffect, forwardRef, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

function ExpandBtn({ indeterminate, onClick }, ref) {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  const [value, setValue] = React.useState(false);

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  const handleClick = () => {
    onClick();
    setValue(!value);
  };

  return (
    <IconButton ref={resolvedRef} onClick={handleClick}>
      {value ? <RemoveCircleIcon /> : <AddCircle />}
    </IconButton>
  );
}

export default forwardRef(ExpandBtn);
