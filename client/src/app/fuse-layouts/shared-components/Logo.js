import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import portalConfig from "app/configs/portalConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .logo-icon": {
      width: "auto",
      height: 30,
      transition: theme.transitions.create(["width", "height"], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
  },
}));

function Logo() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, "flex items-center")}>
      <img
        className="logo-icon"
        src="assets/logos/logo.png"
        alt={t("logo.alt", { company: portalConfig.companyName })}
      />
      {portalConfig.showCompanyNameInSidebar && (
        <Typography
          className="text-16 ml-12 font-bold logo-text uppercase"
          color="textPrimary"
        >
          {portalConfig.companyName}
        </Typography>
      )}
    </div>
  );
}

export default Logo;
