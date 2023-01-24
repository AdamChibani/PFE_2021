import FuseChipSelect from "@fuse/components/FuseChipSelect/FuseChipSelect";
import _ from "@lodash";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import clsx from "clsx";
import { withFormsy } from "formsy-react";
import React from "react";
import { useSelector } from "react-redux";
import DataPreview from "@catu/components/formsy/DataPreview";

function FuseChipSelectFormsy(props) {
  const importedProps = _.pick(props, [
    "children",
    "classes",
    "className",
    "defaultValue",
    "disabled",
    "fullWidth",
    "id",
    "label",
    "name",
    "onBlur",
    "onChange",
    "onFocus",
    "placeholder",
    "required",
    "textFieldProps",
    "variant",
    "isMulti",
    "options",
    "errorMessage",
  ]);

  // An error message is returned only if the component is invalid
  const { errorMessage, value } = props;

  function changeValue(val, selectedOptions) {
    if (props.multiple) {
      props.setValue(selectedOptions.map((option) => option.value));
    } else {
      props.setValue(val);
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
    <FormControl
      error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
      className={clsx(
        props.className,
        "z-10",
        props.showRequired ? "required" : "",
        props.showError ? "error" : null
      )}
      variant={importedProps.variant}
    >
      {props.label && (
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      )}
      <FuseChipSelect
        {...importedProps}
        value={value}
        onChange={changeValue}
        error={Boolean(
          (!props.isPristine && props.showRequired) || errorMessage
        )}
      />
      {Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default React.memo(withFormsy(FuseChipSelectFormsy));
