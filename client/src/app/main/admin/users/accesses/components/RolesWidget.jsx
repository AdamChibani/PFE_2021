import React from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { FuseAnimate } from "@fuse";
import { useTranslation } from "react-i18next";
import RoleListItem from "./RoleListItem";
import NewRoleWrapper from "./NewRoleWrapper";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import slugify from "slugify";

const gQlQuery = gql`
  query roles {
    roles {
      id
      name
    }
  }
`;

function RolesWidgets({ match, history }) {
  const { t } = useTranslation();

  const id = parseInt(match.params.id);
  const { loading, error, data, refetch } = useQuery(gQlQuery);

  const roles = (data && data.roles) || [];

  if (roles.length > 1 && !id) {
    let slug = "/admin/users/accesses/";
    slug = slug + roles[0].id + "-" + slugify(roles[0].name).toLowerCase();
    history.push(slug);
  }

  return (
    <FuseAnimate animation="transition.slideLeftIn" delay={200}>
      <List classes={{ root: "p-8 pb-16 bg-gray-100 rounded-8" }}>
        <ListSubheader>{t("user.role", { count: roles.length })}</ListSubheader>
        {error && (
          <RoleListItem
            disabled={true}
            role={{
              id: 0,
              name: t("error"),
              icon: "error",
            }}
          />
        )}
        {loading && (
          <RoleListItem
            disabled={true}
            role={{
              id: 0,
              name: t("loading"),
              icon: "more_horiz",
            }}
          />
        )}
        {roles.map((role, key) => (
          <RoleListItem key={key} role={role} />
        ))}
        <NewRoleWrapper refetch={refetch} loading={loading} />
      </List>
    </FuseAnimate>
  );
}

export default withRouter(RolesWidgets);
