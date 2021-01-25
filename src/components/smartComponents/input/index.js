import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./index.css";
import InputField from "../../dumbComponents/customInputFields/index";
import firebase from "firebase";

const CustomizedInputs = props => {
  const [taskName, setTaskName] = useState("");
  const [editTaskName, setEditTaskName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.isEdit) {
      setEditTaskName(props.taskItem);
    }
  }, []);

  const handleChangeTaskName = e => {
    setTaskName(e.target.value);

    console.log(taskName);
  };
  const handleChangeUsername = e => {
    setUsername(e.target.value);
  };
  const handleChangeEditTaskName = e => {
    setEditTaskName(e.target.value);

    console.log(editTaskName);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmitEditTask = () => {
    // const taskObject = {
    //   userID: "hamzaahmed95",
    //   task: editTaskName
    // };

    firebase
      .database()
      .ref("tasks")
      .orderByChild("task")
      .equalTo(props.taskItem)
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child("task").set(editTaskName);
        });
      });
  };

  const handleSubmitTask = () => {
    const taskObject = {
      userID: "hamzaahmed95",
      task: taskName
    };

    let userRef = firebase.database().ref("tasks");
    let newUserRef = userRef.push();
    newUserRef
      .set(taskObject)
      .then(resp => {
        console.log(resp);
        props.handleSubmit();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="input_container" align="center">
      {!props.modal ? (
        <>
          <InputField
            type="text"
            label="Enter email"
            defaultValue={username}
            onChange={e => handleChangeUsername(e)}
            variant="filled"
            id="reddit-input"
          />
          <InputField
            label="Enter password"
            type="password"
            defaultValue={password}
            onChange={e => handleChangePassword(e)}
            variant="filled"
            id="reddit-input"
          />
          <Button
            onClick={props.handleSubmit}
            variant="contained"
            className="submitButton"
            disabled={!username || !password}
          >
            {props.text}
          </Button>
        </>
      ) : (
        <>
          {props.isEdit ? (
            <div>
              <InputField
                label="Task Name"
                type="text"
                defaultValue={props.taskItem}
                onChange={e => handleChangeEditTaskName(e)}
                variant="filled"
                id="reddit-input"
              />
              <Button
                onClick={handleSubmitEditTask}
                variant="contained"
                className="submitButton"
                disabled={!editTaskName}
              >
                Edit Task
              </Button>
            </div>
          ) : (
            <div>
              <InputField
                label="Task Name"
                type="text"
                defaultValue={taskName}
                onChange={e => handleChangeTaskName(e)}
                variant="filled"
                id="reddit-input"
              />
              <Button
                onClick={handleSubmitTask}
                variant="contained"
                className="submitButton"
                disabled={!taskName}
              >
                Add Task
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomizedInputs;
