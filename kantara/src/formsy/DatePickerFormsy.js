import React from "react";
import { withFormsy } from "formsy-react";
import _ from "./@lodash";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
  function changeValue(event) {
    const day = Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(event);
    props.setValue(day);
    if (props.onChange) {
      props.onChange(day);
    }
  }

  return (
    <MuiPickersUtilsProvider name={importedProps.name} utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...importedProps}
        inputVariant={props.variant}
        value={value}
        onChange={changeValue}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        format="dd MMMM yyyy"
        views={["year", "month", "date"]}
      />
    </MuiPickersUtilsProvider>
  );
}

export default React.memo(withFormsy(DatePickerFormsy));
