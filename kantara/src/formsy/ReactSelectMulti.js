import Select from "react-select";
import { withFormsy } from "formsy-react";
import React from "react";
function ReactSelectMulti(props) {
  function changeValue(event) {
    props.setValue(event);
    if (props.onChange) {
      props.onChange(event);
    }
  }

  return props.isMulti == false ? (
    <Select
      id={props.name}
      defaultValue={props.value}
      options={props.options}
      onChange={(e) => changeValue(e)}
      placeholder={props.placeholder || "Select..."}
      isClearable={props.isClearable && true}
    />
  ) : (
    <Select
      id={props.name}
      defaultValue={props.value}
      options={props.options}
      onChange={(e) => changeValue(e)}
      isClearable={props.isClearable && true}
      isMulti
    />
  );
}
export default React.memo(withFormsy(ReactSelectMulti));
