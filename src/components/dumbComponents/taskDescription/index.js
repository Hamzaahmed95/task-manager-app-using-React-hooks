import React, { useState } from "react";
import "./index.css";
import Card from "@material-ui/core/Card";
import DonutChart from "../donutchart/index";
let arrayofTasks = [
  {
    id: "1",
    task: "Clean the room"
  },
  { id: "2", task: "Clean the room" },
  {
    id: "3",
    task: "Clean the room"
  }
];
const TaskDescription = props => {
  const [completedTask, isCompletedTask] = useState(false);
  return (
    <div className="task_description_container">
      <Card align="left" className="task_description_card1">
        <span style={{ color: "grey", fontSize: "22px" }}>Task Completed </span>
        <br />
        <span style={{ color: "#5285EC", fontSize: "70px" }}>
          {props.totalTaskCompleted}
          <span style={{ fontSize: "25px", color: "grey" }}>/20</span>
        </span>
      </Card>
      <Card align="left" className="task_description_card2">
        <span style={{ color: "grey", fontSize: "22px" }}>
          Latest Created Tasks
        </span>
        {arrayofTasks.map(task => (
          <div keys={task.id}>
            {completedTask ? (
              <del>
                <li style={{ color: "grey", fontSize: "12px" }}>{task.task}</li>
              </del>
            ) : (
              <li
                style={{ color: "grey", fontSize: "14px", paddingTop: "5px" }}
              >
                {task.task}
              </li>
            )}
          </div>
        ))}
      </Card>
      <Card className="task_description_card3">
        <DonutChart align="center" />
      </Card>
    </div>
  );
};
export default TaskDescription;
