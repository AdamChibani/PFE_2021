import React, { useEffect, useRef, useState } from "react";
import Switch from "@material-ui/core/Switch";
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions";

function UserSwitchComponent(props) {
  const valueRef = useRef(null);
  const dispatch = useDispatch();
  const [value, setValue] = useState(props.value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props]);

  function handleChange() {
    setLoading(true);
    Actions.toggleUserActivation(props.userId, !value, dispatch).then(() => {
      setLoading(false);
    });
  }

  return (
    <Switch
      value="actif"
      checked={value}
      ref={valueRef}
      onChange={handleChange}
      disabled={loading}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
}

export default UserSwitchComponent;
