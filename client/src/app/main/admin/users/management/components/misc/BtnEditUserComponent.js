import React, { useRef, useState, Fragment } from "react";
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'
import history from "@history";
import { useTranslation } from "react-i18next";

function EditUserComponent(props) {
  const { user } = props;
  const valueRef = useRef(null);
  const { t } = useTranslation();

  const goEdit = (event) => {
    event.stopPropagation();
    history.push({
      pathname: "./item/" + props.userId,
    });
  };

  return (
    <Tooltip
      title={t("button.view", {
        context: "male",
        element: t("user.account"),
      })}
    >
      <IconButton ref={valueRef} onClick={goEdit} size="small">
        <Icon fontSize="small">edit</Icon>
      </IconButton>
    </Tooltip>
  );
}

export default EditUserComponent;
