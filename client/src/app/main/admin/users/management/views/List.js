import React from "react";
import { useTranslation } from "react-i18next";
import { FusePageCarded } from "@fuse";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducer";
import HeaderList from "@catu/components/HeaderList";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import ListTable from "../components/tables/ListTable";

function List() {
  const { t } = useTranslation();

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        contentCard: "rounded-8",
        contentWrapper: "mb12",
      }}
      header={
        <HeaderList
          icon="people"
          title={t("UserModule:title", { count: 2 })}
          Input={SearchInput}
          actions={[
            <Button
              component={Link}
              to="/admin/users/management/item/new"
              className="whitespace-no-wrap normal-case"
              variant="contained"
              color="secondary"
            >
              <span className="hidden sm:flex">{t("UserModule:new_user")}</span>
              <span className="flex sm:hidden">{t("create")}</span>
            </Button>,
          ]}
        />
      }
      content={<ListTable />}
      innerScroll
    />
  );
}

export default withReducer("userManagementApp", reducer)(List);
