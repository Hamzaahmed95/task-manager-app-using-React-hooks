import React from "react";
import "./index.css";
import Button from "@material-ui/core/Button";

const Header = props => {
  return (
    <div className="Header">
      <p className="para">{props.username}</p>
      <Button onClick={props.logoutSubmit} className="button1" color="primary">
        Logout
      </Button>
    </div>
  );
};

export default Header;
