import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Modals from "../modal/index";
import { NO_TASK_TEXT } from "../../../constants/messages";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    marginTop: 100
  }
}));

const NoTask = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {NO_TASK_TEXT}
        </Typography>
        <Modals isEdit={false} />
      </CardContent>
    </Card>
  );
};
export default NoTask;
