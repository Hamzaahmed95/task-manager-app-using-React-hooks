import React, { useState } from "react";
import "./index.css";
import Button from "@material-ui/core/Button";

import InputField from "../../dumbComponents/customInputFields/index";
const SearchTask = props => {
  const [value, setValue] = useState("");
  return (
    <div className="search_task_container">
      <div>
        <p>Tasks</p>
      </div>
      <div className="search_task_subcontainer">
        <div className="search_task_subcontainer_first">
          <InputField
            className="search_task_input"
            type="text"
            label="Search by task name"
            defaultValue={value}
            onChange={props.handleChange}
            variant="filled"
            id="reddit-input"
          />
        </div>
        <div className="search_task_subcontainer_second">
          <Button
            onClick={e => console.log("")}
            variant="contained"
            className="add_tasks_btn"
          >
            + Add Tasks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchTask;
