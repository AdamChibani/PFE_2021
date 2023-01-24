import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import styles from "./messages.module.css";
import Image from "next/image";
const useStyles = makeStyles((theme) => ({
  container: {
    bottom: 0,
  },
  bubbleContainer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
  },
  bubble: {
    border: "0.5px solid black",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    paddingBottom: "0px",
    display: "inline-block",
    maxWidth: "45%",
    minWidth: "20%",
  },
}));

const ChatLayout = (props) => {
  function timeDifference(previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = Date.now() - previous;

    if (elapsed < msPerMinute) {
      return (
        Math.round(elapsed / 1000) +
        (Math.round(elapsed / 1000) != 1 ? " seconds ago" : " second ago")
      );
    } else if (elapsed < msPerHour) {
      return (
        Math.round(elapsed / msPerMinute) +
        (Math.round(elapsed / msPerMinute) == 1 ? "minute ago" : " minutes ago")
      );
    } else if (elapsed < msPerDay) {
      return (
        Math.round(elapsed / msPerHour) +
        (Math.round(elapsed / msPerHour) == 1 ? " hour ago" : " hours ago")
      );
    } else if (elapsed < msPerMonth) {
      return (
        Math.round(elapsed / msPerDay) +
        (Math.round(elapsed / msPerDay) == 1 ? " day ago" : " days ago")
      );
    } else if (elapsed < msPerYear) {
      return (
        Math.round(elapsed / msPerMonth) +
        (Math.round(elapsed / msPerMonth) == 1 ? " month ago" : " months ago")
      );
    } else {
      return (
        Math.round(elapsed / msPerYear) +
        (Math.round(elapsed / msPerYear) == 1 ? " year ago" : " years ago")
      );
    }
  }

  const classes = useStyles();
  var o = {};
  const chatBubbles = props?.message?.map((obj, i) => {
    return (
      <div
        className={
          classes.bubbleContainer +
          (props?.me === obj?.authorId
            ? " justify-content-end"
            : " justify-content-start")
        }
        key={i}
      >
        {props?.me === obj?.authorId ? (
          <>
            <div
              key={i++}
              className={
                styles["b"] +
                " " +
                classes.bubble +
                " d-flex justify-content-end"
              }
            >
              <div className={styles["messageContainer"]}>
                {obj.content}

                <br />
                <a className="font-size-3 text-gray mr-5 mt-5">
                  {timeDifference(obj?.createdAt)}
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            {i == 1 || obj?.authorId !== props?.message[i + 1]?.authorId ? (
              <div>
                <Image
                  src={obj?.sender?.profileImage}
                  // className="ml-5"
                  alt="Profile Image"
                  layout="fixed"
                  width={40}
                  height={40}
                />
              </div>
            ) : (
              <div className="ml-11"></div>
            )}
            <div key={i++} className={styles["b"] + " " + classes.bubble}>
              <div className={styles["messageContainer"]}>
                {obj.content}
                <br />
                <a className="font-size-3 text-gray mr-5 mt-5">
                  {timeDifference(obj?.createdAt)}
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    );
  });
  return <div className={classes.container}>{chatBubbles}</div>;
};

export default ChatLayout;
