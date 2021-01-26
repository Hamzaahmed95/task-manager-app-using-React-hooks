import React, { useEffect, useState } from "react";
import "./index.css";
import Main from "../../dumbComponents/main/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "firebase";
import Header from "../../dumbComponents/header/index";
import { TASKS, USERNAME, USERID } from "../../../constants/messages";
const LoadingComponent = props => {
  const [Loading, isLoading] = useState(false);
  const [TaskAdded, isTaskAdded] = useState(false);

  useEffect(() => {
    firebase
      .database()
      .ref(TASKS)
      .orderByChild(USERID)
      .equalTo(localStorage.getItem(USERNAME))
      .once("value", snapshot => {
        setTimeout(() => {
          isLoading(true);
        }, 2000);
        console.log("loading: " + snapshot.exists());
        if (snapshot.exists()) {
          isTaskAdded(true);
        }
      });

    firebase
      .database()
      .ref(TASKS)
      .orderByChild(USERID)
      .equalTo(localStorage.getItem(USERNAME))
      .on("value", snapshot => {
        if (snapshot.exists()) {
          isTaskAdded(true);
        }
      });
  }, []);
  return (
    <div className="Loading">
      <Header logoutSubmit={props.logoutSubmit} username={props.username} />

      <header className="Loading-header">
        {!Loading ? (
          <div className="progress_bar" align="center">
            <CircularProgress className="progress_barColor" color="primary" />
          </div>
        ) : (
          <div className="progress_bar" align="center">
            <Main isTaskAdded={TaskAdded} />
          </div>
        )}
      </header>
    </div>
  );
};

export default LoadingComponent;
