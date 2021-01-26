import React, { useEffect, useState } from "react";
import TaskList from "../../dumbComponents/TaskList/index";
import SearchTask from "../SearchTask/index";
import firebase from "firebase";
import TaskDescription from "../../dumbComponents/taskDescription/index";
import {
  TASKS,
  TASK,
  USERID,
  USERNAME,
  IS_COMPLETED
} from "../../../constants/messages";

const TaskDetails = () => {
  const [taskList, setTaskList] = useState([]);
  const [recentTaskList, setRecentTaskList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [totalTaskCompleted, setTotalTaskCompleted] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    firebase
      .database()
      .ref(TASKS)
      .orderByChild(USERID)
      .equalTo(localStorage.getItem(USERNAME))
      .on("value", snapshot => {
        setTotalTaskCompleted(0);
        setTotalTasks(0);
        let datas = [];
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            setTotalTasks(totalTasks => totalTasks + 1);
            if (data.child(IS_COMPLETED).val() === 1) {
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
    firebase
      .database()
      .ref(TASKS)
      .orderByChild(USERID)
      .equalTo(localStorage.getItem(USERNAME))
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
    firebase
      .database()
      .ref(TASKS)
      .orderByChild(TASK)
      .equalTo(value)
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(child) {
          child.ref.remove();
        });
      });
  };

  const setCompleteTask = (value, flag) => {
    firebase
      .database()
      .ref(TASKS)
      .orderByChild(TASK)
      .equalTo(value)
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child(IS_COMPLETED).set(flag);
        });
      });
  };

  const searchTaskOnChange = e => {
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
      <SearchTask handleChange={searchTaskOnChange} />
      <TaskList
        setCompleteTask={setCompleteTask}
        data={filterList}
        removeTask={removeTask}
      />
    </div>
  );
};
export default TaskDetails;
