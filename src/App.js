import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/dumbComponents/login/index";
import Main from "./components/dumbComponents/main/index";
import firebase from "firebase/app";
import { firebaseConfig } from "./constants/apikey";

const App = () => {
  const [LoggedIn, isLoggedIn] = useState(false);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }, []);

  return (
    <div className="App">
      {LoggedIn ? (
        <header className="App-header">
          <Login />
        </header>
      ) : (
        <Main />
      )}
    </div>
  );
};

export default App;
