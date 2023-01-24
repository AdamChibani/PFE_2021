import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";

const GlobalContext = React.createContext();
const GET_PROFILE_STATE_QUERY = gql`
  query state($id: Int!) {
    myProfile(id: $id) {
      profile {
        state
      }
    }
  }
`;
const GlobalProvider = ({ children }) => {
  const [getState, { loading, data }] = useLazyQuery(GET_PROFILE_STATE_QUERY);
  const [themeDark, setThemeDark] = useState(false);
  const [showSidebarDashboard, setShowSidebarDashboard] = useState(true);
  const [applicationModalVisible, setApplicationModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [consultantInfo, setConsultantInfoModalVisible] = useState(
    data?.myProfile?.profile?.state
  );
  const [userId, setUserId] = useState();
  const [msg, setMsg] = useState({});
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [visibleOffCanvas, setVisibleOffCanvas] = useState(false);
  const [content, setContent] = useState(null);
  const [header, setHeader] = useState({
    theme: "light",
    bgClass: "default",
    variant: "primary",
    align: "left",
    isFluid: false,
    button: "cta",
    buttonText: "Get started free", //
    reveal: true,
  });
  const [footer, setFooter] = useState({
    theme: "dark",
    style: "style1",
  });
  useEffect(() => {
    console.log({ userId });
    getState({ variables: { id: userId } });
  }, [userId]);
  useEffect(() => {
    console.log({ data });
    if (loading === false && data) {
      setConsultantInfoModalVisible(data?.myProfile?.profile?.state);
    }
  }, [loading, data]);
  const toggleTheme = () => {
    setThemeDark(!themeDark);
  };

  const toggleSidebarDashboard = () => {
    setShowSidebarDashboard(!showSidebarDashboard);
  };

  const toggleVideoModal = () => {
    setVideoModalVisible(!videoModalVisible);
  };

  const toggleApplicationModal = (c) => {
    if (c) setContent(c);
    else setContent(null);
    setApplicationModalVisible(!applicationModalVisible);
  };
  const toggleContactModal = (msgs) => {
    console.log({ msgs });

    if (msgs) setMsg(msgs);
    else setMsg(null);
    setContactModalVisible(!contactModalVisible);
  };
  const toggleConsultantInfoModal = () => {
    setConsultantInfoModalVisible(!consultantInfo);
  };
  const toggleSignInModal = () => {
    setSignInModalVisible(!signInModalVisible);
  };

  const toggleSignUpModal = () => {
    setSignUpModalVisible(!signUpModalVisible);
  };

  const toggleOffCanvas = () => {
    setVisibleOffCanvas(!visibleOffCanvas);
  };

  const closeOffCanvas = () => {
    setVisibleOffCanvas(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        themeDark,
        toggleTheme,
        showSidebarDashboard,
        toggleSidebarDashboard,
        videoModalVisible,
        toggleVideoModal,
        toggleContactModal,
        contactModalVisible,
        toggleConsultantInfoModal,
        consultantInfo,
        applicationModalVisible,
        toggleApplicationModal,
        signInModalVisible,
        toggleSignInModal,
        signUpModalVisible,
        toggleSignUpModal,
        visibleOffCanvas,
        toggleOffCanvas,
        closeOffCanvas,
        header,
        setHeader,
        footer,
        setFooter,
        content,
        msg,
        setMsg,
        setContent,
        setUserId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
