import React from "react";
import styles from "./Rate.module.css";
function Rate({ Rating, setSearchRate }) {
  switch (Rating) {
    case "Native": {
      Rating = 5;
      break;
    }
    case "Fluent": {
      Rating = 4;
      break;
    }
    case "Conversational": {
      Rating = 3;
      break;
    }
    case "Elementary": {
      Rating = 2;
      break;
    }
    case "Beginner": {
      Rating = 1;
      break;
    }
    default:
      Rating = 0;
  }
  const stars = (x) => {
    let starArray = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= x) {
        starArray.push(
          <span className={styles["stars"]} key={i}>
            ●
          </span>
        );
      } else {
        starArray.push(
          <span className={styles["stars"]} key={i}>
            ○
          </span>
        );
      }
    }
    return starArray;
  };

  return <span style={{ paddingLeft: "10px" }}>{stars(Rating)}</span>;
}

export default Rate;
