import React from "react";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate } from "@fuse";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ResetPasswordForm from "./sub-component/form";
import { useTranslation } from "react-i18next";
import portalConfig from "app/configs/portalConfig";

function ResetPasswordPage(props) {
  const { t } = useTranslation();
  const bgImage = "assets/images/backgrounds/datavisualisation.png";

  const classes = makeStyles((theme) => ({
    root: {
      background: `linear-gradient(45deg, ${portalConfig.colors.main}, ${portalConfig.colors.gradiant});`,
      backgroundColor: portalConfig.colors.main,
      backgroundImage: `url(${bgImage})`, //"url(assets/images/backgrounds/light-bg.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: theme.palette.primary.contrastText,
    },
  }))();

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <div className="w-128 m-32">
                <img
                  className="w-200 mb-32"
                  src="assets/logos/tekru-logo@2x.png"
                  alt={t("logo.alt", { company: portalConfig.companyName })}
                />
              </div>
              <Typography
                variant="h6"
                className={clsx(classes.title, "mt-16 mb-32 uppercase")}
              >
                {t("auth:reset_password")}
              </Typography>
              <ResetPasswordForm {...props} />
              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <Link className="font-medium" to="/login">
                  {t("auth:back_to_login_page")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
