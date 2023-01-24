import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import adminMenuHelper from "app/main/admin/home/adminMenuHelper";
import { useTranslation } from "react-i18next";
import { help as menuData } from "app/configs/navigation";

function HelpMenu(props) {
	const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [menu, setMenu] = useState(null);
  const isAdmin = Boolean(adminMenuHelper().length > 0);

  const userMenuClick = (event) => {
    setMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setMenu(null);
  };

  return (
    <>
      <Button className="h-64 text-gray-600" onClick={userMenuClick}>
        <Icon>help</Icon>
      </Button>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
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
            {menuData.map((e) => {
              switch (e.type) {
                case "divider":
                  return <Divider className="my-16" />;
                case "group":
                  return (
                    <React.Fragment key={e.id}>
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
                      key={e.id}
                      component={Link}
                      to={e.url}
                      onClick={userMenuClose}
                    >
                      <ListItemIcon className="min-w-40">
                        <Icon>{e.icon}</Icon>
                      </ListItemIcon>
                      <ListItemText
                        className="pl-0"
                        primary={
                          e.translate
                            ? t(`navigation:${e.translate}`)
                            : e.title
                        }
                      />
                    </MenuItem>
                  );
              }
            })}
          </React.Fragment>
        )}
      </Popover>
    </>
  );
}

export default HelpMenu;
