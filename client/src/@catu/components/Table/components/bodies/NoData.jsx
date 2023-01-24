import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StorageIcon from "@material-ui/icons/Storage";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  noData: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#aaaaaa",
    background: "#f9f9f9",
  },
  noDataIcon: {
    display: "inline-flex",
    background: "#f1f1f1",
    borderRadius: "100%",
    color: "#c3c3c3",
    marginBottom: "30px",
    fontSize: "14px",
    "& svg": {
      fontSize: "7em",
      margin: "15px",
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
}));

function NoDataComponent({ colNumber, retry }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const showBtn = typeof retry === "function";
  return (
    <TableRow>
      <TableCell className={classes.noData} colSpan={colNumber}>
        <Box className={classes.noDataIcon}>
          <StorageIcon />
        </Box>
        <Typography align="center" variant="h2" className={classes.noDataTitle}>
          {t("no_data")}
        </Typography>
        <Typography
          align="center"
          variant="body1"
          className={classes.noDataBody}
        >
          {t("no_data_body")}
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
      </TableCell>
    </TableRow>
  );
}

export default NoDataComponent;
