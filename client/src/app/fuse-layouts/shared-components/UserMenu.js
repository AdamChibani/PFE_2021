import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "app/auth/store/actions";
import { Link } from "react-router-dom";
import adminMenuHelper from "app/main/admin/home/adminMenuHelper";
import { useTranslation } from "react-i18next";
import { user as useMenuData } from "app/configs/navigation";

function UserMenu(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [userMenu, setUserMenu] = useState(null);
  const isAdmin = Boolean(adminMenuHelper().length > 0);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <React.Fragment>
      <Button className="h-64" onClick={userMenuClick}>
        {user.data.photoURL ? (
          <Avatar className="" alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="">{user.data.displayName[0]}</Avatar>
        )}

        <div className="hidden md:flex flex-col ml-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user.data.displayName}
          </Typography>
          <Typography className="text-11 capitalize" color="textSecondary">
            {user.data.level && user.data.level.name}
          </Typography>
        </div>

        <Icon className="text-16 ml-12 hidden sm:flex" variant="action">
          keyboard_arrow_down
        </Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <React.Fragment>
            <MenuItem component={Link} to="/login">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary={t("login")} />
            </MenuItem>
            <MenuItem component={Link} to="/register">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary={t("register")} />
            </MenuItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {useMenuData.map((e, key) => {
              switch (e.type) {
                case "divider":
                  return <Divider className="my-16" key={key} />;
                case "group":
                  return (
                    <React.Fragment key={key}>
                      <ListSubheader
                        disableSticky={true}
                        className="list-subheader flex items-center"
                      >
                        <span className="list-subheader-text uppercase text-12">
                          {e.translate
                            ? t(`navigation:${e.translate}`)
                            : e.title}
                        </span>
                      </ListSubheader>
                      {(e.children || []).map((child) => (
                        <MenuItem
                          key={child.id}
                          component={Link}
                          to={child.url}
                          onClick={userMenuClose}
                        >
                          <ListItemIcon className="min-w-40">
                            <Icon>{child.icon}</Icon>
                          </ListItemIcon>
                          <ListItemText
                            className="pl-0"
                            primary={
                              child.translate
                                ? t(`navigation:${child.translate}`)
                                : child.title
                            }
                          />
                        </MenuItem>
                      ))}
                    </React.Fragment>
                  );
                default:
                  return (
                    <MenuItem
                      key={key}
                      component={Link}
                      to={e.url}
                      onClick={userMenuClose}
                    >
                      <ListItemIcon className="min-w-40">
                        <Icon>{e.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText className="pl-0" primary={t(e.translate)} />
                    </MenuItem>
                  );
              }
            })}
            {isAdmin ? (
              <MenuItem
                component={Link}
                to="/admin/home"
                onClick={userMenuClose}
              >
                <ListItemIcon className="min-w-40">
                  <Icon>settings</Icon>
                </ListItemIcon>
                <ListItemText
                  className="pl-0"
                  primary={t("navigation:administration")}
                />
              </MenuItem>
            ) : (
              <div></div>
            )}
            <MenuItem
              onClick={() => {
                dispatch(authActions.logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary={t("navigation:logout")} />
            </MenuItem>
          </React.Fragment>
        )}
      </Popover>
    </React.Fragment>
  );
}

export default UserMenu;
