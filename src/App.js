import React, { useState } from "react";
import "./App.css";
import Login from "./components/dumbComponents/login/index";
import Main from "./components/dumbComponents/main/index";

const App = () => {
  const [LoggedIn, isLoggedIn] = useState(false);
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
