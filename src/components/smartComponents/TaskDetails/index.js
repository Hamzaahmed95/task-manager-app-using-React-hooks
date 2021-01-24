import React, { useEffect, useState } from "react";
import TaskList from "../../dumbComponents/TaskList/index";
import SearchTask from "../SearchTask/index";
import firebase from "firebase";
const TaskDetails = () => {
  const [taskList, setTaskList] = useState([]);
  let datas = [];
  useEffect(() => {
    firebase
      .database()
      .ref("tasks")
      .on("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            // setTaskList([...taskList, data.val()]);
            datas.push(data.val());
          });
          setTaskList(datas);
        } else {
          console.log("asdasxzczxc show toast invalid ID");
        }
      });
  }, []);

  return (
    <div>
      <h1>Task Details Here</h1>

      <SearchTask />
      <TaskList data={taskList} />
    </div>
  );
};
export default TaskDetails;
