import React from "react";
import { withRouter } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/styles";
import slugify from "slugify";

const useStyles = makeStyles(() => ({
  listItem: {
    color: "inherit!important",
    textDecoration: "none!important",
    height: 40,
    width: "calc(100% - 16px)",
    borderRadius: "0 20px 20px 0",
    paddingLeft: 24,
    paddingRight: 12,
    "& .list-item-icon": {
      marginRight: 16,
    },
  },
}));

function RoleListItem({ role, disabled, handler, match, history }) {
  const classes = useStyles();
  const id = parseInt(match.params.id);

  const handleClick = () => {
    if (role.id) {
      let slug = "/admin/users/accesses/";
      slug = slug + role.id;
      if (role.name)
        slug = slug + "-" + slugify(role.name).toLowerCase(); 
      history.push(slug);
    };
    if (typeof handler === "function") handler();
  };

  return (
    <ListItem
      button
      id={"role-" + role.id}
      className={classes.listItem}
      selected={id === role.id}
      onClick={handleClick}
      disabled={disabled}
    >
      <Icon
        className="list-item-icon text-16"
        color="action"
        children={role.icon || "label"}
      />
      <ListItemText
        className="truncate pr-0"
        primary={role.name}
        disableTypography={true}
      />
    </ListItem>
  );
}
export default withRouter(RoleListItem);
