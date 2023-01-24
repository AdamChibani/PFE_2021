import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  "@keyframes aniVertical": {
    "0%": {
      opacity: 0,
    },
    "50%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
  "@keyframes aniHorizontal": {
    "0%": {
      backgroundPosition: "-100% 0",
    },
    "100%": {
      backgroundPosition: "100% 0",
    },
  },
  loadingRow: {
    animation: "$aniVertical 3s ease",
    animationIterationCount: "infinite",
    animationFillMode: "forwards",
    opacity: 0,
    "&:nth-child(2)": {
      animationDelay: ".5s",
    },
    "&:nth-child(3)": {
      animationDelay: "1s",
    },
    "& .datagrid__loader": {
      height: "5px",
      background: "#e2e2e2",
      borderRadius: "5px",
    },
  },
}));

function LoadingComponent({ selectable, columns }) {
  const classes = useStyles();

  return [1, 2, 3].map((i, k) => (
    <TableRow key={k} className={classes.loadingRow}>
      {selectable && (
        <TableCell>
          <div
            className="datagrid__loader"
            style={{
              width: "20px",
              height: "20px",
              margin: "auto",
            }}
          />
        </TableCell>
      )}
      {columns.map((col, i) => {
        return (
          <TableCell key={i}>
            <div
              className="datagrid__loader"
              style={{
                width: `${Math.floor(Math.random() * 51) + 50}%`,
              }}
            />
          </TableCell>
        );
      })}
    </TableRow>
  ));
}

export default LoadingComponent;
