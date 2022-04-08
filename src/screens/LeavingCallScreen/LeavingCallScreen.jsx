import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "react-router-dom";
import * as callActionCreators from "store/actions/call";
import { Spinner } from "@blueprintjs/core";
import "./LeavingCallScreen.scss";

const mapStateToProps = ({ call }) => ({
  isCallLeaving: call.leaving,
  disconnectReason: call.disconnectReason,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(callActionCreators, dispatch),
});

const LeavingCallScreen = ({ isCallLeaving }) => {
  const location = useLocation();
  const { t } = useTranslation();

  if (!isCallLeaving) {
    return (
      <Redirect
        to={{
          pathname: "/GuestPostCall",
          state: location.state,
        }}
      />
    );
  }

  return (
    <div className="leaving-call-screen">
      <div className="content">
        {t("PLEASE_WAIT")}
        <div className="initial-loader">
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeavingCallScreen);
