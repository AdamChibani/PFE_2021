import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ({ staff, size }) {
  const classes = useStyles();
  if (!staff) return <></>;
  if (size !== "small" && size !== "large") size = false;
  const fullName = staff.firstName + " " + staff.lastName;
  return (
    <div className="flex items-center">
      <Avatar
        className={clsx({ "mr-8": true, [classes[size]]: !!size })}
        alt={fullName}
        src={staff.profileImage}
      />
      <div>{fullName}</div>
    </div>
  );
}
