import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./index.css";
import InputField from "../../dumbComponents/customInputFields/index";
import firebase from "firebase";
import {
  TASKS,
  TASK,
  USERNAME,
  EDIT_TASK_TEXT,
  ADD_TASK_TEXT
} from "../../../constants/messages";

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
    firebase
      .database()
      .ref(TASKS)
      .orderByChild(TASK)
      .equalTo(props.taskItem)
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child(TASK).set(editTaskName);
        });
      });
  };

  const handleSubmitTask = () => {
    const taskObject = {
      userID: localStorage.getItem(USERNAME),
      task: taskName,
      isCompleted: 0
    };

    let userRef = firebase.database().ref(TASKS);
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
          {/* LOGIN INPUT */}
          <InputField
            type="text"
            label="Id"
            defaultValue={id}
            onChange={e => handleChangeId(e)}
            variant="filled"
          />
          <InputField
            type="text"
            label="Name"
            defaultValue={username}
            onChange={e => handleChangeUsername(e)}
            variant="filled"
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
              {/* EDIT TASK INPUT */}
              <InputField
                label="Task Name"
                type="text"
                defaultValue={props.taskItem}
                onChange={e => handleChangeEditTaskName(e)}
                variant="filled"
              />
              <Button
                onClick={handleSubmitEditTask}
                variant="contained"
                className="submitButton"
                disabled={!editTaskName}
              >
                {EDIT_TASK_TEXT}
              </Button>
            </div>
          ) : (
            <div>
              {/* ADD TASK INPUT */}
              <InputField
                label="Task Name"
                type="text"
                defaultValue={taskName}
                onChange={e => handleChangeTaskName(e)}
                variant="filled"
              />
              <Button
                onClick={handleSubmitTask}
                variant="contained"
                className="submitButton"
                disabled={!taskName}
              >
                {ADD_TASK_TEXT}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomizedInputs;
