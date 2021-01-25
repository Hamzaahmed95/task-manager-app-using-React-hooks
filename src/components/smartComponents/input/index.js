import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./index.css";
import InputField from "../../dumbComponents/customInputFields/index";
import firebase from "firebase";

const CustomizedInputs = props => {
  const [taskName, setTaskName] = useState("");
  const [editTaskName, setEditTaskName] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (props.isEdit) {
      setEditTaskName(props.taskItem);
    }
  }, []);

  const handleChangeTaskName = e => {
    setTaskName(e.target.value);

    console.log(taskName);
  };
  const handleChangeId = e => {
    setId(e.target.value);
  };
  const handleChangeEditTaskName = e => {
    setEditTaskName(e.target.value);

    console.log(editTaskName);
  };

  const handleChangeUsername = e => {
    setUsername(e.target.value);
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
      task: taskName,
      isCompleted: 0
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
            label="Id"
            defaultValue={id}
            onChange={e => handleChangeId(e)}
            variant="filled"
            id="reddit-input"
          />
          <InputField
            type="text"
            label="Name"
            defaultValue={username}
            onChange={e => handleChangeUsername(e)}
            variant="filled"
            id="reddit-input"
          />
          <Button
            onClick={e => props.handleUserSubmit(id, username)}
            variant="contained"
            className="submitButton"
            disabled={!id || !username}
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
