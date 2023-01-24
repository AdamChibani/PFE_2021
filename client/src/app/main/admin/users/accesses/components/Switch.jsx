import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const gQl = gql`
  mutation privilege($role: Int!, $slug: String!, $privilege: String!) {
    privilege(role: $role, slug: $slug, privilege: $privilege)
  }
`;

function SwitchComponent(props) {
  const { value, role, slug, privilege } = props;

  const [checked, check] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [mutate, { loading }] = useMutation(gQl);

  let timer = null;
  useEffect(() => () => clearTimeout(timer), []);

  useEffect(() => {
    check(value);
  }, [value]);

  function handleChange() {
    mutate({ variables: { role, slug, privilege } })
      .then(() => {
        check(!value);
        setSuccess(true);
        timer = setTimeout(() => setSuccess(false), 3000);
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== "production") console.error(err);
        setError(true);
        timer = setTimeout(() => setError(false), 3000);
      });
  }

  if (loading) return <CircularProgress className="mx-2" size={15} />;
  if (error) return <ErrorOutlineIcon />;
  if (success) return <CheckCircleOutlineIcon />;

  return (
    <Checkbox
      classes={{ root: "p-0" }}
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default SwitchComponent;
