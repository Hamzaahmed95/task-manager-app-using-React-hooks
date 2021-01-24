import React from "react";
import TaskList from "../../dumbComponents/TaskList/index";
import SearchTask from "../SearchTask/index";
const TaskDetails = () => {
  return (
    <div>
      <h1>Task Details Here</h1>

      <SearchTask />
      <TaskList />
    </div>
  );
};
export default TaskDetails;
