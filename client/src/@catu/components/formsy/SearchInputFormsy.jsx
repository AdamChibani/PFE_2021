import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
// import FormHelperText from "@material-ui/core/FormHelperText";
import { withFormsy } from "formsy-react";
import _ from "@lodash";
import { useSelector } from "react-redux";
import DataPreview from "@catu/components/formsy/DataPreview";

function InputBaseFormsy(props) {
  const importedProps = _.pick(props, [
    "autoComplete",
    "autoFocus",
    "children",
    "className",
    "classes",
    "color",
    "defaultValue",
    "disabled",
    "endAdornment",
    "fullWidth",
    "id",
    "inputComponent",
    "inputProps",
    "inputRef",
    "margin",
    "multiline",
    "name",
    "onBlur",
    "placeholder",
    "readOnly",
    "required",
    "rows",
    "rowsMax",
    "rowsMin",
    "startAdornment",
    "type",
  ]);

  const { errorMessage } = props;
  const value = props.value || "";

  function handleChange(event) {
    props.setValue(event.currentTarget.value);
    if (typeof props.onChange === "function") {
      props.onChange(event);
    }
  }
  
  const isEditable = useSelector((state) => {
    try {
      if (props.toggleEditable === true && state[props.store])
        return state[props.store].form.isEditable;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.log({ error });
    }
    return true;
  });

  if (!isEditable) return <DataPreview {...props} />;

  return (
    <InputBase
      {...importedProps}
      error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
      value={value}
      onChange={handleChange}
    />
  );
}

export default React.memo(withFormsy(InputBaseFormsy));
