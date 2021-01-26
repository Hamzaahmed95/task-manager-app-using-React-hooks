import React from "react";
import "./index.css";
import Button from "@material-ui/core/Button";
import { ADD_LOGOUT_TEXT } from "../../../constants/messages";

const Header = props => {
  return (
    <div className="Header">
      <p className="para">{props.username}</p>
      <Button
        onClick={props.logoutSubmit}
        className="logout_btn"
        color="primary"
      >
        {ADD_LOGOUT_TEXT}
      </Button>
    </div>
  );
};

export default Header;
