import logo from "./logo.svg";
import "./App.css";
import Login from "./components/dumbComponents/login/index";
import Header from "./components/dumbComponents/header/index";
import NoTask from "./components/dumbComponents/noTask/index";

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <NoTask />
        {/* <Login /> */}
      </header>
    </div>
  );
}

export default App;
