import React, { Component } from "react";
import "./App.css";
import AppComponent from "./components/AppComponent";
import firebase from "firebase/app";
import { firebaseConfig } from "./constants/apikey";
class App extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
  }
  render() {
    return (
      <div className="App">
        <AppComponent />
      </div>
    );
  }
}

export default App;
