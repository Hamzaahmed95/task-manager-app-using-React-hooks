import React, { useEffect, useState } from "react";
import TaskList from "../../dumbComponents/TaskList/index";
import SearchTask from "../SearchTask/index";
import firebase from "firebase";
import TaskDescription from "../../dumbComponents/taskDescription/index";
const TaskDetails = () => {
  const [taskList, setTaskList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [totalTaskCompleted, setTotalTaskCompleted] = useState(0);

  useEffect(() => {
    console.log("localstorage1: " + localStorage.getItem("username"));
    firebase
      .database()
      .ref("tasks")
      .orderByChild("userID")
      .equalTo(localStorage.getItem("username"))
      .on("value", snapshot => {
        setTotalTaskCompleted(0);
        let datas = [];
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            // setTaskList([...taskList, data.val()]);
            if (data.child("isCompleted").val() === 1) {
              console.log("TaskDetails: " + data.child("isCompleted").val());
              setTotalTaskCompleted(
                totalTaskCompleted => totalTaskCompleted + 1
              );
            }
            datas.push(data.val());
          });
          setTaskList(datas);
          setFilterList(datas);
        } else {
          // console.log("asdasxzczxc show toast invalid ID");
        }
      });
  }, []);

  const removeTask = value => {
    console.log("remove: " + value);
    firebase
      .database()
      .ref("tasks")
      .orderByChild("task")
      .equalTo(value)
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(child) {
          child.ref.remove();
          console.log("Removed!");
        });
      });
  };
  const setCompleteTask = (value, flag) => {
    console.log("setCompleteTask: " + value + " " + flag);
    firebase
      .database()
      .ref("tasks")
      .orderByChild("task")
      .equalTo(value)
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child("isCompleted").set(flag);
        });
      });
  };

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
      <TaskDescription totalTaskCompleted={totalTaskCompleted} />
      <SearchTask handleChange={handleChange} />
      <TaskList
        setCompleteTask={setCompleteTask}
        data={filterList}
        removeTask={removeTask}
      />
    </div>
  );
};
export default TaskDetails;
