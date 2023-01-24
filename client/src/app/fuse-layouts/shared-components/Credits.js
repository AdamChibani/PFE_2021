import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import MoneyFormatter from "@catu/components/MoneyFormatter";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { updateCredit } from "../../main/portal/dashboard/store/actions";
import UserIdle from "@catu/helpers/UserIdle";

const useStyle = makeStyles(() => ({
  currency: {
    width: "40px",
    height: "40px",
    background: "#256e9c",
    borderRadius: "100%",
    padding: "10px",
    marginRight: "8px",
    display: "inline-flex",
  },
  colorPrimary: {
    color: "white",
  },
}));

const gQlSub = gql`
  query businessBalance {
    businessBalance {
      value
      date
    }
  }
`;

const idleHandler = new UserIdle();

function Credits() {
  const classes = useStyle();
  const { t } = useTranslation();
  const { loading, error, data, startPolling, stopPolling } = useQuery(gQlSub, {
    fetchPolicy: "cache-and-network",
  });
  const dispatch = useDispatch();

  const value = 0;

  useEffect(() => {
    window.addEventListener("focus", startPoll);
    window.addEventListener("blur", stopPoll);
    // User IDLE
    idleHandler.setup(20000, startPoll, stopPoll);
    idleHandler.start();
    return () => {
      idleHandler.stop();
      stopPolling();
      window.removeEventListener("focus", startPoll);
      window.removeEventListener("blur", stopPoll);
    };
  }, []);

  const startPoll = () => startPolling(10000);
  const stopPoll = () => stopPolling();

  useEffect(() => {
    dispatch(updateCredit(value));
  }, [value]);

  if (error) return <div className="flex items-center mx-16 h-64">Error</div>;

  return (
    <Button
      classes={{ root: "h-64", label: "flex mx-8" }}
      component={Link}
      to={"/app/user/credits/list"}
      disabled={loading && value === 0}
    >
      <div className={classes.currency}>
        {loading && value === 0 ? (
          <CircularProgress
            size={20}
            classes={{ colorPrimary: classes.colorPrimary }}
          />
        ) : (
          <img src="assets/logos/n-nominis.svg" />
        )}
      </div>
      <div className="hidden md:flex flex-col items-start">
        <Typography component="span" className="normal-case font-600 flex">
          <MoneyFormatter data={value} number={true} noWarp={true} />
        </Typography>
        <Typography className="text-11 capitalize" color="textSecondary">
          {t("credit", { count: value })}
        </Typography>
      </div>
    </Button>
  );
}

export default Credits;
