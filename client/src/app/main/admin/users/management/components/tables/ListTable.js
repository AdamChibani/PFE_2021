import React, { useEffect, useState } from "react";
import _ from "@lodash";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import EnhancedTable from "@catu/components/Table/EnhancedTable";
import UserSwitchComponent from "./UserSwitchComponent";
import BtnUserDeleteIconComponent from "../misc/BtnUserDeleteIcon";
import BtnEditUserComponent from "../misc/BtnEditUserComponent";
import * as services from "app/services/graphql/users/users.service";
import portalConfig from "app/configs/portalConfig";
import TimeAgo from "@catu/components/TimeAgo";

function UsersTable() {
  const { languages } = portalConfig;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const data = useSelector(({ userManagementApp }) => userManagementApp.data);
  const searchText = useSelector(
    ({ userManagementApp }) => userManagementApp.searchText
  );

  const [loading, setLoading] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    if (!Array.isArray(roles)) {
      services
        .getAllRoles()
        .then((data) => {
          setRoles(data);
        })
        .catch((error) => {
          if (process.env.NODE_ENV !== "production") console.error(error);
        });
    }
  }, [roles, data, dispatch]);

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      setLoading(true);
      services.getAll().then(({ users, roles }) => {
        setRoles(roles);
        dispatch(Actions.setData(users));
        setLoading(false);
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!searchText) {
      setDataArray(data);
    } else {
      const keyword = searchText.toLowerCase();
      const filters = ["firstName", "lastName", "email", "language"];
      if (Array.isArray(data)) {
        setDataArray(
          data.filter((element) => {
            for (const filterBy of filters) {
              if (element[filterBy].toLowerCase().indexOf(keyword) >= 0) {
                return true;
              }
            }
            return false;
          })
        );
      }
    }
  }, [searchText, data]);

  const columns = React.useMemo(
    () => [
      {
        Header: t("user.first_name"),
        accessor: "firstName",
        className: "font-bold",
        sortable: true,
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex items-center">
              <Avatar
                className="mr-8"
                alt={original.firstName + " " + original.lastName}
                src={original.profileImage}
              />
              {original.firstName}
            </div>
          );
        },
      },
      {
        Header: t("user.last_name"),
        accessor: "lastName",
        className: "font-bold",
        sortable: true,
      },
      {
        Header: t("email"),
        accessor: "email",
        sortable: true,
      },
      {
        Header: t("last_login"),
        accessor: "lastLogin",
        sortable: true,
        Cell: ({ row: { original } }) => {
          return <TimeAgo date={original.lastLogin} />;
        },
      },
      {
        Header: t("language"),
        accessor: "language",
        sortable: true,
        Cell: ({ row: { original } }) => {
          const language = languages.find(
            (lang) => lang.id === original.language
          );
          if (language) {
            const langString = language
              ? language.shortName
              : original.language;
            return (
              <div className="flex items-center">
                <img
                  className="mr-8 max-w-20"
                  src={`assets/images/flags/${language.flag}.png`}
                  alt={language.shortName}
                />
                {langString}
              </div>
            );
          } else {
            return <>{t("not_defined")}</>;
          }
        },
      },
      {
        Header: t("user.role"),
        accessor: "role.name",
        sortable: true,
        Cell: ({ row: { original } }) => {
          let role = (original.role || { name: t("not_defined") }).name;
          if (!role && original.role.id && Array.isArray(roles)) {
            role = roles.find((role) => role.id === original.role.id);
            role = role ? role.name : null;
          }
          return role ? role : "";
        },
      },
      {
        Header: t("user.active"),
        accessor: "active",
        sortable: true,
        width: "10%",
        Cell: (data) => {
          return (
            <UserSwitchComponent
              value={data.row.original.active}
              userId={data.row.original.id}
            />
          );
        },
      },
      {
        Header: t("actions"),
        sortable: true,
        width: "10%",
        Cell: ({ row }) => {
          return (
            <div className="flex items-center">
              <BtnUserDeleteIconComponent userId={row.original.id} />
              <BtnEditUserComponent userId={row.original.id} />
            </div>
          );
        },
      },
    ],
    [dispatch, roles]
  );

  return (
    <EnhancedTable
      classesNames="min-h-full sm:border-1"
      loading={loading}
      columns={columns}
      data={dataArray}
      //   onRowClick={(ev, row) => viewItem(row.original)}
      selectable={false}
    />
  );
}

export default withRouter(UsersTable);
