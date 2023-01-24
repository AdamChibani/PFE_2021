import React, { useRef, useState } from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import { TextFieldFormsy } from "../formsy";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

function randomPasssword(pwdLen = 12) {
  var pwdChars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%!?";
  var randPassword = Array(pwdLen)
    .fill(pwdChars)
    .map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
    .join("");
  return randPassword;
}

function PasswordFormsy(props) {
  const [visible, setVisible] = useState(false);
  const { value, setValue } = props;
  const textFieldRef = useRef(null);
  return (
    <TextFieldFormsy
      type={visible ? "text" : "password"}
      value={value}
      ref={textFieldRef}
      validations={props.disableValidation ? {} : "minLength:8"}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setVisible(!visible)}
            >
              {!visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

export default PasswordFormsy;
