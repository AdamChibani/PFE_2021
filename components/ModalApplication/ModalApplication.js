import React, { useContext } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import ProfileSidebar from "../ProfileSidebar";

import imgL from "../../assets/image/svg/icon-loaction-pin-black.svg";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
  .modal-dialog {
    margin: 1.75rem auto;
    max-width: 100%;
  }
  .modal-content {
    background: transparent;
  }
`;

const ModalApplication = (props) => {
  const gContext = useContext(GlobalContext);
  const company = gContext?.content?.sender?.company;
  console.log(gContext?.content);

  const handleClose = () => {
    gContext.toggleApplicationModal();
  };

  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.applicationModalVisible}
      onHide={gContext.toggleApplicationModal}
    >
      <Modal.Body className="p-0">
        <div className="container position-relative">
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="login-modal-main bg-white rounded-8 overflow-hidden">
            <div className="row no-gutters">
              {/* <!-- Left Sidebar Start --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-md-5 mb-13 mb-lg-0 border-right border-mercury">
                <ProfileSidebar user={gContext?.content?.sender} />
              </div>
              {/* <!-- Left Sidebar End --> */}
              {/* <!-- Middle Content --> */}
              <div className="col-12 col-xl-6 col-lg-8 col-md-7 order-2 order-lg-1 border-right border-mercury">
                <div className="bg-white rounded-4 overflow-auto h-1173">
                  {/* <!-- Excerpt End --> */}
                  {/* <!-- Skills --> */}
                  <div className="border-top border-mercury pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                    <h2 className="font-size-9 font-weight-semibold mb-7 mt-5 text-black-2">
                      {company?.name}
                    </h2>
                    <h4 className="font-size-6 font-weight-semibold mb-7 mt-5 text-black-2">
                      Subject{" "}
                    </h4>
                    <p className="font-size-5 font-weight-semibold text-black-2">
                      {gContext?.content?.subject}{" "}
                    </p>
                    <h4 className="font-size-6 font-weight-semibold mb-7 mt-5 text-black-2">
                      Content{" "}
                    </h4>
                    <p className="font-size-5 font-weight-semibold text-black-2">
                      {gContext?.content?.messages[0]?.content}
                    </p>
                  </div>
                  <div className="border-top border-mercury pr-xl-0 pr-xxl-14 p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 font-weight-semibold mb-7 mt-5 text-black-2">
                      Fields
                    </h4>
                    <ul className="list-unstyled d-flex align-items-center flex-wrap">
                      <ul className="list-unstyled d-flex align-items-center flex-wrap">
                        {company?.fields.map((f) => (
                          <li>
                            <a className="bg-polar text-black-2  mr-6 px-7 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                              {f.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </ul>
                  </div>
                  {/* <!-- Skills End --> */}
                  {/* <!-- Card Section Start --> */}
                  <div className="border-top border-mercury p-5 pl-xs-12 pt-7 pb-5">
                    <h4 className="font-size-6 font-weight-semibold mb-7 mt-5 text-black-2">
                      Offices{" "}
                    </h4>
                    {/* <!-- Single Card --> */}
                    <div className="w-100">
                      <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                        {company?.offices.map((o) => (
                          <div className="w-100 mt-n2">
                            <h3 className="mb-0">
                              <a className="font-size-5 font-weight-semibold text-black-2">
                                {o.name}{" "}
                              </a>
                            </h3>
                            <a className="font-size-4 text-default-color line-height-2">
                              {o.address.country.name}{" "}
                            </a>
                            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                              <a className="font-size-3 text-gray">
                                <span
                                  className="mr-4"
                                  css={`
                                    margin-top: -2px;
                                  `}
                                >
                                  <img src={imgL} alt="" />
                                </span>
                                {o.address.street}, {o.address.city}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* <!-- Single Card End --> */}
                  </div>
                  {/* <!-- Card Section End --> */}

                  {/* <!-- Card Section End --> */}
                </div>
              </div>
              {/* <!-- Middle Content --> */}
              {/* <!-- Right Sidebar Start --> */}
              <div className="col-12 col-xl-3 order-3 order-lg-2 bg-default-2">
                <div className="text-center mb-13 mb-lg-0 mt-12">
                  <button className="btn btn-primary btn-xl mb-7 d-block mx-auto text-uppercase">
                    Contact
                  </button>
                  <button className="btn btn-outline-gray btn-xl mb-7 d-block mx-auto text-uppercase">
                    Reject
                  </button>
                </div>
              </div>
              {/* <!-- Right Sidebar End --> */}
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

export default ModalApplication;
