import React from "react";
import { useTranslation } from "react-i18next";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
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
  opacity: {
    marginRight: "0.8rem",
    opacity: 0.2,
  },
}));

export default function ({ team, size }) {
  const { t } = useTranslation();
  const classes = useStyles();
  let data = team,
    noStaff = false;
  if (Array.isArray(data)) data = [];
  if (size !== "small" && size !== "large") size = false;

  if (data.length === 0) {
    noStaff = true;
    data = [1, 2].map((e) => ({
      firstName: "",
      lastName: "",
      profileImage: "",
    }));
  }

  return (
    <div
      className={clsx({
        "flex items-center": noStaff,
      })}
    >
      <AvatarGroup
        max={4}
        className={clsx({
          [classes.opacity]: noStaff,
        })}
      >
        {(data || []).map((item, i) => (
          <Avatar
            key={i}
            alt={item.firstName + " " + item.lastName}
            src={item.profileImage}
            className={clsx({ [classes[size]]: !!size })}
          />
        ))}
      </AvatarGroup>
      {noStaff && <div>{t("none")}</div>}
    </div>
  );
}
