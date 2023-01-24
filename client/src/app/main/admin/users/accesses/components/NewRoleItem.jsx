import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import InputBase from "@material-ui/core/InputBase";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const useStyles = makeStyles((theme) => ({
  smooth: {
    "-webkit-transition": "all 0.5s ease-in-out",
    "-moz-transition": "all 0.5s ease-in-out",
    "-o-transition": "all 0.5s ease-in-out",
    transition: "all 0.5s ease-in-out",
  },
  circularProgress: {
    height: "25px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  error: {
    borderBottom: "2px solid #FF5722",
  },
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

const gQl = gql`
  mutation role($role: RoleInput!) {
    role(item: $role) {
      id
    }
  }
`;

function NewRoleItem({ show, onSuccess }) {
  const { t } = useTranslation();
  const classes = useStyles();

  const inputRef = React.useRef(null);
  const [error, setError] = React.useState(false);
  const [mutate, { loading }] = useMutation(gQl);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = inputRef.current.value;
    if (!name) return false;
    mutate({ variables: { role: { name } } })
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== "production") console.error(err);
        setError(true);
      });
  };

  return (
    <Collapse in={show}>
      <Divider className="my-8 w-2/3 mx-auto" />
      {show && (
        <ListItem id="new-role" className={classes.listItem} selected={false}>
          <form className="w-full" onSubmit={handleSubmit}>
            <InputBase
              classes={{
                root: classes.input,
                error: classes.error,
              }}
              placeholder={t("access:role_name")}
              disabled={loading}
              error={error}
              onChange={() => setError(false)}
              inputProps={{
                "aria-label": "new role name",
                required: true,
                ref: inputRef,
              }}
            />
            <ListItemSecondaryAction>
              <Tooltip title={t("access:create_new_role")}>
                <IconButton
                  aria-label="create a new role"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={15} /> : <SendIcon />}
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </form>
        </ListItem>
      )}
    </Collapse>
  );
}
export default NewRoleItem;
