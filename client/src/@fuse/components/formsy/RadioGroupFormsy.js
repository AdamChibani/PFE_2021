import _ from "@lodash";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withFormsy } from "formsy-react";
import React from "react";
import { useSelector } from "react-redux";
import DataPreview from "@catu/components/formsy/DataPreview";

function RadioGroupFormsy(props) {
  const importedProps = _.pick(props, [
    "children",
    "name",
    "onBlur",
    "onChange",
    "onKeyDown",
    "variant",
  ]);

  // An error message is returned only if the component is invalid
  const { errorMessage, value } = props;

  function changeValue(event, val) {
    props.setValue(val);
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
    >
      <FormControl
        component="fieldset"
        required={props.required}
        error={Boolean(errorMessage)}
      >
        {props.label && <FormLabel component="legend">{props.label}</FormLabel>}
        <RadioGroup
          {...importedProps}
          value={value || null}
          onChange={changeValue}
        />
        {Boolean(errorMessage) && (
          <FormHelperText>{errorMessage}</FormHelperText>
        )}
      </FormControl>
    </FormControl>
  );
}

export default React.memo(withFormsy(RadioGroupFormsy));
