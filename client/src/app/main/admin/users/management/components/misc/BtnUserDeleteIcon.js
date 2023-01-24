import React, { useRef, useState } from "react";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { remove } from "app/services/graphql/users/users.service";
import * as MainActions from "app/store/actions/fuse";
import * as Actions from "../../store/actions";

function BtnUserDeleteIcon(props) {
  const { userId } = props;
  const { t } = useTranslation();
  const valueRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setLoading(true);
    dispatch(
      MainActions.openDialog({
        fullWidth: false,
        maxWidth: "sm",
        title: t(
          "UserModule:validation.are_you_sure_you_want_to_delete_the_user"
        ),
        content: t(
          "UserModule:validation.are_you_sure_you_want_to_delete_the_user_desc"
        ),
        actions: [
          <Button onClick={handleAction} color="outlined">
            {t("i_confirm")}
          </Button>,
          <Button
            onClick={() => {
              dispatch(MainActions.closeDialog());
              setLoading(false);
            }}
            color="default"
            autoFocus
            variant="contained"
            disableElevation
          >
            {t("cancel")}
          </Button>,
        ],
      })
    );
  };

  const handleAction = () => {
    remove(userId)
      .then(() => {
        setLoading(false);
        dispatch(MainActions.closeDialog());
        dispatch(Actions.deleteElement(userId));
        dispatch(
          MainActions.showMessage({
            message: t("UserModule:success.delete"),
            autoHideDuration: 3000,
            variant: "success", // success error info warning null
          })
        );
      })
      .catch((e) => {
        setLoading(false);
        dispatch(
          MainActions.showMessage({
            message: t("UserModule:error.delete"),
            autoHideDuration: 3000,
            variant: "error", // success error info warning null
          })
        );
        dispatch(MainActions.closeDialog());
        console.error(e);
      });
  };

  return (
    <Tooltip
      title={t("button.delete", {
        context: "male",
        element: t("user.account"),
      })}
    >
      <IconButton
        size="small"
        ref={valueRef}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress
            style={{
              width: "25px",
              height: "25px",
            }}
          />
        ) : (
          <Icon fontSize="small">delete</Icon>
        )}
      </IconButton>
    </Tooltip>
  );
}

export default BtnUserDeleteIcon;
