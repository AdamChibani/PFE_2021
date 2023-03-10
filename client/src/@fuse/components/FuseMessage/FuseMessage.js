import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { green, amber, blue } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import * as Actions from "app/store/actions";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {},
  success: {
    backgroundColor: green[600],
    color: "#FFFFFF",
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.getContrastText(theme.palette.error.dark),
  },
  info: {
    backgroundColor: blue[600],
    color: "#FFFFFF",
  },
  warning: {
    backgroundColor: amber[600],
    color: "#FFFFFF",
  },
  MuiSnackbarContent: {
    flexWrap: "nowrap",
  },
}));

const variantIcon = {
  success: "check_circle",
  warning: "warning",
  error: "error_outline",
  info: "info",
};

function FuseMessage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(({ fuse }) => fuse.message.state);
  const options = useSelector(({ fuse }) => fuse.message.options);

  const classes = useStyles();

  return (
    <Snackbar
      {...options}
      open={state}
      onClose={() => dispatch(Actions.hideMessage())}
      classes={{
        root: classes.root,
      }}
      ContentProps={{
        variant: "body2",
        headlineMapping: {
          body1: "div",
          body2: "div",
        },
      }}
    >
      <SnackbarContent
        classes={{ root: classes.MuiSnackbarContent }}
        className={clsx(classes[options.variant])}
        message={
          <div className="flex items-center">
            {variantIcon[options.variant] && (
              <Icon className="mr-8" color="inherit">
                {variantIcon[options.variant]}
              </Icon>
            )}
            {options.translate ? t(options.message) : options.message}
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(Actions.hideMessage())}
          >
            <Icon>close</Icon>
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

export default React.memo(FuseMessage);
