import React, { useEffect, useState } from "react";
import TaskList from "../../dumbComponents/TaskList/index";
import SearchTask from "../SearchTask/index";
import firebase from "firebase";
import TaskDescription from "../../dumbComponents/taskDescription/index";
const TaskDetails = () => {
  const [taskList, setTaskList] = useState([]);
  const [recentTaskList, setRecentTaskList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [totalTaskCompleted, setTotalTaskCompleted] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    console.log("localstorage1: " + localStorage.getItem("username"));
    firebase
      .database()
      .ref("tasks")
      .orderByChild("userID")
      .equalTo(localStorage.getItem("username"))
      .on("value", snapshot => {
        setTotalTaskCompleted(0);
        setTotalTasks(0);
        let datas = [];
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            setTotalTasks(totalTasks => totalTasks + 1);
            if (data.child("isCompleted").val() === 1) {
              setTotalTaskCompleted(
                totalTaskCompleted => totalTaskCompleted + 1
              );
            }
            datas.push(data.val());
          });
          setTaskList(datas);
          setFilterList(datas);
        }
      });
  }, []);
  useEffect(() => {
    console.log("localstorage1: " + localStorage.getItem("username"));
    firebase
      .database()
      .ref("tasks")
      .orderByChild("userID")
      .equalTo(localStorage.getItem("username"))
      .limitToLast(3)
      .on("value", snapshot => {
        let datas = [];
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            datas.push(data.val());
          });
          setRecentTaskList(datas);
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
      <TaskDescription
        totalTasks={totalTasks}
        totalTaskCompleted={totalTaskCompleted}
        recentTaskList={recentTaskList}
      />
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
