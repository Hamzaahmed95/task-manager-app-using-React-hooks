import React, { useState, useEffect } from "react";
import Login from "./dumbComponents/login/index";
import Loading from "./dumbComponents/loading/index";
import firebase from "firebase";
import {
  INVALID_USERNAME,
  INVALID_ID,
  TOKEN,
  USERNAME,
  APIKEY,
  USERS
} from "../constants/messages";

const AppComponent = () => {
  const [UserLoggedIn, IsUserLoggedIn] = useState(false);
  const [errorLoggedIn, IsErrorLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem(TOKEN) !== null) {
      IsUserLoggedIn(true);
      setUsername(localStorage.getItem(USERNAME));
    } else {
      IsUserLoggedIn(false);
    }
  }, []);

  const signIn = (id, username) => {
    firebase
      .database()
      .ref(USERS)
      .orderByChild(APIKEY)
      .equalTo(id)
      .once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            if (
              data
                .child(USERNAME)
                .val()
                .toUpperCase() === username.toUpperCase()
            ) {
              setUsername(data.child(USERNAME).val());
              IsErrorLoggedIn(false);
              IsUserLoggedIn(true);
              localStorage.setItem(TOKEN, data.child(TOKEN).val());
              localStorage.setItem(USERNAME, data.child(USERNAME).val());
            } else {
              setErrorMessage(INVALID_USERNAME);
              IsErrorLoggedIn(true);
            }
          });
        } else {
          IsErrorLoggedIn(true);
          setErrorMessage(INVALID_ID);
        }
      });
  };
  const signOut = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USERNAME);
    IsUserLoggedIn(false);
  };
  return (
    <div className="AppComponent">
      {!UserLoggedIn ? (
        <header className="App-header">
          <Login
            errorLoggedIn={errorLoggedIn}
            errorMessage={errorMessage}
            handleUserSubmit={signIn}
          />
        </header>
      ) : (
        <Loading logoutSubmit={signOut} username={username} />
      )}
    </div>
  );
};

export default AppComponent;
