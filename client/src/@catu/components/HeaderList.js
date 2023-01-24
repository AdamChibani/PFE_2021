import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FuseAnimate from "@fuse/components/FuseAnimate";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

function ListHeader(props) {
  const { t } = useTranslation();
  const { icon, title, url, actions, Input } = props;
  const theme = useTheme();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div>
        {url && (
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to={url || "/"}
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="mx-4">{t("back")}</span>
          </Typography>
        )}
        <div className="flex items-center">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <Icon className="text-32">{icon || "format_list_bulleted"}</Icon>
          </FuseAnimate>
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
              {title || t("list")}
            </Typography>
          </FuseAnimate>
        </div>
      </div>
      {Input && (
        <div className="flex flex-1 items-center justify-center px-12">
          <ThemeProvider theme={mainTheme}>
            <FuseAnimate animation="transition.slideDownIn" delay={300}>
              <Paper
                className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
                elevation={1}
              >
                <Icon color="action">search</Icon>
                <Input />
              </Paper>
            </FuseAnimate>
          </ThemeProvider>
        </div>
      )}

      {Array.isArray(actions) && (
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <>
            {actions.map((item, key) => {
              const Component = () => item;
              return <Component key={key} />;
            })}
          </>
        </FuseAnimate>
      )}
    </div>
  );
}

export default ListHeader;
