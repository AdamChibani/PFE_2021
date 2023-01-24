import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  noData: {
    textAlign: "center",
    padding: "40px 10px",
    color: "#aaaaaa",
    background: "#f9f9f9",
  },
  noDataIcon: {
    display: "inline-flex",
    background: "#f1f1f1",
    borderRadius: "100%",
    color: "#ff6b6b",
    marginBottom: "30px",
    "& svg": {
      fontSize: "5em",
      margin: "10px",
    },
  },
  noDataTitle: {
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: "1.6em",
    marginBottom: "10px",
  },
  noDataBody: {
    whiteSpace: "pre-line",
  },
  "@media (min-width: 768px)": {
    noData: {
      padding: "60px 20px",
    },
    noDataIcon: {
      "& svg": {
        fontSize: "7em",
        margin: "15px",
      },
    },
  },
}));

function ErrorComponent({ retry }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const showBtn = typeof retry === "function";
  return (
    <div className={classes.noData}>
      <Box className={classes.noDataIcon}>
        <ErrorIcon />
      </Box>
      <Typography align="center" variant="h2" className={classes.noDataTitle}>
        {t("oups_error")}
      </Typography>
      <Typography align="center" variant="body1" className={classes.noDataBody}>
        {t("unexpected_error_desc")}
      </Typography>
      <Typography align="center" variant="body1" className={classes.noDataBody}>
        {t("error_presist_desc")}
      </Typography>
      {showBtn && (
        <Button
          color="default"
          variant="contained"
          className="mt-16"
          onClick={() => retry()}
          disableElevation
        >
          {t("button.retry")}
        </Button>
      )}
    </div>
  );
}

export default ErrorComponent;
