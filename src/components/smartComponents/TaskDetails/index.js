import React, { useEffect, useState } from "react";
import TaskList from "../../dumbComponents/TaskList/index";
import SearchTask from "../SearchTask/index";
import firebase from "firebase";
const TaskDetails = () => {
  const [taskList, setTaskList] = useState([]);
  const [filterList, setFilterList] = useState([]);
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
          setFilterList(datas);
        } else {
          console.log("asdasxzczxc show toast invalid ID");
        }
      });
  }, []);

  const handleChange = e => {
    const inputValue = e.target.value;

    setFilterList(
      taskList.filter(taskData =>
        taskData.task.toUpperCase().includes(inputValue.toUpperCase())
      )
    );
  };

  return (
    <div>
      <h1>Task Details Here</h1>

      <SearchTask handleChange={handleChange} />
      <TaskList data={filterList} />
    </div>
  );
};
export default TaskDetails;
