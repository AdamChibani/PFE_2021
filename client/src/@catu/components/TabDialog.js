import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/store/actions";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { useTranslation } from "react-i18next";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  tabs: {
    width: "100%",
    height: "6.4rem",
    borderBottom: "1px solid #ccc",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className="flex flex-wrap items-center">
        {props.icon && <Avatar alt={props.title} src={props.icon} />}
        <Typography variant="h6" classes={{ root: "w-full" }}>
          {props.title}
        </Typography>
        <Typography variant="subtitle2" classes={{ root: "w-full" }}>
          {props.postpend}
        </Typography>
      </div>
    </MuiDialogTitle>
  );
});

function TabDialog(props) {
  const dispatch = useDispatch();
  const state = useSelector(({ fuse }) => fuse.dialog.state);
  const options = useSelector(({ fuse }) => fuse.dialog.options);
  const [tabValue, setTabValue] = useState(0);

  const classes = {
    ...props.classes,
    ...(options.classes || {}),
  };
  const { t } = useTranslation();

  const handleChangeTab = (event, value) => {
    setTabValue(value);
  };

  return (
    <Dialog
      open={state}
      onClose={(ev) => dispatch(Actions.closeDialog())}
      aria-labelledby="dialog-title"
      maxWidth={options.maxWidth || "lg"}
      fullWidth={options.fullWidth || true}
      classes={{
        root: "p-32",
      }}
    >
      {options.title && (
        <DialogTitle
          id="tab-dialog-title"
          title={options.title}
          icon={options.icon}
          postpend={options.postpend}
        />
      )}
      <DialogContent
        classes={{
          root: classes.root + " pt-0",
        }}
      >
        {options.description && (
          <DialogContentText
            id="alert-dialog-description"
            children={options.description}
          />
        )}
        <>{options.content && options.content}</>
        {Array.isArray(options.tabs) && options.tabs.length > 0 && (
          <>
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: classes.tabs }}
            >
              {options.tabs.map((item, key) => (
                <Tab className="h-64 normal-case" label={item.name} key={key} />
              ))}
            </Tabs>
          </>
        )}
        {Array.isArray(options.tabs) && options.tabs[tabValue] && (
          <div className="pt-16">{options.tabs[tabValue].content}</div>
        )}
      </DialogContent>
      {Array.isArray(options.actions) && options.actions.length > 0 && (
        <DialogActions
          classes={{
            root: "p-16",
          }}
        >
          {options.actions.map((Option, key) => ({ ...Option, key }))}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default withStyles(styles)(TabDialog);
