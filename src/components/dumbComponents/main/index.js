import "./index.css";
import TaskDetails from "../../smartComponents/TaskDetails/index";
import NoTask from "../noTask/index";
const Main = props => {
  console.log("main: " + props.isTaskAdded);
  return <div>{props.isTaskAdded ? <TaskDetails /> : <NoTask />}</div>;
};

export default Main;
