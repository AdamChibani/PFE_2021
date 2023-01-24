import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import styles from "./contact.module.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const send = gql`
  mutation createM($messagerieId: Int!, $authorId: Int!, $content: String!) {
    createMessage(
      messagerieId: $messagerieId
      authorId: $authorId
      content: $content
    ) {
      id

      content
    }
  }
`;
const Contact = (props) => {
  console.log({ props });
  const [sendMsg, { loading }] = useMutation(send);
  const handleSend = (messagerieId, authorId, content) => {
    console.log(messagerieId, authorId, content);
    sendMsg({ variables: { messagerieId, authorId, content } }).then(
      props.del(props.d, props.msgId),
      toggleModal()
    );
  };
  const [msg, setMsg] = useState("");
  const gContext = useContext(GlobalContext);

  const toggleModal = () => {
    gContext.toggleContactModal();
  };

  return (
    <div
      className={
        gContext.contactModalVisible
          ? "container position-relative overflow-auto"
          : "hidden"
      }
    >
      <div className=" container row justify-content-center mt-24">
        <div className="col-xxl-6 col-xl-7 col-lg-8">
          <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="mb-9" onClick={() => toggleModal()}>
                  <a className="d-flex align-items-center ml-4">
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold">
                      Back
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <form
              name="contact"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              {/* You still need to add the hidden input with the form name to your JSX form */}
              <input type="hidden" name="form-name" value="contact" />
              <div className="row">
                <div className="col-lg-12 mb-7">
                  <label
                    htmlFor="message"
                    className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Type your message"
                    className={styles["ta"] + " form-control h-px-100"}
                    name="message"
                    onChange={(e) => setMsg(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="col-lg-12 pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary text-uppercase w-100 h-px-48"
                    onClick={() =>
                      handleSend(gContext?.msg?.id, props?.id, msg)
                    }
                  >
                    Send Now
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-8">
              <h3 className="font-size-4">Contact Information</h3>
              <div className="media mb-2">
                <div className="mr-6">
                  <i className="fas fa-map-marker-alt mt-2"></i>
                </div>
                <p className="font-size-4 mb-0">
                  {gContext?.msg?.sender?.company?.name} <br />
                  {gContext?.msg?.sender?.firstName}{" "}
                  {gContext?.msg?.sender?.lastName}
                </p>
              </div>

              <div className="media mb-2">
                <div className="mr-6">
                  <i className="fas fa-envelope mt-2"></i>
                </div>
                <p className="font-size-4 mb-0">
                  {gContext?.msg?.sender?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
