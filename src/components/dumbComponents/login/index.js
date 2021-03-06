import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CustomizedInputs from "../../smartComponents/input";
import { LOGIN_TEXT } from "../../../constants/messages";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const Login = props => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {LOGIN_TEXT}
        </Typography>
        <CustomizedInputs
          handleUserSubmit={props.handleUserSubmit}
          modal={false}
          text="submit"
        />
        {props.errorLoggedIn && (
          <span style={{ color: "red", fontSize: "15px" }}>
            {props.errorMessage}
          </span>
        )}
      </CardContent>
    </Card>
  );
};
export default Login;
