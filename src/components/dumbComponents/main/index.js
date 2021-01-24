import "./index.css";
import Header from "../header/index";
import NoTask from "../noTask/index";
import TaskDetails from "../../smartComponents/TaskDetails/index";

const Main = () => {
  return (
    <div className="Main">
      <Header />
      <header className="Main-header">
        <NoTask />
        {/* <TaskDetails /> */}
      </header>
    </div>
  );
};

export default Main;
