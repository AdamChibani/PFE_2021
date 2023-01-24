import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import ToolbarActions from "./ToolbarActions";

const useToolbarStyles = makeStyles((theme) => {
  const highlight = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark,
  };
  if (theme.palette.type === "light") {
    highlight.color = theme.palette.secondary.main;
    highlight.backgroundColor = lighten(
      theme.palette.secondary.light,
      0.85
    );
  }

  return {
    highlight,
    title: {
      flex: "1 1 100%",
    },
  };
});

function TableToolbar(props) {
  const classes = useToolbarStyles();
  const { t } = useTranslation();
  const { numSelected, icon, title, description } = props;

  const selecting = numSelected > 0;

  if (!title) return null;

  let desc = [];
  if (description) desc = description.split("\n");

  return (
    <Toolbar
      className={clsx(classes.root, "p-12 justify-between", {
        [classes.highlight]: selecting,
      })}
    >
      {selecting ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {t("table.n_selected", { count: numSelected })}
        </Typography>
      ) : (
        <div>
          <div className={"flex items-center"}>
            {icon && <Icon>{icon}</Icon>}
            <Typography
              className={clsx("mb-0 font-bold", {
                "ml-6": !!icon,
              })}
              variant="h6"
              component="h2"
            >
              {title}
            </Typography>
          </div>
          {desc.map((string, key) => (
            <Typography
              key={key}
              variant="body2"
              component="p"
              className="text-grey"
            >
              {string}
            </Typography>
          ))}
        </div>
      )}
      <div className="flex flex-wrap justify-end">
        <ToolbarActions {...{ ...props, selecting }} />
      </div>
    </Toolbar>
  );
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default TableToolbar;
