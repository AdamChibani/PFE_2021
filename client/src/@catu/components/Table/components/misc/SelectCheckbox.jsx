import React, { useEffect, forwardRef, useRef } from "react";
import Checkbox from "@material-ui/core/Checkbox";

function IndeterminateCheckbox({ indeterminate, ...rest }, ref) {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} />
    </>
  );
}

export default forwardRef(IndeterminateCheckbox);
