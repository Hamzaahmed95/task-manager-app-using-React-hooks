import React, { useEffect, useState } from "react";
import "./index.css";
import Main from "../main/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "firebase";
import Header from "../header/index";

const Loading = props => {
  const [Loadingg, isLoadingg] = useState(false);
  const [TaskAdded, isTaskAdded] = useState(false);

  useEffect(() => {
    firebase
      .database()
      .ref("tasks")
      .orderByChild("task")
      .once("value", snapshot => {
        setTimeout(() => {
          isLoadingg(true);
        }, 2000);

        if (snapshot.exists()) {
          isTaskAdded(true);
        }
      });

    firebase
      .database()
      .ref("tasks")
      .on("value", snapshot => {
        // isLoadingg(false);
        setTimeout(() => {
          if (snapshot.exists()) {
            isTaskAdded(true);
          }
          // isLoadingg(true);
        }, 2000);
      });
  }, []);
  return (
    <div className="Loading">
      <Header logoutSubmit={props.logoutSubmit} username={props.username} />

      <header className="Loading-header">
        {!Loadingg ? (
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

export default Loading;
