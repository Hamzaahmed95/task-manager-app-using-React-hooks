import React, { Component } from "react";
import "./App.css";
import Login from "./components/dumbComponents/login/index";
import Main from "./components/dumbComponents/main/index";
import firebase from "firebase/app";
import { firebaseConfig } from "./constants/apikey";
const LoggedIn = false;
class App extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }
  render() {
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
  }
}

export default App;
