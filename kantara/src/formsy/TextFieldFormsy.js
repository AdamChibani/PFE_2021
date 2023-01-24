import React from "react";
import _ from "./@lodash";
import TextField from "@material-ui/core/TextField";
import { withFormsy } from "formsy-react";

const Styles = {
  root: { zIndex: 0 },
};
function TextFieldFormsy(props) {
  const importedProps = _.pick(props, [
    "autoComplete",
    "autoFocus",
    "children",
    "className",
    "defaultValue",
    "disabled",
    "FormHelperTextProps",
    "fullWidth",
    "id",
    "InputLabelProps",
    "inputProps",
    "InputProps",
    "inputRef",
    "label",
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

  const { errorMessage } = props;
  const value = props.value || "";

  function changeValue(event) {
    let value = event.currentTarget.value;
    if (props.type === "number") value = Number(value);
    props.setValue(value);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  // const isEditable = useSelector((state) => {
  //   try {
  //     if (props.toggleEditable === true && state[props.store])
  //       return state[props.store].form.isEditable;
  //   } catch (error) {
  //     if (process.env.NODE_ENV !== "production") console.log({ error });
  //   }
  //   return true;
  // });

  // if (!isEditable) return <DataPreview {...props} />;

  return (
    <TextField
      {...importedProps}
      onChange={changeValue}
      value={value}
      error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
      helperText={errorMessage}
      style={Styles.root}
    />
  );
}

export default React.memo(withFormsy(TextFieldFormsy));
