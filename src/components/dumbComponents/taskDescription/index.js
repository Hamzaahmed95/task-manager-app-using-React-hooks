import React from "react";
import "./index.css";
import Card from "@material-ui/core/Card";

const TaskDescription = () => {
  return (
    <div className="task_description_container">
      <Card className="task_description_card">
        <h3>TASK DESCRIPTION 3</h3>
      </Card>
      <Card className="task_description_card">
        <h3>TASK DESCRIPTION 2</h3>
      </Card>
      <Card className="task_description_card">
        <h3>TASK DESCRIPTION 1</h3>
      </Card>
    </div>
  );
};
export default TaskDescription;
