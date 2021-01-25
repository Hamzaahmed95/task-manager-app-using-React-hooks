import React, { useState, useEffect } from "react";
import Login from "./dumbComponents/login/index";
import Loading from "./dumbComponents/loading/index";
import firebase from "firebase";

const AppComponent = () => {
  const [UserLoggedIn, IsUserLoggedIn] = useState(false);
  const [errorLoggedIn, IsErrorLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      console.log("USER: FOUND");
      IsUserLoggedIn(true);
      setUsername(localStorage.getItem("username"));
    } else {
      console.log("USER: NOTFOUND");
      IsUserLoggedIn(false);
    }
  }, []);

  const handleSubmit = (id, username) => {
    console.log("users:" + id + " " + username);
    firebase
      .database()
      .ref("users")
      .orderByChild("apiKey")
      .equalTo(id)
      .once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            if (
              data
                .child("username")
                .val()
                .toUpperCase() === username.toUpperCase()
            ) {
              setUsername(data.child("username").val());
              IsErrorLoggedIn(false);
              IsUserLoggedIn(true);
              localStorage.setItem("token", data.child("token").val());
              localStorage.setItem("username", data.child("username").val());
            } else {
              setErrorMessage("username is invalid");
              IsErrorLoggedIn(true);
              console.log("users: username error");
            }
          });
        } else {
          IsErrorLoggedIn(true);
          setErrorMessage("id is invalid");
          console.log("users: apikey error");
        }
      });
  };
  const logoutSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    IsUserLoggedIn(false);
  };
  return (
    <div className="AppComponent">
      {!UserLoggedIn ? (
        <header className="App-header">
          <Login
            errorLoggedIn={errorLoggedIn}
            errorMessage={errorMessage}
            handleUserSubmit={handleSubmit}
          />
        </header>
      ) : (
        <Loading logoutSubmit={logoutSubmit} username={username} />
      )}
    </div>
  );
};

export default AppComponent;
