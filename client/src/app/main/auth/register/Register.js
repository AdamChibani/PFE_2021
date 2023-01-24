import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FuseAnimate from "@fuse/components/FuseAnimate/FuseAnimate";
import { Link } from "react-router-dom";
import clsx from "clsx";
import JWTRegisterTab from "./tabs/JWTRegisterTab";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import portalConfig from "app/configs/portalConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(45deg, ${portalConfig.colors.main}, ${portalConfig.colors.gradiant});`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: theme.palette.primary.contrastText,
  },
}));

function Register() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0"
      )}
    >
      <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
          <Typography variant="h2" color="inherit" className="font-light">
            {t("auth:welcome_text", { company: portalConfig.companyName })}
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={400}>
          <Typography
            variant="subtitle1"
            color="inherit"
            className="max-w-512 mt-16"
            children={portalConfig.loginDescription}
          />
        </FuseAnimate>
      </div>

      <FuseAnimate animation={{ translateX: [0, "100%"] }}>
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <img
              className="w-200 mb-32"
              src="assets/logos/tekru-logo@2x.png"
              alt={t("logo.alt", { company: portalConfig.companyName })}
            />
            <Typography
              variant="h6"
              className="uppercase text-center md:w-full mb-48"
            >
              {t("auth:signup")}
            </Typography>

            <JWTRegisterTab />

            <div className="flex flex-col items-center justify-center pt-32 pb-24">
              <span className="font-medium">
                {t("auth:you_have_already_an_account")}
              </span>
              <Link className="font-medium" to="/login">
                {t("login")}
              </Link>
              <Link className="font-medium mt-8" to="/auth/forgot-password">
                {t("auth:forgot_password_question")}
              </Link>
            </div>

            <div className="flex flex-col items-center"></div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </div>
  );
}

export default Register;
