import React from "react";
import { useTranslation } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import NewRoleItem from "./NewRoleItem";
import RoleListItem from "./RoleListItem";

function NewRoleWrapper({ loading, refetch }) {
  const { t } = useTranslation();
  const [visible, show] = React.useState(false);
  const createNewRole = () => show(true);

  const onSuccess = () => {
    show(false);
    refetch();
  };
  
  return (
    <>
      <NewRoleItem show={visible} onSuccess={onSuccess} />
      <Divider className="my-8 w-2/3 mx-auto" />
      <RoleListItem
        disabled={loading || visible}
        handler={createNewRole}
        role={{
          id: 0,
          name: t("access:add_role"),
          icon: "add",
        }}
      />
    </>
  );
}

export default NewRoleWrapper;
