import "./index.css";
import Header from "../header/index";
import NoTask from "../noTask/index";

const Main = () => {
  return (
    <div className="Main">
      <Header />
      <header className="Main-header">
        <NoTask />
      </header>
    </div>
  );
};

export default Main;
