import React, { useState } from "react";
import _ from "@lodash";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import { useTranslation } from "react-i18next";
import Tooltip from "@material-ui/core/Tooltip";
import MaskedInput from "react-text-mask";
import { withFormsy, addValidationRule } from "formsy-react";
import { TextFieldFormsy, SelectFormsy } from "@fuse";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    flexDirection: "initial",
    verticalAlign: "top",
  },
  formGroup: {
    flexDirection: "initial",
    width: "100%",
    padding: "11px 0px",
  },
  formGroup_outlined: {
    border: "1px solid",
    borderRadius: "4px",
    borderColor: "rgba(0, 0, 0, 0.23)",
    marginTop: "1px",
    marginBottom: "1px",
    paddingLeft: "1px",
    paddingRight: "1px",
    "&:hover": {
      borderColor: "rgba(0, 0, 0, 0.87)",
    },
  },
  hasFocus: {
    borderColor: "#3c4251",
    borderWidth: "2px",
    marginTop: "0px",
    marginBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    "& $formGroup": {
      padding: "10px 0px",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  inputExt: {
    flex: 0.3,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  nameInput: {
    width: "25%",
    marginBottom: 10,
    marginTop: 10,
  },
  valueInput: {
    width: "25%",
    marginBottom: 10,
    marginTop: 10,
  },
}));

addValidationRule("isPhoneCustom", function (values, value) {
  // return ['apple', 'orange', 'pear'].indexOf(value) >= 0;
  return true;
});

function PhoneInput(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { value, appendAction, last, errorMessage } = props;

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
    "nameLabel",
    "valueLabel",
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
  ]);

  const telTypes = [
    { id: "string", icon: "input", name: t("text") },
    { id: "number", icon: "local_phone", name: t("number") },
    { id: "select", icon: "format_list_numbered", name: t("other") },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [focused, setFocused] = useState(false);

  const updateValue = (object) => {
    // Merge the value object with the new attributes
    const newValue = { ...value, ...object };
    props.setValue(newValue);
    if (typeof props.onChange === "function") {
      props.onChange(newValue);
    }
  };

  const handlePhoneMenuClick = (type) => {
    updateValue({ ...value, type });
    setAnchorEl(null);
  };

  const handleNameChange = (event) => {
    updateValue({ ...value, name: event.target.value });
  };

  const handleValueChange = (event) => {
    updateValue({ ...value, value: event.target.value });
  };

  const handleAppendClick = () => {
    if (typeof appendAction === "function") {
      appendAction();
    }
  };

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <FormControl
      error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
      className={clsx({
        [props.className]: !!props.className,
        ["z-10"]: true,
        [props.showRequired]: props.showRequired === "required",
        ["error"]: props.showError,
        [classes[`formGroup_${importedProps.variant}`]]: true,
        [classes.hasFocus]: focused,
      })}
      classes={{ root: classes.root }}
    >
      <Button
        color="primary"
        className={classes.iconButton}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Icon>{(telTypes.find((t) => t.id === value.type) || "").icon}</Icon>
        <Icon>arrow_drop_down</Icon>
      </Button>
      <Menu
        id="phone-types-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {telTypes.map((type, key) => {
          return (
            <MenuItem
              disabled={type.id === value.type}
              id={`menu-item-${key}`}
              key={key}
              onClick={() => handlePhoneMenuClick(type.id)}
            >
              {type.name}
            </MenuItem>
          );
        })}
      </Menu>
      {value.type === "string" ? (
        <>
          <TextFieldFormsy
            className={clsx(classes.nameInput)}
            placeholder={props.nameLabel || t("input_name")}
            value={value.name || ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleNameChange}
            variant="outlined"
            name={props.name}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <TextFieldFormsy
            className={clsx(
              classes.input,
              classes.inputPhone,
              classes.valueInput
            )}
            placeholder={props.valueLabel || t("value")}
            value={value.value || ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleValueChange}
            variant="outlined"
            name={props.name}
          />
        </>
      ) : value.type === "number" ? (
        <>
          <TextFieldFormsy
            className={clsx(classes.nameInput)}
            placeholder={props.nameLabel || t("input_name")}
            value={value.name || ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleNameChange}
            variant="outlined"
            name={props.name}
            validationErrors={{
              required: t("error.form.required"),
            }}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <TextFieldFormsy
            className={clsx(
              classes.input,
              classes.inputPhone,
              classes.valueInput
            )}
            placeholder={props.valueLabel || t("value")}
            value={value.value || ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleValueChange}
            variant="outlined"
            name={props.name}
            type="number"
          />
        </>
      ) : (
        <>
          <TextFieldFormsy
            className={clsx(classes.nameInput)}
            placeholder={props.nameLabel || t("input_name")}
            value={value.name || ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleNameChange}
            variant="outlined"
            name={props.name}
          />
          <Divider className={classes.divider} orientation="vertical" />
          {/*<SelectFormsy
            className={clsx(classes.input, classes.inputPhone)}
            placeholder={props.nameLabel || t("input_name")}
            value={value.name || ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleNameChange}
            variant="outlined"
            name={props.name}
          >
            <MenuItem key={1} value={1}>
              select 1 
            </MenuItem>
            <MenuItem key={2} value={2}>
              select 2 
            </MenuItem>
          </SelectFormsy>*/}
        </>
      )}
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip
        title={t(`notice.${last ? "add_phone_notice" : "remove_phone_notice"}`)}
      >
        <IconButton
          className={classes.iconButton}
          aria-label="directions"
          onClick={handleAppendClick}
        >
          <Icon>{props.last ? "add_circle" : "remove_circle"}</Icon>
        </IconButton>
      </Tooltip>
      {Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default React.memo(withFormsy(PhoneInput));
