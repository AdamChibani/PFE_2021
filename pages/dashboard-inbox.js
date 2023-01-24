import { useLazyQuery } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import selectAuth from "../redux/user/userSelector";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "../components/MyProfile/my_profile.module.css";

import {
  Button,
  Grid,
  Icon,
  InputAdornment,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import ChatLayout from "../components/messages";
import { useMutation } from "@apollo/client";
const getMessages = gql`
  query getMessage($messagerieId: Int!) {
    getAllMessages(messagerieId: $messagerieId) {
      authorId
      messagerieId
      content
      createdAt
      id
      sender {
        id
        email
        company {
          name
        }
        firstName
        lastName
        profileImage
      }
    }
  }
`;
const getOpenedMessagerie = gql`
  query getByUser($id: Int!) {
    getOpenedMessagerie(id: $id) {
      id
      subject
      sender {
        id
        firstName
        lastName

        email
        company {
          name
        }
      }
      messages {
        content
      }
      receiver {
        lastName
      }
      createdAt
    }
  }
`;
const send = gql`
  mutation createM($messagerieId: Int!, $authorId: Int!, $content: String!) {
    createMessage(
      messagerieId: $messagerieId
      authorId: $authorId
      content: $content
    ) {
      id
      authorId
      content
      createdAt

      sender {
        id
        email
        company {
          name
        }
        firstName
        lastName
        profileImage
      }
    }
  }
`;
const Inbox = (props) => {
  const [selected, setSelected] = useState();
  const [msgs, setMsgs] = useState();
  const [getMsg, { data: d, loading: l }] = useLazyQuery(getMessages, {
    fetchPolicy: "network-only",
    pollInterval: 60000,
    fetchPolicy: "no-cache",
  });
  const [message, setMessage] = useState("");
  const [sendMsg, { loading: lm }] = useMutation(send);

  const handleSend = (messagerieId, authorId) => {
    if (message) {
      sendMsg({ variables: { messagerieId, authorId, content: message } }).then(
        (data) => {
          if (data) {
            let ar = [...selected];
            let d = {
              authorId: data?.data?.createMessage?.authorId,
              id: data?.data?.createMessage?.id,
              createdAt: data?.data?.createMessage?.createdAt,
              sender: props?.user?.user,
              messagerieId: data?.data?.createMessage?.messagerieId,
              content: data?.data?.createMessage?.content,
            };
            ar.push(d);
            setSelected(ar);
            setMessage("");
          }
        }
      );
    }
  };

  const handleClick = (messagerieId) => {
    getMsg({
      variables: { messagerieId: messagerieId },
    });
    setMsgs(messagerieId);
  };
  useEffect(() => {
    setSelected(d?.getAllMessages);
  }, [d]);
  useEffect(() => {
    document.getElementById("scroll").scrollTop = 99999999;
  }, [selected]);
  const { data, loading } = useQuery(getOpenedMessagerie, {
    variables: { id: props?.user?.user?.id },
  });

  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div className="dashboard-main-container mt-15 mt-lg-24">
          <Grid
            container
            direction="row"
            className=" mt-15 mt-lg-24 justify-content-around "
            style={{ minHeight: "80vh" }}
          >
            <Grid
              item
              style={{ width: "25%", height: "80vh" }}
              className={styles["gr"] + " overflow-auto"}
            >
              <p>Messages</p>
              <div className="row">
                <div className="col-sm">Subject</div>
                <div className="col-sm">From</div>
              </div>
              {data?.getOpenedMessagerie.map((msg) => (
                <div className={styles["msg"]}>
                  <div
                    className="row"
                    key={msg.id}
                    onClick={() => handleClick(msg.id)}
                  >
                    <div className="col-sm">
                      {" "}
                      <span className="min-width-px-96 rounded-3  py-1 font-size-3  mt-2">
                        {msg.subject}
                      </span>
                    </div>
                    <div className="col-sm">
                      <span className="min-width-px-96 rounded-3  py-1 font-size-3  mt-2">
                        {" "}
                        {msg.sender.firstName} {msg.sender.lastName}
                        {" ("}
                        {msg.sender.company.name}
                        {")"}
                      </span>
                    </div>
                  </div>{" "}
                  <hr />
                </div>
              ))}
              {/* <ul className="list-unstyled w-100 overflow-hidden d-flex align-items-center flex-wrap">
                <li>
                  <span className=" d-inline text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                    Subject
                  </span>
                </li>
                <li>
                  <a className=" d-inline text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                    From
                  </a>
                </li>
                <li>
                  <a className=" d-inline text-black-2  mr-4 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                    From
                  </a>
                </li>
              </ul> */}
            </Grid>
            <Grid
              item
              id="scroll"
              style={{
                width: "60%",
                height: "80vh",
              }}
              className={
                styles["gr"] + " p-4 mb-8 d-flex flex-column overflow-auto"
              }
            >
              {l ? (
                <LinearProgress className="mt-14" />
              ) : (
                <ChatLayout message={selected} me={props?.user?.user?.id} />
              )}
              {selected ? (
                <TextField
                  multiline={true}
                  fullWidth
                  type="text"
                  className=" mt-auto pt-10 pb-5"
                  variant="outlined"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        {!lm ? (
                          <Button
                            onClick={() => {
                              handleSend(msgs, props?.user?.user?.id);
                            }}
                            variant="contained"
                            color="primary"
                            className={styles["add"]}
                            endIcon={<SendIcon />}
                          >
                            Send
                          </Button>
                        ) : (
                          <CircularProgress />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                "No Message Selected"
              )}
            </Grid>
          </Grid>
        </div>
      </PageWrapper>
    </>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectAuth });

export default connect(mapStateToProps)(Inbox);
