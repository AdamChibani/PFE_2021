import _ from "@lodash";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import { withFormsy } from "formsy-react";
import React from "react";
import { useSelector } from "react-redux";
import DataPreview from "@catu/components/formsy/DataPreview";

function SelectFormsy(props) {
  const importedProps = _.pick(props, [
    "autoWidth",
    "children",
    "classes",
    "displayEmpty",
    "input",
    "inputProps",
    "MenuProps",
    "multiple",
    "native",
    "onChange",
    "onClose",
    "onOpen",
    "open",
    "renderValue",
    "SelectDisplayProps",
    "value",
    "variant",
  ]);

  // An error message is returned only if the component is invalid
  const { errorMessage, value } = props;

  function input() {
    switch (importedProps.variant) {
      case "outlined":
        return (
          <OutlinedInput labelWidth={props.label.length * 8} id={props.name} />
        );
      case "filled":
        return <FilledInput id={props.name} />;
      default:
        return <Input id={props.name} />;
    }
  }

  function changeValue(event) {
    props.setValue(event.target.value);
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

	if (!isEditable) return <DataPreview {...props} />;
	
  return (
    <FormControl
      error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
      className={props.className}
      variant={importedProps.variant}
      disabled={Boolean(props.disabled)}
    >
      {props.label && (
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      )}
      <Select
        {...importedProps}
        value={value}
        onChange={changeValue}
        input={input()}
      />
      {Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default React.memo(withFormsy(SelectFormsy));
