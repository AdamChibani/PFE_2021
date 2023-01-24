import React from "react";
import { withFormsy } from "formsy-react";
import _ from "@lodash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector } from "react-redux";
import DataPreview from "./formsy/DataPreview";
import DateFormatter from "./DateFormatter";

function DatePickerFormsy(props) {
  const importedProps = _.pick(props, [
    "autoComplete",
    "autoFocus",
    "children",
    "className",
    "disabled",
    "disableToolbar",
    "FormHelperTextProps",
    "format",
    "fullWidth",
    "id",
    "InputLabelProps",
    "inputProps",
    "InputProps",
    "inputRef",
    "label",
    "margin",
    "multiline",
    "name",
    "onBlur",
    "onChange",
    "onFocus",
    "placeholder",
    "required",
    "rows",
    "rowsMax",
    "select",
    "SelectProps",
    "type",
    "variant",
    "margin",
  ]);

  // An error message is returned only if the component is invalid
  const errorMessage = props.errorMessage;
  const value = props.value;
  //console.log(value);
  function changeValue(event, value) {
    //console.log(event);
    props.setValue(event);
    if (props.onChange) {
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

  if (!isEditable)
    return (
      <DataPreview {...props} value={<DateFormatter date={props.value} />} />
    );

  return (
    <MuiPickersUtilsProvider name={importedProps.name} utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...importedProps}
        inputVariant={props.variant}
        value={value}
        onChange={changeValue}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        views={["year", "month", "date"]}
      />
    </MuiPickersUtilsProvider>
  );
}

export default React.memo(withFormsy(DatePickerFormsy));
